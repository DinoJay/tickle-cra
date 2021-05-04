// import uniqBy from 'lodash/uniqBy';
// import flatten from 'lodash/flatten';
import uniq from "lodash/uniq";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import AppStateType from "~/reducers/appStateType";
import { User, userFields } from "~/constants/userFields";
import UserEnv from "~/constants/userEnvType";
import AuthUser from "~/constants/authUserType";
import { SessionStateType } from "~/reducers/Session";

import { auth } from "~/firebase";

import {
  readAllUsers,
  doReadOneUser,
  readTmpUser,
  doCreateUser,
  doAddEnvToUser,
  doRemoveEnvFromUser
} from "~/firebase/db/user_db";

import { doReadOneEnv } from "~/firebase/db/env_db";

import { setAuthUserInfo, setUsers } from "./actions";
import { SessionActionTypes } from "./types";

import { insertUserIntoEnv, deleteUserFromEnv } from "../Admin/actions";

type ThunkActionType = ThunkAction<void, AppStateType, null, Action<string>>;
// const getAllEnvs = uid =>
//   Promise.all([doReadEnvs(uid), doReadPublicEnvs()]).then(us => {
//     const uniqEnvs = uniqBy(flatten(us), 'id');
//     return uniqEnvs;
//   });

export const fetchUser = (uid: string): ThunkActionType => (
  dispatch
): Promise<SessionActionTypes> =>
  doReadOneUser(uid).then(
    (usrInfo: User): Promise<SessionActionTypes> => {
      const profile = userFields(usrInfo);
      const prs = uniq(["default", ...profile.envIds]).map(doReadOneEnv);
      return Promise.all(prs).then(userEnvs =>
        dispatch(
          setAuthUserInfo({
            uid,
            ...profile,
            userEnvs: userEnvs.filter(d => !!d.id)
            // userEnvId: getState().Session.userEnvId
          })
        )
      );
    }
  );

// TODO no dispatch
export const signIn = ({
  email,
  password
}: {
  email: string;
  password: string;
}) => (): Promise<unknown> =>
  auth.doSignInWithEmailAndPassword(email, password);

export const fetchUsers = (userEnvId: string): ThunkActionType => (
  dispatch
): Promise<unknown> =>
  readAllUsers(userEnvId).then((users: User[]) => {
    dispatch(setUsers(users));
  });

export function updateAuthUser(
  usr: object
): ThunkAction<void, AppStateType, null, Action<string>> {
  return (dispatch, getState): Promise<void> | undefined => {
    const sessionState: SessionStateType = getState().Session;
    const { authUser }: { authUser: AuthUser | null } = sessionState;
    if (!authUser) return;

    const newUsr = { ...authUser, ...usr };

    dispatch(setAuthUserInfo(usr));

    // TODO
    const { userEnvs: _, ...restUsr } = newUsr;

    return doCreateUser(restUsr).then(() => {
      dispatch(setAuthUserInfo({ ...newUsr }));
    });
  };
}

export function updateFirebaseMessagingToken(
  // TODO: David
  token: any
): ThunkAction<void, AppStateType, null, Action<string>> {
  return (dispatch: Function, getState: Function): Promise<void> => {
    const { authUser } = getState().Session;

    const newUsr = { ...authUser, ...token };

    const { userEnvs: _, ...restUsr } = newUsr;

    return doCreateUser(restUsr).then(() => {
      dispatch(setAuthUserInfo({ ...restUsr }));
    });
  };
}

export function registerUserToEnv({
  uid,
  envId
}: {
  uid: string;
  envId: string;
}): ThunkActionType {
  return function(dispatch, getState: Function): Promise<void> {
    return doAddEnvToUser({ uid, envId }).then(() => {
      dispatch(insertUserIntoEnv({ uid, envId }));

      const { Admin, Session } = getState();

      const env = Admin.envs.find((e: UserEnv) => e.id === envId);

      const newEnvs = [...Session.authUser.userEnvs, env];
      // TODO remove
      dispatch(setAuthUserInfo({ userEnvs: newEnvs }));
    });
  };
}

// TODO check later
export function signUp({
  user,
  password
}: {
  user: User & { passwordOne: string; passwordTwo: string };
  password: string;
}) {
  // ts-ignore
  const { passwordOne: _, passwordTwo: __, ...userProfile } = user;

  // TODO it's not an async function anymore
  return (): Promise<void> => {
    const createUser = (profile: User): void | PromiseLike<void> =>
      readTmpUser(userProfile.email).then(
        (presetUserInfo: object): Promise<unknown> => {
          const info = {
            ...presetUserInfo,
            ...profile
          };
          return doCreateUser(info).then(() => {
            const { uid, envIds } = profile;
            envIds.forEach(envId => {
              doAddEnvToUser({ uid, envId });
            });
          });
        }
      );

    return auth
      .doCreateUserWithEmailAndPassword(userProfile.email, password)
      .then((value: any) => {
        const { uid } = value.user;

        return createUser({ ...userProfile, uid });
      });
  };
}

// .catch(error => {
//   console.log('response failure', error);
//   return onError(error.message);
// });
//
// export function signInWithFacebook() {
//   const provider = new firebase.auth.FacebookAuthProvider();
//
//   // Redirect facebook login -> Preferred on mobile devices.
//
//   firebase.auth().signInWithRedirect(provider);
//
//   // Get the result of the redirect signin on facebook
//
//   firebase
//     .auth()
//     .getRedirectResult()
//     .then(result => {
//       const token = result.credential.accessToken;
//       const {user} = result;
//
//       console.log('FACEBOOKUSER: ', user);
//     });
// }
//

// TODO: Why do we need this!!!!!
export function removeUserFromEnv({
  uid,
  envId
}: {
  uid: string;
  envId: string;
}): ThunkActionType {
  return function(dispatch: Function, getState: Function): Promise<void> {
    return doRemoveEnvFromUser({ uid, envId }).then(() => {
      dispatch(deleteUserFromEnv({ uid, envId }));
      const { Session } = getState();

      const newEnvs = Session.authUser.userEnvs.filter(
        (e: UserEnv) => e.id !== envId && e
      );

      dispatch(setAuthUserInfo({ userEnvs: newEnvs }));
    });
  };
}

// export function selectUserEnv(env) {
//   return function(dispatch, getState) {
//     const {authUser} = getState().Session;
//     const {userEnvs, uid} = authUser;
//
//     // const db = DB(getSelectedUserEnv(env.id));
//
//     // const newUserEnvs = userEnvs.map(u => ({...u, selected: u.id === env.id}));
//
//     dispatch(setUserEnv(env));
//
//     // return db
//     //   .registerUserToEnv({uid, env})
//     //   .then(usrInfo => {
//     //     console.log('retrieve USR INFO', usrInfo);
//     //     dispatch(setAuthUserInfo({userEnvs: newUserEnvs}));
//     //   })
//     //   .catch(err => console.log('err', err));
//   };
// }
