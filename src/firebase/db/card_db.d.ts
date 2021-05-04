/**
 * Card db functions
 * @param {string} environment id
 * @returns {object} to access cards in db
 */
declare const makeCardFuncs: (ENV_STR: string) => {
    doUpdateCard: Function;
    doUpdateCardTemplate: Function;
    doDeleteCard: Function;
    addFileToEnv: Function;
    removeFileFromEnv: Function;
    doReadSubmissions: Function;
    doReadCards: Function;
    doReadCreatedCards: Function;
    doReadTemplateCards: Function;
    doReadCardsWithSubmission: Function;
    readComments: Function;
    addComment: Function;
};
export default makeCardFuncs;
