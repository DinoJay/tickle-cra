const delay = (t) => new Promise(function (resolve) {
    setTimeout(() => resolve(), t);
});
export default delay;
