import firebase from '@firebase/app';
import { thumbFileName } from './utils_db';
import { firestore, Timestamp, storageRef } from '../firebase';
import makeCardFuncs from './card_db';
const { FieldValue } = firebase.firestore;
export const readAllUsers = (envId) => {
    const fire = envId
        ? firestore
            .collection('users')
            .where('envIds', 'array-contains', envId)
        : firestore.collection('users');
    return fire.get().then((querySnapshot) => {
        const usrData = querySnapshot.docs.map((doc) => doc.data());
        const dataPromises = usrData.map((d) => {
            const thumbNailRef = storageRef.child(`/images/usr/${thumbFileName(d.uid)}`);
            // return d;
            return thumbNailRef.getDownloadURL().then(url => ({ ...d, thumbnail: url }), () => {
                // console.log('err', err);
                // TODO: check later
                const img = { ...d, thumbnail: null };
                return { ...d, ...img };
            });
        });
        return Promise.all(dataPromises).catch(error => console.log('error in reading users', error));
    });
};
export const readAllTmpUsers = () => firestore
    .collection('tmp-users')
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
export const deleteUser = (uid) => firestore
    .collection('users')
    .doc(uid)
    .delete();
export const deleteTmpUser = (email) => firestore
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
export const readTmpUser = (email) => firestore
    .collection('tmp-users')
    .doc(email)
    .get()
    .then((doc) => {
    const usr = doc.data() || {};
    return usr;
});
export const doCreateTmpUser = (user) => firestore
    .collection('tmp-users')
    .doc(user.email)
    .set(user);
// TODO change later
export const getOneUserByEmail = (email, tmp = false) => firestore
    .collection(tmp ? 'tmpUsers' : 'users')
    .where('email', '==', email)
    .get()
    .then((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data.length > 0 ? data[0] : null;
});
export const doReadDetailUser = (uid) => firestore
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
    const usr = doc.data();
    return { ...usr, createdCards: [], collectedCards: [] };
});
export const doReadOneUser = (uid) => firestore
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
    const usr = doc.data();
    return usr;
});
export const getThumbNailRef = (uid) => storageRef.child(`/images/usr/${thumbFileName(uid)}`);
export const getUserEnvs = (uid) => firestore
    .collection('card-environments')
    .get()
    .then((querySnapshot) => Promise.all(querySnapshot.docs.map((envDoc) => {
    const env = envDoc.data();
    if (!env) {
        throw new Error('data not defined on getUserEnvs');
    }
    return firestore
        .collection('card-environments')
        .doc(env.id)
        .collection('users')
        .get()
        .then((qs) => qs.docs.map((d) => {
        const data = d.data();
        if (data)
            return data.uid;
        throw new Error('data not defined on getUserEnvs');
    }))
        .then((userIds) => userIds.includes(uid) ? env : null);
})));
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
export const getDetailedUserInfo = ({ uid, userEnvId }) => {
    const { doReadCreatedCards } = makeCardFuncs(userEnvId);
    return doReadOneUser(uid).then((usr) => doReadCreatedCards(uid).then((createdCards) => ({
        ...usr,
        createdCards,
        collectedCards: []
    })));
};
export const doCreateUser = (userProfile) => firestore
    .collection('users')
    // TODO: verify later
    .doc(userProfile.uid)
    .set(userProfile);
export const doInviteUser = (userProfile) => firestore
    .collection('users')
    .where('email', '==', userProfile.email)
    .get()
    .then((doc) => {
    if (!doc.data()) {
        return firestore
            .collection('tmp-users')
            .doc(userProfile.email)
            .set({ ...userProfile, created: Timestamp.now() });
    }
    // TODO check
    throw Error('User already exists');
});
export const bookmarkCard = (uid, cardId) => {
    firestore
        .collection('users')
        .doc(uid)
        .set({
        bookmarkedCards: firestore.FieldValue.arrayUnion(cardId)
    });
};
export const doRemoveEnvFromUser = ({ uid, envId }) => {
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
export const doAddEnvToUser = ({ uid, envId }) => Promise.all([
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
