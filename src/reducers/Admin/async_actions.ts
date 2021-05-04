// import uuidv1 from 'uuid/v1';

// import CardDB from '~/firebase/db/card_db';

// import {cardFields} from '~/components/CardFieldTemplates';

// import {extractCardFields} from '~/constants/cardFields';
import uniqBy from 'lodash/uniqBy';
import UserEnv from '~/constants/userEnvType';
import Event from '~/constants/eventType';
import {User} from '~/constants/userFields';

//
import {
  doCreateEnv,
  doAddUserToEnv,
  doReadAllEnvs,
  doDeleteEnv
  // doReadEnvs
} from '~/firebase/db/env_db';

import {
  readAllUsers,
  readAllTmpUsers,
  doCreateTmpUser,
  doAddEnvToUser,
  doCreateUser,
  deleteUser,
  deleteTmpUser,
  doInviteUser,
  doRemoveEnvFromUser
} from '~/firebase/db/user_db';

import {
  doReadAllEvents,
  doReadEventsFromUser
} from '~/firebase/db/event_db';

import {
  receiveUsers,
  receiveAllEnvs,
  receiveAllEvents,
  // submitActivityReview,
  // submitActivityReviewSuccess,
  // selectUsersByEnv,
  insertUserIntoEnv,
  deleteUserFromEnv,
  deleteEnv,
  addEnv,
  updateEnv as updateEnvAction,
  addUser,
  updateUserInfo,
  // userRegistrationError,
  removeUserSuccess,
  removeUser
} from './actions';

// import {updateAuthUser} from '~/reducers/Session/async_actions';
import {setAuthUserInfo} from '~/reducers/Session/actions';

// import NearbyPlaces from '../places.json';

// export const REQUEST_CHALLENGES = 'REQUEST_CHALLENGES';
// function requestChallenges(subreddit) {
//   return {
//     type: REQUEST_CHALLENGES,
//     subreddit
//   };
// }
// export const RECEIVE_CHALLENGES = 'RECEIVE_CHALLENGES';
// function receiveCards(json) {
//   return {
//     type: RECEIVE_CHALLENGES,
//     challenges: json,
//     receivedAt: Date.now()
//   };
// }

// export const SCREEN_RESIZE = 'SCREEN_RESIZE_jan';
// export function screenResize(options) {
//   return { type: SCREEN_RESIZE, options };
// }
//
//
//
export function fetchAllEnvs() {
  return function(dispatch: Function) {
    return doReadAllEnvs().then((envs: UserEnv[]) => {
      dispatch(receiveAllEnvs(envs));
    });
  };
}

export function createEnv(env: UserEnv) {
  return function(dispatch: Function, getState: Function) {
    const {authUser} = getState().Session;

    const newEnv = {...env};

    return doCreateEnv(newEnv).then(() => {
      doAddUserToEnv({uid: authUser.uid, envId: env.id});

      dispatch(
        setAuthUserInfo({
          userEnvs: [...authUser.userEnvs, newEnv]
        })
      );
      dispatch(addEnv(newEnv));
    });
  };
}

export function removeEnv(envId: string) {
  return function(dispatch: Function) {
    return doDeleteEnv(envId).then(() => {
      dispatch(deleteEnv(envId));
    });
  };
}

export function updateEnv(env: UserEnv) {
  return function(dispatch: Function) {
    return doCreateEnv(env).then(() => {
      dispatch(updateEnvAction(env));
    });
  };
}

// export function registerUserToEnv({userEnvId, uid}) {
//   return function(dispatch) {
//     return doCreateEnv({uid, userEnvId}).then(users => {
//       dispatch(insertUserIntoEnv(uid));
//     });
//   };
// }

export function removeUserAccount(uid: string) {
  return function(dispatch: Function) {
    dispatch(removeUser(uid));
    Promise.all([deleteUser(uid), deleteTmpUser(uid)]).then(() => {
      dispatch(removeUserSuccess());
    });
  };
}

export function fetchUsers() {
  return function(dispatch: Function) {
    const promises = [readAllUsers(), readAllTmpUsers()];

    Promise.all(promises).then(([users, tmpUsers]) => {
      dispatch(receiveUsers(uniqBy([...users, ...tmpUsers], 'uid')));
    });

    // const usersWithEnvIdsPromise = readAllUsers().then(users =>

    //   Promise.all(
    //     users.map(u =>
    //       doReadEnvs(u.uid).then(userEnvs => ({
    //         ...u,
    //         userEnvIds: userEnvs.map(e => e.id),
    //         userEnvs
    //       }))
    //     )
    //   )
    // );

    // const promises = [usersWithEnvIdsPromise, readAllTmpUsers()];

    // Promise.all(promises).then(([users, tmpUsers]) => {
    //   dispatch(receiveUsers([...users, ...tmpUsers]));
    // });
  };
}

export function inviteUser(usrInfo: User) {
  // const usr = {...usrInfo, uid: uuidv1(), tmp: true};
  return function(dispatch: Function) {
    return doInviteUser(usrInfo).then(() => {
      dispatch(addUser({...usrInfo}));
    });
    // .catch(() => {
    //   dispatch(
    //     userRegistrationError({
    //       type: 'User Registration',
    //       msg: 'User has been already registered'
    //     })
    //   );
    // });
  };
}

// return function(dispatch) {
// doReadOneUserByEmail(usr.email).then(d => {
//   if (d === null) {
//     doCreateTmpUser(usr).then(() => {
//       dispatch(addUser({...usr}));
//     });
//   } else {
//     dispatch(
//       userRegistrationError({
//         type: 'User Registration',
//         msg: 'User has been already registered'
//       })
//     );
//   }
// });
// };

export function updateUser(usrInfo: User) {
  return function(dispatch: Function) {
    dispatch(updateUserInfo(usrInfo));
    if (usrInfo.tmp) {
      doCreateTmpUser(usrInfo);
    } else {
      doCreateUser(usrInfo);
    }
  };
}

export function addUserToEnv({
  envId,
  usrInfo
}: {
  envId: string;
  usrInfo: User;
}) {
  return function(dispatch: Function) {
    dispatch(
      updateUserInfo({
        ...usrInfo,
        envIds: [...(usrInfo.envIds || []), envId]
      })
    );
    dispatch(insertUserIntoEnv({uid: usrInfo.uid, envId}));
    doAddEnvToUser({uid: usrInfo.uid, envId});
  };
}

export function excludeUserFromEnv({
  envId,
  usrInfo
}: {
  envId: string;
  usrInfo: User;
}) {
  return function(dispatch: Function) {
    dispatch(
      updateUserInfo({
        ...usrInfo,
        envIds: usrInfo.envIds.filter(eId => eId !== envId)
      })
    );
    dispatch(deleteUserFromEnv({uid: usrInfo.uid, envId}));
    doRemoveEnvFromUser({uid: usrInfo.uid, envId});
  };
}

export function fetchAllUserEvents(email: string) {
  return function(dispatch: Function) {
    doReadEventsFromUser(email).then((events: Event[]) => {
      dispatch(receiveAllEvents(events));
    });
  };
}

export function fetchAllEvents() {
  return function(dispatch: Function) {
    doReadAllEvents().then((events: Event[]) => {
      dispatch(receiveAllEvents(events));
    });
  };
}

// export function fetchCards({userEnvId, authorId = null, playerId = null}) {
//   const db = CardDB(userEnvId);
//
//   return function(dispatch) {
//     return db.readCards({authorId, playerId: null}).then(cards => {
//       // console.log('USers', data);
//       // const promises = data.map(({ uid }) => db.getDetailedUserInfo(uid));
//       dispatch(receiveCards(cards));
//       // Promise.all(promises).then(detailedUsers => {
//       //   dispatch(receiveUsers(detailedUsers));
//       //   dispatch(
//       //     getCards(
//       //       uniqBy(flatten(detailedUsers.map(u => u.createdCards)), 'id')
//       //     )
//       //   );
//       // });
//     });
//   };
// }
// export function asyncSubmitChallengeReview(challengeSubmission) {
//   const {cardId, playerId, ...challengeData} = challengeSubmission;
//   console.log('challengeSubmission', {cardId, playerId, ...challengeData});
//   return function(dispatch) {
//     dispatch(submitActivityReview(challengeSubmission));
//     console.log('submit challenge review', {cardId, playerId, challengeData});
//     return db
//       .addChallengeSubmission({cardId, playerId, challengeData})
//       .then(() => dispatch(submitActivityReviewSuccess()));
//     // .catch(err => {
//     //   throw new Error(`error saving challenge submission ${err}`);
//     // });
//   };
// }

// export function fetchAllCardsWithSubmissions() {
//   return function(dispatch) {
//     // dispatch(loadingCards(true));
//     return db.readAllCards().then(cards => {
//       // dispatch(loadingCards(false));
//       dispatch(getCards(cards));
//       db.onceGetUsers().then(users => {
//         const usersWithSubmissions = users.map(u => {
//           const createdCards = cards
//             .filter(c => c.uid === u.uid)
//             .map(d => d.id);
//           const challengeSubmissions = cards.filter(c =>
//             c.allChallengeSubmissions.find(s => s.playerId === u.uid),
//           );
//           return {...u, challengeSubmissions, , userEnvIdcreatedCards};
//         });
//         dispatch(receiveUsers(usersWithSubmissions));
//         // dispatch(receiveUsers(newUsers));
//       });
//     });
//   };
// }
