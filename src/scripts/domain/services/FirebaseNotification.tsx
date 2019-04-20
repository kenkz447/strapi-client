import map from 'lodash/map';
import * as React from 'react';
import { withContext } from 'react-context-service';

import { Notification } from '@/restful';

import { DomainContext, firebaseAppRef, WithDomainContext } from '../base';

const notificationRef = firebaseAppRef.child(`/notifications`);

type FirebaseNotificationProps = WithDomainContext;

class FirebaseNotification extends React.PureComponent<FirebaseNotificationProps> {

    private readonly snapshotValToObject = (value, key) => ({
        ...value,
        id: key
    })

    private readonly queryNotifications = async (userId: string, option?): Promise<Notification[]> => {
        const notificationChildRef = notificationRef.child(`/${userId}`);

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
        userId: string,
        callback: (notification: Notification[]) => void
    ) => {
        notificationRef
            .child(`/${userId}`)
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
