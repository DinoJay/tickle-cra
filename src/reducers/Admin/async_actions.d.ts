import UserEnv from '~/constants/userEnvType';
import { User } from '~/constants/userFields';
export declare function fetchAllEnvs(): (dispatch: Function) => any;
export declare function createEnv(env: UserEnv): (dispatch: Function, getState: Function) => Promise<void>;
export declare function removeEnv(envId: string): (dispatch: Function) => any;
export declare function updateEnv(env: UserEnv): (dispatch: Function) => Promise<void>;
export declare function removeUserAccount(uid: string): (dispatch: Function) => void;
export declare function fetchUsers(): (dispatch: Function) => void;
export declare function inviteUser(usrInfo: User): (dispatch: Function) => any;
export declare function updateUser(usrInfo: User): (dispatch: Function) => void;
export declare function addUserToEnv({ envId, usrInfo }: {
    envId: string;
    usrInfo: User;
}): (dispatch: Function) => void;
export declare function excludeUserFromEnv({ envId, usrInfo }: {
    envId: string;
    usrInfo: User;
}): (dispatch: Function) => void;
export declare function fetchAllUserEvents(email: string): (dispatch: Function) => void;
export declare function fetchAllEvents(): (dispatch: Function) => void;
