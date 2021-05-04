import {User} from '~/constants/userFields';

import UserEnv from '~/constants/userEnvType';
import Event from '~/constants/eventType';
import {
  RECEIVE_USERS,
  RECEIVE_ALL_ENVS,
  RECEIVE_ALL_EVENTS,
  // GET_CARDS,
  SELECT_USER,
  INSERT_USER_INTO_ENV,
  DELETE_USER_FROM_ENV,
  ADD_ENV,
  UPDATE_ENV,
  // SUBMIT_CHALLENGE_REVIEW,
  SELECT_USERS_BY_ENV,
  USER_REGISTRATION_ERROR,
  ADD_USER,
  UPDATE_USER_INFO,
  REMOVE_USER,
  DELETE_ENV,
  // REMOVE_USER_SUCCESS
  AdminActionTypes
} from './types';

const INITIAL_STATE = {
  users: [],
  selectedUserId: null,
  envs: [],
  envUserIds: [],
  userRegErr: null,
  events: []
};

export interface AdminStateType {
  users: User[];
  selectedUserId: string | null;
  envs: UserEnv[];
  envUserIds: string[];
  userRegErr: object | null;
  events: Event[];
}

export default function reducer(
  state: AdminStateType = INITIAL_STATE,
  action: AdminActionTypes
): AdminStateType {
  switch (action.type) {
    case RECEIVE_ALL_ENVS: {
      const envs = action.options;
      return {...state, envs};
    }
    case SELECT_USERS_BY_ENV: {
      // TODO: what is happening here?
      const envUserIds = action.options;
      return {...state, envUserIds};
    }
    case SELECT_USER: {
      const selectedUserId = action.options;
      return {...state, selectedUserId};
    }
    case REMOVE_USER: {
      const {users} = state;
      const uid = action.options;
      const newUsers = users.filter(u => u.uid !== uid);

      return {
        ...state,
        users: newUsers,
        selectedUserId: null
      };
    }
    case UPDATE_USER_INFO: {
      const {users} = state;
      const usrInfo = action.options;
      const {uid} = usrInfo;
      return {
        ...state,
        users: users.map(d => (d.uid === uid ? usrInfo : d))
      };
    }

    case RECEIVE_USERS: {
      const users = action.options;
      return {...state, users};
    }

    case ADD_USER: {
      const {users, envUserIds} = state;
      const usr = action.options;
      const {uid} = usr;
      const newEnvUserIds = [...envUserIds, uid];
      return {
        ...state,
        users: [...users, usr],
        envUserIds: newEnvUserIds,
        userRegErr: null
      };
    }

    case ADD_ENV: {
      const env = action.options;
      const envIds = state.envs.map(d => d.id);

      if (envIds.includes(env.id)) {
        const changedEnvs = state.envs.map(e =>
          e.id === env.id ? {...e, ...env} : e
        );
        return {...state, envs: changedEnvs};
      }
      return {...state, envs: [...state.envs, env]};
    }

    case UPDATE_ENV: {
      const env = action.options;
      const envs = state.envs.map(e => (e.id === env.id ? env : e));
      return {...state, envs};
    }

    case DELETE_ENV: {
      const {envs} = state;
      const id = action.options;
      return {
        ...state,
        envs: envs.filter(u => u.id !== id),
        selectedUserId: null
      };
    }

    case INSERT_USER_INTO_ENV: {
      const {envs} = state;
      const {uid, envId} = action.options;

      const newEnvs = envs.map(e => {
        if (e.id === envId) {
          e.uids.push(uid);
          return e;
        }
        return e;
      });

      return {...state, envs: newEnvs};
    }

    case DELETE_USER_FROM_ENV: {
      const {envs} = state;
      const {uid, envId} = action.options;

      const newEnvs: UserEnv[] = envs.map(e => {
        if (e.id === envId) {
          e.uids = e.uids.filter(u => u !== uid);
          return e;
        }
        return e;
      });

      return {...state, envs: newEnvs};
    }

    case USER_REGISTRATION_ERROR: {
      const userRegErr = action.options;
      return {...state, userRegErr};
    }

    case RECEIVE_ALL_EVENTS: {
      const events: Event[] = action.options;
      return {...state, events};
    }

    default:
      return state;
  }
}
