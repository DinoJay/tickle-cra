import UserEnv from '~/constants/userEnvType';
import { User } from '~/constants/userFields';
import { Card } from '~/constants/cardFields';
import Event from '~/constants/eventType';
import { AdminActionTypes } from './types';
export declare function selectUser(options: string | null): AdminActionTypes;
export declare function receiveUsers(options: User[]): AdminActionTypes;
export declare function addEnv(options: UserEnv): AdminActionTypes;
export declare function deleteEnv(options: string): AdminActionTypes;
export declare function updateEnv(options: UserEnv): AdminActionTypes;
export declare function receiveAllEnvs(options: UserEnv[]): AdminActionTypes;
export declare function receiveAllEvents(options: Event[]): AdminActionTypes;
export declare function insertUserIntoEnv(options: {
    uid: string;
    envId: string;
}): AdminActionTypes;
export declare function deleteUserFromEnv(options: {
    uid: string;
    envId: string;
}): AdminActionTypes;
export declare function addUser(options: User): AdminActionTypes;
export declare function updateUserInfo(options: User): AdminActionTypes;
export declare function removeUserSuccess(): AdminActionTypes;
export declare function removeUser(options: string): AdminActionTypes;
export declare function selectUsersByEnv(options: string[]): AdminActionTypes;
export declare function receiveCards(options: Card[]): AdminActionTypes;
export declare function userRegistrationError(options: object): AdminActionTypes;
