declare const makeHelpRequestFns: (ENV_STR: string) => {
    doUpdateHelpRequest: Function;
    doDeleteHelpRequest: Function;
    addFileToEnv: Function;
    removeFileFromEnv: Function;
    doReadHelpRequests: Function;
};
export default makeHelpRequestFns;
