import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/messaging';
declare const firestore: any;
declare const Timestamp: typeof import("@firebase/firestore-types").Timestamp;
export declare const DocumentSnapshotType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export declare const QuerySnapshotType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
declare const auth: import("@firebase/auth-types").FirebaseAuth;
declare const storageRef: import("@firebase/storage-types").Reference;
declare let messaging: null | {
    getToken: Function;
    requestPermission: Function;
};
export { firestore, Timestamp, auth, storageRef, messaging };
