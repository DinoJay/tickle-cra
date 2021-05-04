declare const makeCancelable: Function;
export declare type PromiseType = {
    promise: Promise<unknown>;
    cancel: Function;
};
export default makeCancelable;
