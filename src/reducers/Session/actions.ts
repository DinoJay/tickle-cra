import {User} from '~/constants/userFields';
// import AuthUser from '~/constants/authUserType';
import {
  // SET_USER_ENV,
  SET_AUTH_USER_INFO,
  SET_USERS,
  CLEAR_AUTH_USER,
  // RECEIVE_USER_INFO,
  SET_FIREBASE_MESSAGING_TOKEN,
  SET_XP,
  SessionActionTypes
} from './types';

export function setUsers(options: User[]): SessionActionTypes {
  return {type: SET_USERS, options};
}

export function clearAuthUser(): SessionActionTypes {
  return {type: CLEAR_AUTH_USER};
}
export function setAuthUserInfo(options: any): SessionActionTypes {
  return {type: SET_AUTH_USER_INFO, options};
}

// export function receiveUserInfo(options): SessionActionType {
//   return {type: RECEIVE_USER_INFO, options};
// }
//
export function setFirebaseMessagingToken(
  options: any
): SessionActionTypes {
  return {type: SET_FIREBASE_MESSAGING_TOKEN, options};
}

export function setXp(options: {xp: number}): SessionActionTypes {
  return {type: SET_XP, options};
}
