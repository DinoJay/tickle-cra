import { User } from '~/constants/userFields';
import { SessionActionTypes } from './types';
export declare function setUsers(options: User[]): SessionActionTypes;
export declare function clearAuthUser(): SessionActionTypes;
export declare function setAuthUserInfo(options: any): SessionActionTypes;
export declare function setFirebaseMessagingToken(options: any): SessionActionTypes;
export declare function setXp(options: {
    xp: number;
}): SessionActionTypes;
