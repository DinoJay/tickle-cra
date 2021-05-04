declare const makeActivityFuncs: (ENV_STR: string) => {
    doReadOneActivitySub: Function;
    getAllActivitySubsOfUser: Function;
    doAddActivitySub: Function;
    doRemoveActivitySub: Function;
    removeChallengeSubmission: Function;
};
export default makeActivityFuncs;
