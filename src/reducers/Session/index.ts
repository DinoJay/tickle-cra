import {
  SET_AUTH_USER_INFO,
  CLEAR_AUTH_USER,
  // RECEIVE_USER_INFO,
  SET_USERS,
  // SET_USER_ENV,
  SET_FIREBASE_MESSAGING_TOKEN,
  SET_XP,
  SessionActionTypes
  // SET_DEVICE
} from './types';

import AuthUser from '~/constants/authUserType';
import {User} from '~/constants/userFields';

const INITIAL_STATE = {
  authUser: null,
  device: {smallScreen: false, iOs: false},
  users: [],
  userEnvId: 'default',
  xp: 0
};

export interface SessionStateType {
  authUser: null | AuthUser;
  device: {smallScreen: boolean; iOs: boolean};
  users: User[];
  userEnvId: string;
  xp: number;
}

const defaultAuthUser = {userEnvs: []};

function sessionReducer(
  state: SessionStateType = INITIAL_STATE,
  action: SessionActionTypes
): SessionStateType {
  switch (action.type) {
    // case READ_ENVS: {
    //   const userEnvs = action.options;
    //   return {...state, userEnvs};
    // }
    // case RECEIVE_USER_INFO: {
    //   const userInfo = action.options;
    //   return {...state, ...userInfo};
    // }
    case SET_USERS: {
      const {options: users} = action;
      return {...state, users};
    }
    case CLEAR_AUTH_USER: {
      return {...state, authUser: null};
    }
    case SET_AUTH_USER_INFO: {
      const {options} = action;
      const authUser: AuthUser = {
        ...defaultAuthUser,
        ...state.authUser,
        ...options
      };
      return {
        ...state,
        authUser
      };
    }
    // case ERROR_SUBMIT_USER: {
    //   const {options} = action;
    //   return {...state, errorUpdateUserMsg: options};
    // }
    // case SET_USER_ENV: {
    //   const {options: envId} = action;
    //
    //   return {...state, userEnvId: envId};
    // }
    // case SUBMIT_USER_INFO_TO_DB_SUCCESS: {
    //   // const { options } = action;
    //   return {
    //     ...state,
    //   };
    // }
    case SET_FIREBASE_MESSAGING_TOKEN: {
      const {options} = action;
      return {
        ...state,
        ...options
      };
    }
    case SET_XP: {
      const {options} = action;
      return {
        ...state,
        ...options
      };
    }
    default:
      return state;
  }
}

export default sessionReducer;
