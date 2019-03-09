import 'firebase/database';

import firebase from 'firebase/app';

const notificationsRefUrl = 'https://furnituremaker-eaafa.firebaseio.com';

firebase.initializeApp({
    apiKey: 'AIzaSyD6zN2cN7Y3-bPfgC085qjib2toP2BQ3uY',
    authDomain: 'furnituremaker-eaafa.firebaseapp.com',
    databaseURL: notificationsRefUrl,
    projectId: 'furnituremaker-eaafa',
    storageBucket: 'furnituremaker-eaafa.appspot.com',
    messagingSenderId: '515981406117'
});

const firebaseDB = firebase.database();
const firebaseAppRef = firebaseDB.refFromURL(notificationsRefUrl);

export {
    firebaseAppRef
};
