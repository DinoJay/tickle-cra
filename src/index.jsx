import React from 'react';
import { render } from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { firebase } from './firebase';

import store from './store';

import { updateFirebaseMessagingToken } from './reducers/Session/async_actions';

import './styles/tailwind.css';
import './styles/index.scss';
import './styles/layout.scss';
import './styles/comps.scss';

import App from './App';

smoothscroll.polyfill();

/**
 * render the whole app to the DOM
 */
const startApp = () => {
  render(<App />, document.getElementById('app'));

  const { messaging } = firebase;
  if (messaging && messaging.isSupported && messaging.isSupported()) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then(registration => {
        messaging.useServiceWorker(registration);
      });
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then(token => {
        const fcmToken = {
          firebaseMessagingToken: token
        };
        firebase.auth.onAuthStateChanged(auth => {
          if (auth !== null) {
            store.dispatch(updateFirebaseMessagingToken(fcmToken));
          }
        });
      })
      .catch(error => {
        console.log('Error occurred:', error);
      });

    messaging.onTokenRefresh(() => {
      messaging.getToken().then(refreshedToken => {
        const fcmToken = {
          firebaseMessagingToken: refreshedToken
        };
        firebase.auth.onAuthStateChanged(auth => {
          if (auth !== null) {
            store.dispatch(updateFirebaseMessagingToken(fcmToken));
          }
        });
      });
    });

    messaging.onMessage(payload => {
      console.log('Message received', payload);
    });
  }

  firebase.auth.onAuthStateChanged(auth => {
    if (auth) {
      const { uid, email } = auth;

      const event = {
        domain: 'users',
        type: 'login',
        payload: {
          user: {
            uid,
            email
          }
        }
      };

      fetch(
        'https://us-central1-tickle-194510.cloudfunctions.net/userEvents-onLogin',
        {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          body: JSON.stringify(event),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
  });
}

startApp();
