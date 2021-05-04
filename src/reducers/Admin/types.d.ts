import { User } from '~/constants/userFields';
import UserEnv from '~/constants/userEnvType';
import { Card } from '~/constants/cardFields';
import Event from '~/constants/eventType';
export declare const RECEIVE_USERS = "RECEIVE_USERS";
export interface ReceiveUsers {
    type: typeof RECEIVE_USERS;
    options: User[];
}
export declare const ADD_ENV = "ADD_ENV";
export interface AddEnv {
    type: typeof ADD_ENV;
    options: UserEnv;
}
export declare const DELETE_ENV = "DELETE_ENV";
export interface DeleteEnv {
    type: typeof DELETE_ENV;
    options: string;
}
export declare const UPDATE_ENV = "UPDATE_ENV";
export interface UpdateEnv {
    type: typeof UPDATE_ENV;
    options: UserEnv;
}
export declare const SELECT_USER = "SELECT_USER";
export interface SelectUser {
    type: typeof SELECT_USER;
    options: string | null;
}
export declare const RECEIVE_ALL_ENVS = "RECEIVE_ALL_ENVS";
export interface ReceiveAllEnvs {
    type: typeof RECEIVE_ALL_ENVS;
    options: UserEnv[];
}
export declare const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export interface ReceiveAllEvents {
    type: typeof RECEIVE_ALL_EVENTS;
    options: Event[];
}
export declare const INSERT_USER_INTO_ENV = "INSERT_USER_INTO_ENV";
export interface InsertUserIntoEnv {
    type: typeof INSERT_USER_INTO_ENV;
    options: {
        uid: string;
        envId: string;
    };
}
export declare const DELETE_USER_FROM_ENV = "REMOVE_USER_FROM_ENV";
export interface DeleteUserFromEnv {
    type: typeof DELETE_USER_FROM_ENV;
    options: {
        uid: string;
        envId: string;
    };
}
export declare const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";
export interface RemoveUserSuccess {
    type: typeof REMOVE_USER_SUCCESS;
}
export declare const ADD_USER = "ADD_USER";
export interface AddUser {
    type: typeof ADD_USER;
    options: User;
}
export declare const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export interface UpdateUserInfo {
    type: typeof UPDATE_USER_INFO;
    options: User;
}
export declare const REMOVE_USER = "REMOVE_USER";
export interface RemoveUser {
    type: typeof REMOVE_USER;
    options: string;
}
export declare const SELECT_USERS_BY_ENV = "SELECT_USERS_BY_ENV";
export interface SelectUsersByEnv {
    type: typeof SELECT_USERS_BY_ENV;
    options: string[];
}
export declare const RECEIVE_CARDS = "RECEIVE_CARDS";
export interface ReceiveCards {
    type: typeof RECEIVE_CARDS;
    options: Card[];
}
export declare const USER_REGISTRATION_ERROR = "USER_REGISTRATION_ERROR";
export interface UserRegistrationError {
    type: typeof USER_REGISTRATION_ERROR;
    options: null | object;
}
export declare type AdminActionTypes = UserRegistrationError | ReceiveCards | SelectUsersByEnv | RemoveUser | UpdateUserInfo | AddUser | DeleteEnv | UserRegistrationError | UpdateEnv | AddEnv | DeleteUserFromEnv | InsertUserIntoEnv | SelectUser | ReceiveAllEnvs | ReceiveAllEvents | ReceiveUsers | RemoveUserSuccess;
