import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import AppStateType from "~/reducers/appStateType";
import { User } from "~/constants/userFields";
declare type ThunkActionType = ThunkAction<void, AppStateType, null, Action<string>>;
export declare const fetchUser: (uid: string) => ThunkAction<void, AppStateType, null, Action<string>>;
export declare const signIn: ({ email, password }: {
    email: string;
    password: string;
}) => () => Promise<unknown>;
export declare const fetchUsers: (userEnvId: string) => ThunkAction<void, AppStateType, null, Action<string>>;
export declare function updateAuthUser(usr: object): ThunkAction<void, AppStateType, null, Action<string>>;
export declare function updateFirebaseMessagingToken(token: any): ThunkAction<void, AppStateType, null, Action<string>>;
export declare function registerUserToEnv({ uid, envId }: {
    uid: string;
    envId: string;
}): ThunkActionType;
export declare function signUp({ user, password }: {
    user: User & {
        passwordOne: string;
        passwordTwo: string;
    };
    password: string;
}): () => Promise<void>;
export declare function removeUserFromEnv({ uid, envId }: {
    uid: string;
    envId: string;
}): ThunkActionType;
export {};
