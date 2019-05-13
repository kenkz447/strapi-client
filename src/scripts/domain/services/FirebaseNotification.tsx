import map from 'lodash/map';
import * as React from 'react';
import { withContext } from 'react-context-service';

import { Notification } from '@/restful';

import { DomainContext, firebaseAppRef, WithDomainContext } from '../base';

const notificationRef = firebaseAppRef.child(`/notifications`);

type FirebaseNotificationProps = WithDomainContext;

class FirebaseNotification extends React.PureComponent<FirebaseNotificationProps> {

    private _initialized = false;
    private _notifications: Notification[] = [];

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

    private readonly initNotification = () => {
        const {
            currentUser,
            setContext
        } = this.props;

        const userRef = notificationRef
            .child(`/${currentUser.id}`);

        userRef.orderByKey()
            .limitToLast(6)
            .once('value', (snapshot) => {
                if (!snapshot) {
                    return;
                }

                const notificationSnapshotVal = snapshot.val();
                const notifications = map(notificationSnapshotVal, this.snapshotValToObject);

                if (!notifications) {
                    return;
                }

                this._notifications = notifications.reverse();

                setContext({
                    notifications: this._notifications
                });
            });
    }

    private readonly subcribeNotification = () => {
        const {
            currentUser,
            setContext
        } = this.props;

        const userRef = notificationRef
            .child(`/${currentUser.id}`);

        userRef
            .orderByKey()
            .limitToLast(1)
            .on('value', (snapshot) => {
                if (!snapshot || !this._notifications) {
                    return;
                }

                const notificationSnapshotVal = snapshot.val();
                const notifications = map(notificationSnapshotVal, this.snapshotValToObject);
                const notification = notifications[0];

                if (this._notifications.find(o => o.id === notification.id)) {
                    this._notifications = this._notifications.map(o => {
                        if (o.id === notification.id) {
                            return notification;
                        }

                        return o;
                    });
                } else {
                    this._notifications.unshift(notification);
                }

                setContext({
                    notifications: [...this._notifications]
                });
            });
    }

    public async componentDidUpdate() {
        const {
            currentUser
        } = this.props;

        if (!currentUser) {
            return;
        }

        if (this._initialized) {
            return;
        }

        this.initNotification();
        this.subcribeNotification();

        this._initialized = true;
    }

    public render() {
        return null;
    }
}

export default withContext<DomainContext>('currentUser')(FirebaseNotification);
