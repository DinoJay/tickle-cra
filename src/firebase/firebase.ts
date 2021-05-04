import firebase from '@firebase/app';
import '@firebase/firestore';
//
// Add additional services you want to use
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/messaging';
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");
// import * as fb from 'firebase';

// import 'firebase-auth';

import config from './firebase_api_keys.json';

const app: {
  // DocumentSnapshot: any;
  name: any;
  options: any;
  automaticDataCollectionEnabled: any;
  delete: any;
  messaging: any;
} = firebase.initializeApp(config);

const firestore: any = firebase.firestore!(app);

const {Timestamp} = firebase.firestore!;

const {DocumentSnapshot, QuerySnapshot} = firestore;

export const DocumentSnapshotType = typeof DocumentSnapshot;
export const QuerySnapshotType = typeof QuerySnapshot;

// const settings = {/* your settings... */ timestampsInSnapshots: true};

// firestore.settings(settings);

const auth = firebase.auth!();

const storageRef = firebase.storage!().ref();
let messaging: null | {
  getToken: Function;
  requestPermission: Function;
} = null;

if (firebase.messaging!.isSupported()) {
  messaging = app.messaging();

  messaging!
    .requestPermission()
    .then(() => {
      console.log('Permission is granted by user');
      return messaging!.getToken();
    })
    .then((token: string) => {
      console.log('FCM Token:', token);
    })
    .catch((error: unknown) => {
      console.log('Error occurred:', error);
    });
}

// Notification part
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(
//   'BGD9AlCtAz0SR-JbSYr7Fx8B7BLx1cOEaWVsQJJicT24XvsLhKNxiIHfvgWquhAIsft3oY5Kj7j-_wVoI2kAg0M'
// );
//

export {firestore, Timestamp, auth, storageRef, messaging};
