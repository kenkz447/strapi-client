import map from 'lodash/map';
import * as React from 'react';
import { withContext } from 'react-context-service';

import {
    AppNotification,
    DomainContext,
    firebaseAppRef,
    WithDomainContext
} from '../base';

type FirebaseNotificationProps = WithDomainContext;

class FirebaseNotification extends React.PureComponent<FirebaseNotificationProps> {

    private readonly snapshotValToObject = (value, key) => ({
        ...value,
        id: key
    })

    private readonly queryNotifications = async (ref: string, option?): Promise<AppNotification[]> => {
        const notificationChildRef = firebaseAppRef.child(`${ref}/notifications`);

        const snapshot = await notificationChildRef
            .orderByKey()
            .endAt(option.oldestKey)
            .limitToLast(8)
            .once('value');

        const values = await snapshot.val();

        if (!values) {
            return [];
        }

        const result = map(values, this.snapshotValToObject);

        return result;
    }

    private readonly subcribeNotification = (
        ref: string,
        callback: (notification: AppNotification[]) => void
    ) => {
        firebaseAppRef
            .child(`${ref}/notifications`)
            .orderByKey()
            .limitToLast(8)
            .on('value', (snapshot) => {
                if (!snapshot) {
                    return;
                }

                const notificationSnapshotVal = snapshot.val();
                const notifications = map(notificationSnapshotVal, this.snapshotValToObject);

                if (!notifications) {
                    return;
                }

                callback(notifications);
            });
    }

    public async componentDidUpdate() {
        const {
            currentUser,
            setContext
        } = this.props;

        if (!currentUser) {
            return;
        }

        this.subcribeNotification(
            currentUser._id,
            (notifications) => {
                setContext({
                    notifications
                });
            }
        );
    }

    public render() {
        return null;
    }
}

export default withContext<DomainContext>('currentUser')(FirebaseNotification);
