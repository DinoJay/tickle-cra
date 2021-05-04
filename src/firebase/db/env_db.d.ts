import { DocumentData } from '@firebase/firestore-types';
import UserEnv from '~/constants/userEnvType';
export declare const doReadPublicEnvs: () => Promise<UserEnv>[];
export declare const doReadEnvs: (uid: string) => any;
export declare const doReadMapFeats: (userEnvId: string) => any;
export declare const doReadAvailableEnvs: (uid: string) => Promise<DocumentData | UserEnv[]>;
export declare const doCreateMapFeat: (userEnvId: string, geoJson: {
    id: string;
}) => any;
export declare const doDeleteMapFeat: (userEnvId: string, id: string) => any;
export declare const doReadUserIdsFromEnv: (envId: string) => string[];
export declare const doReadAllEnvs: () => any;
export declare const doReadOneEnv: (id: string) => any;
export declare const doCreateEnv: ({ id, authorId, name, description, img, ...rest }: UserEnv) => Promise<void>;
export declare const doDeleteEnv: (id: string) => any;
export declare const doDeleteUserFromEnv: ({ uid, envId }: {
    uid: string;
    envId: string;
}) => any;
export declare const doAddUserToEnv: ({ uid, envId }: {
    uid: string;
    envId: string;
}) => any;
