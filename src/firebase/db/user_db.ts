import {
  QuerySnapshot,
  DocumentSnapshot
  // DocumentData
} from '@firebase/firestore-types';

import UserEnv from '~/constants/userEnvType';
import { Card } from '~/constants/cardFields';

import { thumbFileName } from './utils_db';
import { User, ExtendedUser } from '~/constants/userFields';

import { firestore, Timestamp, storageRef } from '../firebase';

import makeCardFuncs from './card_db';

const { FieldValue } = firestore;

export const readAllUsers = (envId?: string) => {
  const fire = envId
    ? firestore
      .collection('users')
      .where('envIds', 'array-contains', envId)
    : firestore.collection('users');

  return fire.get().then((querySnapshot: QuerySnapshot) => {
    const usrData: (User)[] = querySnapshot.docs.map(
      (doc: DocumentSnapshot) => doc.data() as User
    );

    const dataPromises = usrData.map((d: User) => {
      const thumbNailRef = storageRef.child(
        `/images/usr/${thumbFileName(d.uid)}`
      );
      // return d;
      return thumbNailRef.getDownloadURL().then(
        url => ({ ...d, thumbnail: url }),
        () => {
          // console.log('err', err);
          // TODO: check later
          const img = { ...d, thumbnail: null };

          return { ...d, ...img };
        }
      );
    });

    return Promise.all(dataPromises).catch(error =>
      console.log('error in reading users', error)
    );
  });
};

export const readAllTmpUsers = () =>
  firestore
    .collection('tmp-users')
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data())
    );

export const deleteUser = (uid: string) =>
  firestore
    .collection('users')
    .doc(uid)
    .delete();

export const deleteTmpUser = (email: string) =>
  firestore
    .collection('tmp-users')
    // .where('uid', '==', uid)
    .doc(email)
    .delete();

// export const deleteTmpUserByEmail = email =>
//   firestore
//     .collection('tmp-users')
//     .doc(email)
//     .where('uid', '==', email)
//     .delete();

export const readTmpUser = (email: string) =>
  firestore
    .collection('tmp-users')
    .doc(email)
    .get()
    .then((doc: DocumentSnapshot) => {
      const usr = doc.data() || {};
      return usr;
    });

export const doCreateTmpUser = (user: User) =>
  firestore
    .collection('tmp-users')
    .doc(user.email)
    .set(user);

// TODO change later

export const getOneUserByEmail = (email: string, tmp = false) =>
  firestore
    .collection(tmp ? 'tmpUsers' : 'users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot: QuerySnapshot) => {
      const data = querySnapshot.docs.map((doc: DocumentSnapshot) =>
        doc.data()
      );
      return data.length > 0 ? data[0] : null;
    });

export const doReadDetailUser = (uid: string): Promise<ExtendedUser> =>
  firestore
    .collection('users')
    .doc(uid)
    .get()
    .then((doc: DocumentSnapshot) => {
      const usr = doc.data();

      return { ...usr, createdCards: [], collectedCards: [] };
    });

export const doReadOneUser = (uid: string): Promise<User> =>
  firestore
    .collection('users')
    .doc(uid)
    .get()
    .then((doc: DocumentSnapshot) => {
      const usr = doc.data();
      return usr;
    });

export const getThumbNailRef = (uid: string) =>
  storageRef.child(`/images/usr/${thumbFileName(uid)}`);

export const getUserEnvs = (uid: string): Promise<UserEnv> =>
  firestore
    .collection('card-environments')
    .get()
    .then((querySnapshot: QuerySnapshot) =>
      Promise.all(
        querySnapshot.docs.map((envDoc: DocumentSnapshot) => {
          const env = envDoc.data();
          if (!env) {
            throw new Error('data not defined on getUserEnvs');
          }
          return firestore
            .collection('card-environments')
            .doc(env.id)
            .collection('users')
            .get()
            .then((qs: QuerySnapshot) =>
              qs.docs.map((d: DocumentSnapshot) => {
                const data = d.data();
                if (data) return data.uid;
                throw new Error('data not defined on getUserEnvs');
              })
            )
            .then((userIds: string[]) =>
              userIds.includes(uid) ? env : null
            );
        })
      )
    );

// export const readUserIdsFromEnv = envId =>
//   firestore
//     .collection('card-environments')
//     .doc(envId)
//     .collection('users')
//     .get()
//     .then(querySnapshot => {
//       const data = [];
//       querySnapshot.docs.mapforEach(doc => data.push(doc.data()));
//       return data;
//     });

// export const doReadUserIdsFromEnv = envId =>
//   firestore
//     .collection('card-environments')
//     .doc(envId)
//     .collection('users')
//     .get()
//     .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));

// export const doReadUsersFromEnv = envId =>
//   doReadUserIdsFromEnv(envId).then(uidObjs =>
//     Promise.all(uidObjs.map(u => u.uid).map(doReadOneUser))
//   );

// .catch(err => console.log('err  gkkketUser', err));

export const getDetailedUserInfo = ({
  uid,
  userEnvId
}: {
  uid: string;
  userEnvId: string;
}): Promise<User> => {
  const { doReadCreatedCards } = makeCardFuncs(userEnvId);
  return doReadOneUser(uid).then((usr: User) =>
    doReadCreatedCards(uid).then((createdCards: Card[]) => ({
      ...usr,
      createdCards,
      collectedCards: []
    }))
  );
};

export const doCreateUser = (userProfile: User) =>
  firestore
    .collection('users')
    // TODO: verify later
    .doc(userProfile.uid)
    .set(userProfile);

export const doInviteUser = (userProfile: User) =>
  firestore
    .collection('users')
    .where('email', '==', userProfile.email)
    .get()
    .then((doc: DocumentSnapshot) => {
      if (!doc.data()) {
        return firestore
          .collection('tmp-users')
          .doc(userProfile.email)
          .set({ ...userProfile, created: Timestamp.now() });
      }
      // TODO check
      throw Error('User already exists');
    });

export const bookmarkCard = (uid: string, cardId: string) => {
  firestore
    .collection('users')
    .doc(uid)
    .set({
      bookmarkedCards: firestore.FieldValue.arrayUnion(cardId)
    });
};

export const doRemoveEnvFromUser = ({
  uid,
  envId
}: {
  uid: string;
  envId: string;
}) => {
  return Promise.all([
    firestore
      .collection('users')
      .doc(uid)
      .update({
        envIds: FieldValue.arrayRemove(envId)
      }),
    firestore
      .collection('card-environments')
      .doc(envId)
      .update({
        uids: FieldValue.arrayRemove(uid)
      })
  ]);
};

export const doAddEnvToUser = ({
  uid,
  envId
}: {
  uid: string;
  envId: string;
}) =>
  Promise.all([
    firestore
      .collection('users')
      .doc(uid)
      .update({
        envIds: FieldValue.arrayUnion(envId)
      }),
    firestore
      .collection('card-environments')
      .doc(envId)
      .update({
        uids: FieldValue.arrayUnion(uid)
      })
  ]);
