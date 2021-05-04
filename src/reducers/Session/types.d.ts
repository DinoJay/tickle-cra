import { User } from '~/constants/userFields';
import AuthUser from '~/constants/authUserType';
export declare const SET_USERS = "SET_USERS";
export interface SetUsers {
    type: typeof SET_USERS;
    options: User[];
}
export declare const CLEAR_AUTH_USER = "CLEAR_AUTH_USER";
export interface ClearAuthUser {
    type: typeof CLEAR_AUTH_USER;
}
export declare const SET_AUTH_USER_INFO = "SET_AUTH_USER_INFO";
export interface SetAuthUserInfo {
    type: typeof SET_AUTH_USER_INFO;
    options: AuthUser;
}
export declare const RECEIVE_USER_INFO = "RECEIVE_USER_INFO";
export interface ReceiveUserInfo {
    type: typeof RECEIVE_USER_INFO;
    options: User;
}
export declare const SET_FIREBASE_MESSAGING_TOKEN = "SET_FIREBASE_MESSAGING_TOKEN";
export interface SetFirebaseMessagingToken {
    type: typeof SET_FIREBASE_MESSAGING_TOKEN;
    options: any;
}
export declare const SET_XP = "SET_XP";
export interface SetXp {
    type: typeof SET_XP;
    options: {
        xp: number;
    };
}
export declare type SessionActionTypes = SetUsers | ClearAuthUser | SetAuthUserInfo | ReceiveUserInfo | SetFirebaseMessagingToken | SetXp;
