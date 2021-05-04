import uuidv1 from 'uuid/v1';
import {
  QuerySnapshot,
  DocumentSnapshot
  // DocumentData
} from '@firebase/firestore-types';
import {firestore} from '../firebase';
// import ActivitySubmission from '~/constants/activitySubmissionType';

const makeActivityFuncs = (
  ENV_STR: string
): {
  // getAllActivitySubs: Function;
  doReadOneActivitySub: Function;
  getAllActivitySubsOfUser: Function;
  doAddActivitySub: Function;
  doRemoveActivitySub: Function;
  removeChallengeSubmission: Function;
} => {
  const TICKLE_ENV_REF = firestore
    .collection('card-environments')
    .doc(ENV_STR);

  // Get all activitySubmissions from the card
  // const getAllActivitySubs = (
  //   cid: string
  // ): Promise<ActivitySubmission[]> => {
  //   const chSub = TICKLE_ENV_REF.collection('cards')
  //     .doc(cid)
  //     .collection('activitySubmissions');
  //
  //   return chSub.get().then((snapshot: QuerySnapshot) =>
  //     snapshot.docs.map((item: DocumentSnapshot) => {
  //       const {value, type, ...rest}: any = item.data();
  //       return {
  //         ...rest,
  //         value,
  //         type,
  //         cardId: cid,
  //         playerId: item.id
  //       };
  //     })
  //   );
  // };

  // TODO: do we need this???
  // Get all the activitySubmissions from the user
  const getAllActivitySubsOfUser = (uid: string): Promise<void> =>
    firestore
      .collection('users')
      .doc(uid)
      .collection('activitySubmissions')
      .get()
      .then((snapshot: QuerySnapshot) => {
        snapshot.docs.map((item: DocumentSnapshot) => {
          const d = item.data();
          if (d)
            return {
              ...d,
              cardId: item.id,
              playerId: uid
            };
          throw new Error('getAllActivitySubsOfUser error');
        });
      });

  const doReadOneActivitySub = ({id, uid}: {id: string; uid: string}) =>
    TICKLE_ENV_REF.collection('cards')
      .doc(id)
      .collection('activitySubmissions')
      .doc(uid)
      .get()
      .then((doc: DocumentSnapshot) =>
        !doc.exists ? null : {...doc.data(), uid, id: uuidv1()}
      );

  const doAddActivitySub = ({
    uid,
    id,
    ...rest
  }: {
    uid: string;
    id: string;
  }) =>
    TICKLE_ENV_REF.collection('cards')
      .doc(id)
      .collection('activitySubmissions')
      .doc(uid)
      .set({uid, id, ...rest});

  const doRemoveActivitySub = ({uid, id}: {uid: string; id: string}) =>
    TICKLE_ENV_REF.collection('cards')
      .doc(id)
      .collection('activitySubmissions')
      .doc(uid)
      .delete();

  const removeChallengeSubmission = ({
    id,
    uid
  }: {
    id: string;
    uid: string;
  }): Promise<void> =>
    TICKLE_ENV_REF.collection('cards')
      .doc(id)
      .collection('activitySubmissions')
      .doc(uid)
      .delete();

  return {
    doRemoveActivitySub,
    // getAllActivitySubs,
    doReadOneActivitySub,
    getAllActivitySubsOfUser,
    doAddActivitySub,
    removeChallengeSubmission
  };
};

export default makeActivityFuncs;
