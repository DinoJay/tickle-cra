export declare const doCreateUserWithEmailAndPassword: (email: string, password: string) => Promise<unknown>;
export declare const doSignInWithEmailAndPassword: (email: string, password: string) => Promise<unknown>;
export declare const doSignOut: () => void;
export declare const doPasswordReset: (email: string) => Promise<void>;
export declare const doPasswordUpdate: (password: string) => Promise<void> | null;
export declare const doEmailUpdate: (email: string) => Promise<void> | null;
export declare const getEmail: () => string | null;
export declare const getUserInfo: () => unknown;
