import UserEnv from '~/constants/userEnvType';
import {User} from '~/constants/userFields';
import {Card} from '~/constants/cardFields';

import Event from '~/constants/eventType';
import {
  RECEIVE_USERS,
  RECEIVE_ALL_ENVS,
  RECEIVE_ALL_EVENTS,
  ADD_ENV,
  INSERT_USER_INTO_ENV,
  DELETE_USER_FROM_ENV,
  UPDATE_ENV,
  RECEIVE_CARDS,
  SELECT_USERS_BY_ENV,
  USER_REGISTRATION_ERROR,
  ADD_USER,
  UPDATE_USER_INFO,
  REMOVE_USER,
  DELETE_ENV,
  AdminActionTypes,
  SELECT_USER, REMOVE_USER_SUCCESS
} from './types';

export function selectUser(options: string | null): AdminActionTypes {
  return {type: SELECT_USER, options};
}

// export function removeUserSuccess(options: string | null): AdminActionTypes {
//   return {type: SELECT_USER, options};
// }

export function receiveUsers(options: User[]): AdminActionTypes {
  return {type: RECEIVE_USERS, options};
}

export function addEnv(options: UserEnv): AdminActionTypes {
  return {type: ADD_ENV, options};
}

export function deleteEnv(options: string): AdminActionTypes {
  return {type: DELETE_ENV, options};
}

export function updateEnv(options: UserEnv): AdminActionTypes {
  return {type: UPDATE_ENV, options};
}

export function receiveAllEnvs(options: UserEnv[]): AdminActionTypes {
  return {type: RECEIVE_ALL_ENVS, options};
}

export function receiveAllEvents(options: Event[]): AdminActionTypes {
  return {type: RECEIVE_ALL_EVENTS, options};
}

// export function submitChallengeReview(options): AdminActionTypes {
//   return {type: SUBMIT_CHALLENGE_REVIEW, options};
// }

export function insertUserIntoEnv(options: {
  uid: string;
  envId: string;
}): AdminActionTypes {
  return {type: INSERT_USER_INTO_ENV, options};
}

export function deleteUserFromEnv(options: {
  uid: string;
  envId: string;
}): AdminActionTypes {
  return {type: DELETE_USER_FROM_ENV, options};
}

export function addUser(options: User): AdminActionTypes {
  return {type: ADD_USER, options};
}

export function updateUserInfo(options: User): AdminActionTypes {
  return {type: UPDATE_USER_INFO, options};
}

export function removeUserSuccess(): AdminActionTypes {
  return {type: REMOVE_USER_SUCCESS};
}
//
export function removeUser(options: string): AdminActionTypes {
  return {type: REMOVE_USER, options};
}

export function selectUsersByEnv(options: string[]): AdminActionTypes {
  return {type: SELECT_USERS_BY_ENV, options};
}

export function receiveCards(options: Card[]): AdminActionTypes {
  return {type: RECEIVE_CARDS, options};
}

export function userRegistrationError(
  options: object
): AdminActionTypes {
  return {type: USER_REGISTRATION_ERROR, options};
}
