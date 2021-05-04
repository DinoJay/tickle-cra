import uuidv1 from 'uuid/v1';
import { extractCardFields } from '~/constants/cardFields';
import { addToStorage, removeFromStorage } from './index';
import { firestore, Timestamp } from '../firebase';
// interface Comment {
//   username: string;
//   uid: string;
//   url: string | null;
//   text: string;
//   avatar?: string;
//   date: Date;
// }
/**
 * Comment DB functions
 */
const makeCommentFuncs = (TICKLE_ENV_REF) => {
    const getBasicUser = (uid) => firestore
        .collection('users')
        .doc(uid)
        .get()
        .then((doc) => doc.data());
    const readComments = (cardId) => TICKLE_ENV_REF.collection('cards')
        .doc(cardId)
        .collection('comments')
        .get()
        .then((querySnapshot) => {
        const commentPromises = [];
        querySnapshot.forEach((doc) => {
            const dd = doc.data();
            if (dd) {
                const { uid, username, avatar, text } = dd;
                commentPromises.push(getBasicUser(uid).then(({ img }) => ({
                    ...(img || {}),
                    uid,
                    id: uuidv1(),
                    // url: null,
                    avatar,
                    username,
                    text,
                    date: new Date()
                })));
            }
        });
        return Promise.all(commentPromises);
    });
    const addComment = ({ uid, cardId, text, avatar, username }) => TICKLE_ENV_REF.collection('cards')
        .doc(cardId)
        .collection('comments')
        .add({
        uid,
        text,
        username,
        avatar,
        timestamp: Timestamp.fromDate(new Date())
    });
    return { readComments, addComment };
};
/**
 * Card db functions
 * @param {string} environment id
 * @returns {object} to access cards in db
 */
const makeCardFuncs = (ENV_STR) => {
    const TICKLE_ENV_REF = firestore
        .collection('card-environments')
        .doc(ENV_STR);
    const commentFuncs = makeCommentFuncs(TICKLE_ENV_REF);
    const doDeleteCard = (cid) => TICKLE_ENV_REF.collection('cards')
        .doc(cid)
        .delete();
    const doUpdateCard = (rawCard) => {
        const card = extractCardFields(rawCard);
        return TICKLE_ENV_REF.collection('cards')
            .doc(card.id)
            .set(card);
    };
    const doUpdateCardTemplate = (rawCard) => {
        const card = extractCardFields(rawCard);
        return TICKLE_ENV_REF.collection('cardTemplates')
            .doc(card.id)
            .set(card);
    };
    const doReadTemplateCards = () => TICKLE_ENV_REF.collection('cardTemplates')
        .get()
        .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
    const doReadCreatedCards = (uid) => TICKLE_ENV_REF.collection('cards')
        .where('uid', '==', uid)
        .get()
        .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
    const doReadCards = () => TICKLE_ENV_REF.collection('cards')
        .get()
        .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
    const doReadSubmissions = (id) => TICKLE_ENV_REF.collection('cards')
        .doc(id)
        .collection('activitySubmissions')
        .get()
        .then((sn) => sn.docs.map((d) => ({
        ...d.data()
    })));
    const doReadCardsWithSubmission = (uid) => TICKLE_ENV_REF.collection('cards')
        .get()
        .then((snapshot) => Promise.all(snapshot.docs.map((d) => d.ref
        .collection('activitySubmissions')
        .doc(uid)
        .get()
        .then((sn) => ({
        ...d.data(),
        activitySubmission: sn.data() !== null
            ? { id: uuidv1(), ...sn.data(), uid }
            : null
    })))));
    const addFileToEnv = ({ file, path }) => addToStorage({ file, path: `${ENV_STR}/${path}` });
    const removeFileFromEnv = (path) => removeFromStorage(`${ENV_STR}/${path}`);
    return {
        doUpdateCard,
        doUpdateCardTemplate,
        doDeleteCard,
        addFileToEnv,
        removeFileFromEnv,
        doReadTemplateCards,
        doReadSubmissions,
        doReadCards,
        doReadCreatedCards,
        doReadCardsWithSubmission,
        ...commentFuncs
    };
};
export default makeCardFuncs;
