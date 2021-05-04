import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';
import firebase from '@firebase/app';
import { firestore } from '../firebase';
// TODO: that's a workaround
const { FieldValue } = firebase.firestore;
export const doReadPublicEnvs = () => firestore
    .collection('card-environments')
    .where('publicEnv', '==', true)
    .get()
    .then((querySnapshot) => Promise.all(querySnapshot.docs.map((q) => Promise.all([
    q.ref
        .collection('rewards')
        .get()
        .then((qs) => ({
        rewards: qs.docs.map((d) => d.data())
    })),
    q.ref
        .collection('topics')
        .get()
        .then((qs) => ({
        topics: qs.docs.map((d) => d.data())
    }))
    // TODO remove later
    // TODO remove later
    // TODO remove later
    // q.ref
    //   .collection('cards')
    //   .get()
    //   .then(qs => ({
    //     cards: qs.docs.map(d => d.data())
    //   }))
]).then(res => res.reduce((acc, d) => ({ ...d, ...acc }), q.data())))));
export const doReadEnvs = (uid) => firestore
    .collection('card-environments')
    .where('users', 'array-contains', uid)
    .get()
    .then((querySnapshot) => Promise.all(querySnapshot.docs.map((q) => Promise.all([
    q.ref
        .collection('rewards')
        .get()
        .then((qs) => ({
        rewards: qs.docs.map(d => d.data())
    })),
    q.ref
        .collection('topics')
        .get()
        .then((qs) => ({
        topics: qs.docs.map(d => d.data())
    }))
    // TODO remove later
    // TODO remove later
    // TODO remove later
    // q.ref
    //   .collection('cards')
    //   .get()
    //   .then(qs => ({
    //     cards: qs.docs.map(d => d.data())
    //   }))
]).then(res => res.reduce((acc, d) => ({ ...d, ...acc }), q.data())))));
const geoFeatRefDb = (userEnvId) => firestore
    .collection('card-environments')
    .doc(userEnvId)
    .collection('geoFeature');
export const doReadMapFeats = (userEnvId) => geoFeatRefDb(userEnvId)
    .get()
    .then((querySnapshot) => querySnapshot.docs.map(envDoc => envDoc.data()));
export const doReadAvailableEnvs = (uid) => Promise.all([doReadEnvs(uid), doReadPublicEnvs()]).then(us => {
    const uniqEnvs = uniqBy(flatten(us), 'id');
    return uniqEnvs;
});
export const doCreateMapFeat = (userEnvId, geoJson) => geoFeatRefDb(userEnvId)
    .doc(geoJson.id)
    .set(geoJson);
// .catch(err => {
//   throw new Error(`Error when creating a new geoJson: ${err}`);
// });
export const doDeleteMapFeat = (userEnvId, id) => {
    if (typeof id === 'string') {
        return geoFeatRefDb(userEnvId)
            .doc(id)
            .delete();
    }
    throw new Error('Error paremeter id is not of type String');
};
export const doReadUserIdsFromEnv = (envId) => firestore
    .collection('card-environments')
    .doc(envId)
    .get()
    .then((querySnapshot) => querySnapshot.docs((doc) => (doc.data() && doc.data().users) || []));
// export const doReadOneEnv = id =>
//   firestore
//     .collection('card-environments')
//     .doc(id)
//     .get();
export const doReadAllEnvs = () => firestore
    .collection('card-environments')
    .get()
    .then((querySnapshot) => Promise.all(querySnapshot.docs.map((q) => Promise.all([
    q.ref
        .collection('rewards')
        .get()
        .then((qs) => ({
        rewards: qs.docs.map((d) => d.data())
    })),
    q.ref
        .collection('topics')
        .get()
        .then((qs) => ({
        topics: qs.docs.map((d) => d.data())
    }))
    // TODO remove later
    // TODO remove later
    // TODO remove later
    // q.ref
    //   .collection('cards')
    //   .get()
    //   .then(qs => ({
    //     cards: qs.docs.map(d => d.data())
    //   }))
]).then(res => res.reduce((acc, d) => ({ ...d, ...acc }), q.data())))));
export const doReadOneEnv = (id) => firestore
    .collection('card-environments')
    .doc(id)
    .get()
    .then((doc) => Promise.all([
    doc.ref
        .collection('rewards')
        .get()
        .then((qs) => ({
        rewards: qs.docs.map((d) => d.data())
    })),
    doc.ref
        .collection('topics')
        .get()
        .then((qs) => ({
        topics: qs.docs.map((d) => d.data())
    }))
    // TODO remove later
    // TODO remove later
    // TODO remove later
    // q.ref
    //   .collection('cards')
    //   .get()
    //   .then(qs => ({
    //     cards: qs.docs.map(d => d.data())
    //   }))
]).then(res => res.reduce((acc, d) => ({ ...d, ...acc }), doc.data())));
// export const doReadEnvs = () =>
//   firestore.collection('card-environments').get();
export const doCreateEnv = ({ id, authorId, name, description, img, ...rest }) => firestore
    .collection('card-environments')
    .doc(id)
    .set({ id, authorId, name, description, img, ...rest });
export const doDeleteEnv = (id) => firestore
    .collection('card-environments')
    .doc(id)
    .delete();
export const doDeleteUserFromEnv = ({ uid, envId }) => firestore
    .collection('card-environments')
    .doc(envId)
    .update({
    users: FieldValue.arrayRemove(uid)
});
export const doAddUserToEnv = ({ uid, envId }) => firestore
    .collection('card-environments')
    .doc(envId)
    .update({
    users: FieldValue.arrayUnion(uid)
});
// export const doReadCardFieldVisibility = envId =>
//   firestore
//     .collection('card-environments')
//     .doc(envId)
//     .collection('cardFieldVisibility')
//     .get();
// TODO
// export const doReadCardVisibility = ({envId}) =>
//   firestore
//     .collection('card-environments')
//     .doc(envId)
//     .collection('cardFieldVisibility')
//     .get();
