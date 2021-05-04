import UserEnv from '~/constants/userEnvType';
import { User, ExtendedUser } from '~/constants/userFields';
export declare const readAllUsers: (envId?: string | undefined) => any;
export declare const readAllTmpUsers: () => any;
export declare const deleteUser: (uid: string) => any;
export declare const deleteTmpUser: (email: string) => any;
export declare const readTmpUser: (email: string) => any;
export declare const doCreateTmpUser: (user: User) => any;
export declare const getOneUserByEmail: (email: string, tmp?: boolean) => any;
export declare const doReadDetailUser: (uid: string) => Promise<ExtendedUser>;
export declare const doReadOneUser: (uid: string) => Promise<User>;
export declare const getThumbNailRef: (uid: string) => import("@firebase/storage-types").Reference;
export declare const getUserEnvs: (uid: string) => Promise<UserEnv>;
export declare const getDetailedUserInfo: ({ uid, userEnvId }: {
    uid: string;
    userEnvId: string;
}) => Promise<User>;
export declare const doCreateUser: (userProfile: User) => any;
export declare const doInviteUser: (userProfile: User) => any;
export declare const bookmarkCard: (uid: string, cardId: string) => void;
export declare const doRemoveEnvFromUser: ({ uid, envId }: {
    uid: string;
    envId: string;
}) => Promise<[any, any]>;
export declare const doAddEnvToUser: ({ uid, envId }: {
    uid: string;
    envId: string;
}) => Promise<[any, any]>;
