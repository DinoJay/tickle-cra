import { firestore, Timestamp } from '../firebase';
export const doReadEventsFromDomain = (domain) => 
// Get last 10 events
firestore
    .collection('events')
    .where('domain', '==', domain)
    .orderBy('created', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
export const doReadAllEvents = () => 
// Get last 10 events
firestore
    .collection('events')
    .orderBy('created', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
export const doReadEventsFromUser = (email) => 
// Get last 10 events
firestore
    .collection('events')
    .where('payload.user.email', '==', email)
    .orderBy('created', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return data || [];
}
// console.log('USER EVENTS QUERIED ', doc.data());
));
export const doReadEventsFromUserInTime = (uid, startTime, endTime) => firestore
    .collection('events')
    .where('payload.user.uid', '==', uid)
    .where('created', '>=', startTime)
    .where('created', '<=', endTime)
    .orderBy('created', 'desc')
    .get()
    .then((qs) => qs.docs.map((d) => {
    const data = d.data();
    return data || [];
}));
export const doCreateEvent = (domain, type, payload) => {
    firestore.collection('events').add({
        domain,
        type,
        created: Timestamp.now(),
        payload
    });
};
