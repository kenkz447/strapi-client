import firebase from 'firebase/app';
import map from 'lodash/map';
import * as React from 'react';
import { withContext } from 'react-context-service';

import { AppNotification, DomainContext, WithDomainContext } from '../base';

require('firebase/database');

const notificationsRefUrl = 'https://furnituremaker-eaafa.firebaseio.com';

firebase.initializeApp({
    apiKey: 'AIzaSyD6zN2cN7Y3-bPfgC085qjib2toP2BQ3uY',
    authDomain: 'furnituremaker-eaafa.firebaseapp.com',
    databaseURL: notificationsRefUrl,
    projectId: 'furnituremaker-eaafa',
    storageBucket: 'furnituremaker-eaafa.appspot.com',
    messagingSenderId: '515981406117'
});

type FirebaseNotificationProps = WithDomainContext;

class FirebaseNotification extends React.PureComponent<FirebaseNotificationProps> {
    readonly notificationRef!: firebase.database.Reference;

    constructor(props: FirebaseNotificationProps) {
        super(props);
        const firebaseDB = firebase.database();
        this.notificationRef = firebaseDB.refFromURL(notificationsRefUrl);
    }

    private readonly snapshotValToObject = (value, key) => ({
        ...value,
        id: key
    })

    private readonly queryNotifications = async (ref: string, option?): Promise<AppNotification[]> => {
        const notificationChildRef = this.notificationRef.child(`${ref}/notifications`);

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
        this.notificationRef
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
