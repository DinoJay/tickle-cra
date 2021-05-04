const makeCancelable: Function = (promise: Promise<unknown>) => {
  let hasCanceled_ = false;

  const wrappedPromise: Promise<unknown> = new Promise(
    (resolve, reject): Promise<unknown> =>
      promise
        .then(
          (val: unknown) =>
            hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
          (error: unknown) =>
            hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        )
        .catch(() => {
          reject({isCanceled: true});
        })
  );

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
};
export type PromiseType = {promise: Promise<unknown>; cancel: Function};


export default makeCancelable;
