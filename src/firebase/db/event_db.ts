import {
  QuerySnapshot,
  DocumentSnapshot
} from '@firebase/firestore-types';

import Event from '~/constants/eventType';

import {firestore, Timestamp} from '../firebase';

export const doReadEventsFromDomain = (domain: string) =>
  // Get last 10 events
  firestore
    .collection('events')
    .where('domain', '==', domain)
    .orderBy('created', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data())
    );

export const doReadAllEvents = () =>
  // Get last 10 events
  firestore
    .collection('events')
    .orderBy('created', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data())
    );

export const doReadEventsFromUser = (email: string): Promise<Event[]> =>
  // Get last 10 events
  firestore
    .collection('events')
    .where('payload.user.email', '==', email)
    .orderBy('created', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map(
        (doc: DocumentSnapshot) => {
          const data = doc.data();
          return data || [];
        }
        // console.log('USER EVENTS QUERIED ', doc.data());
      )
    );

export const doReadEventsFromUserInTime = (
  uid: string,
  startTime: Date,
  endTime: Date
): Promise<Event[]> =>
  firestore
    .collection('events')
    .where('payload.user.uid', '==', uid)
    .where('created', '>=', startTime)
    .where('created', '<=', endTime)
    .orderBy('created', 'desc')
    .get()
    .then((qs: QuerySnapshot) =>
      qs.docs.map((d: DocumentSnapshot) => {
        const data = d.data();
        return data || [];
      })
    );

export const doCreateEvent = (
  domain: string,
  type: string,
  payload: object
) => {
  firestore.collection('events').add({
    domain,
    type,
    created: Timestamp.now(),
    payload
  });
};
