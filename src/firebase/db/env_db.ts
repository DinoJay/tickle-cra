import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';

import {
  QuerySnapshot,
  DocumentSnapshot,
  DocumentData
} from '@firebase/firestore-types';

import { firestore } from '../firebase';

import UserEnv from '~/constants/userEnvType';

// TODO: that's a workaround
const FieldValue = firestore.FieldValue;

export const doReadPublicEnvs = (): Promise<UserEnv>[] =>
  firestore
    .collection('card-environments')
    .where('publicEnv', '==', true)
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      Promise.all(
        querySnapshot.docs.map((q: DocumentSnapshot) =>
          Promise.all([
            q.ref
              .collection('rewards')
              .get()
              .then((qs: QuerySnapshot) => ({
                rewards: qs.docs.map((d: DocumentSnapshot) => d.data())
              })),
            q.ref
              .collection('topics')
              .get()
              .then((qs: QuerySnapshot) => ({
                topics: qs.docs.map((d: DocumentSnapshot) => d.data())
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
          ]).then(res =>
            res.reduce((acc, d) => ({ ...d, ...acc }), q.data())
          )
        )
      )
    );

export const doReadEnvs = (uid: string) =>
  firestore
    .collection('card-environments')
    .where('users', 'array-contains', uid)
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      Promise.all(
        querySnapshot.docs.map((q: DocumentSnapshot) =>
          Promise.all([
            q.ref
              .collection('rewards')
              .get()
              .then((qs: QuerySnapshot) => ({
                rewards: qs.docs.map(d => d.data())
              })),
            q.ref
              .collection('topics')
              .get()
              .then((qs: QuerySnapshot) => ({
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
          ]).then(res =>
            res.reduce((acc, d) => ({ ...d, ...acc }), q.data())
          )
        )
      )
    );

const geoFeatRefDb = (userEnvId: string) =>
  firestore
    .collection('card-environments')
    .doc(userEnvId)
    .collection('geoFeature');

export const doReadMapFeats = (userEnvId: string) =>
  geoFeatRefDb(userEnvId)
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map(envDoc => envDoc.data())
    );

export const doReadAvailableEnvs = (
  uid: string
): Promise<UserEnv[] | DocumentData> =>
  Promise.all([doReadEnvs(uid), doReadPublicEnvs()]).then(us => {
    const uniqEnvs = uniqBy(flatten(us), 'id');
    return uniqEnvs;
  });

export const doCreateMapFeat = (
  userEnvId: string,
  geoJson: { id: string }
) =>
  geoFeatRefDb(userEnvId)
    .doc(geoJson.id)
    .set(geoJson);
// .catch(err => {
//   throw new Error(`Error when creating a new geoJson: ${err}`);
// });

export const doDeleteMapFeat = (userEnvId: string, id: string) => {
  if (typeof id === 'string') {
    return geoFeatRefDb(userEnvId)
      .doc(id)
      .delete();
  }
  throw new Error('Error paremeter id is not of type String');
};

export const doReadUserIdsFromEnv = (envId: string): string[] =>
  firestore
    .collection('card-environments')
    .doc(envId)
    .get()
    .then((querySnapshot: any) =>
      querySnapshot.docs(
        (doc: DocumentSnapshot) =>
          (doc.data() && doc.data()!.users) || []
      )
    );

// export const doReadOneEnv = id =>
//   firestore
//     .collection('card-environments')
//     .doc(id)
//     .get();

export const doReadAllEnvs = () =>
  firestore
    .collection('card-environments')
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      Promise.all(
        querySnapshot.docs.map((q: DocumentSnapshot) =>
          Promise.all([
            q.ref
              .collection('rewards')
              .get()
              .then((qs: QuerySnapshot) => ({
                rewards: qs.docs.map((d: DocumentSnapshot) => d.data())
              })),
            q.ref
              .collection('topics')
              .get()
              .then((qs: QuerySnapshot) => ({
                topics: qs.docs.map((d: DocumentSnapshot) => d.data())
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
          ]).then(res =>
            res.reduce((acc, d) => ({ ...d, ...acc }), q.data())
          )
        )
      )
    );

export const doReadOneEnv = (id: string) =>
  firestore
    .collection('card-environments')
    .doc(id)
    .get()
    .then((doc: DocumentSnapshot) =>
      Promise.all([
        doc.ref
          .collection('rewards')
          .get()
          .then((qs: QuerySnapshot) => ({
            rewards: qs.docs.map((d: DocumentSnapshot) => d.data())
          })),
        doc.ref
          .collection('topics')
          .get()
          .then((qs: QuerySnapshot) => ({
            topics: qs.docs.map((d: DocumentSnapshot) => d.data())
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
      ]).then(res =>
        res.reduce((acc, d) => ({ ...d, ...acc }), doc.data())
      )
    );

// export const doReadEnvs = () =>
//   firestore.collection('card-environments').get();

export const doCreateEnv = ({
  id,
  authorId,
  name,
  description,
  img,
  ...rest
}: UserEnv): Promise<void> =>
  firestore
    .collection('card-environments')
    .doc(id)
    .set({ id, authorId, name, description, img, ...rest });

export const doDeleteEnv = (id: string) =>
  firestore
    .collection('card-environments')
    .doc(id)
    .delete();

export const doDeleteUserFromEnv = ({
  uid,
  envId
}: {
  uid: string;
  envId: string;
}) =>
  firestore
    .collection('card-environments')
    .doc(envId)
    .update({
      users: FieldValue.arrayRemove(uid)
    });

export const doAddUserToEnv = ({
  uid,
  envId
}: {
  uid: string;
  envId: string;
}) =>
  firestore
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
