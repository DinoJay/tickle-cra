const delay = (t:number):Promise<void> =>
  new Promise(function(resolve) {
    setTimeout(() => resolve(), t);
  });

export default delay;
