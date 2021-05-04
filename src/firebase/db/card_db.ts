import uuidv1 from 'uuid/v1';
import {
  QuerySnapshot,
  DocumentSnapshot,
  // DocumentData,
  DocumentReference
} from '@firebase/firestore-types';

import {Card, extractCardFields} from '~/constants/cardFields';
import ActivitySubmission from '~/constants/activitySubmissionType';

import {addToStorage, removeFromStorage} from './index';

import {User} from '~/constants/userFields';

import {firestore, Timestamp} from '../firebase';
import Comment from '~/constants/commentType';

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
const makeCommentFuncs = (
  TICKLE_ENV_REF: DocumentReference
): {readComments: Function; addComment: Function} => {
  const getBasicUser = (uid: string): Promise<User> =>
    firestore
      .collection('users')
      .doc(uid)
      .get()
      .then((doc: DocumentSnapshot) => doc.data());

  const readComments = (cardId: string): Promise<Comment[]> =>
    TICKLE_ENV_REF.collection('cards')
      .doc(cardId)
      .collection('comments')
      .get()
      .then((querySnapshot: QuerySnapshot) => {
        const commentPromises: Promise<Comment>[] = [];
        querySnapshot.forEach((doc: DocumentSnapshot) => {
          const dd = doc.data();
          if (dd) {
            const {uid, username, avatar, text} = dd as Comment;
            commentPromises.push(
              getBasicUser(uid).then(({img}: User) => ({
                ...(img || {}),
                uid,
                id: uuidv1(),
                // url: null,
                avatar,
                username,
                text,
                date: new Date()
              }))
            );
          }
        });
        return Promise.all(commentPromises);
      });

  const addComment = ({
    uid,
    cardId,
    text,
    avatar,
    username
  }: {
    uid: string;
    cardId: string;
    text: string;
    avatar: string;
    username: string;
  }): Promise<DocumentReference> =>
    TICKLE_ENV_REF.collection('cards')
      .doc(cardId)
      .collection('comments')
      .add({
        uid,
        text,
        username,
        avatar,
        timestamp: Timestamp.fromDate(new Date())
      });

  return {readComments, addComment};
};

/**
 * Card db functions
 * @param {string} environment id
 * @returns {object} to access cards in db
 */
const makeCardFuncs = (
  ENV_STR: string
): {
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
} => {
  const TICKLE_ENV_REF = firestore
    .collection('card-environments')
    .doc(ENV_STR);

  const commentFuncs = makeCommentFuncs(TICKLE_ENV_REF);

  const doDeleteCard = (cid: string): Promise<void> =>
    TICKLE_ENV_REF.collection('cards')
      .doc(cid)
      .delete();

  const doUpdateCard = (rawCard: Card): Promise<void> => {
    const card = extractCardFields(rawCard);

    return TICKLE_ENV_REF.collection('cards')
      .doc(card.id)
      .set(card);
  };

  const doUpdateCardTemplate = (rawCard: Card): Promise<void> => {
    const card = extractCardFields(rawCard);

    return TICKLE_ENV_REF.collection('cardTemplates')
      .doc(card.id)
      .set(card);
  };

  const doReadTemplateCards = (): Promise<Card[]> =>
    TICKLE_ENV_REF.collection('cardTemplates')
      .get()
      .then((querySnapshot: QuerySnapshot) =>
        querySnapshot.docs.map(
          (doc: DocumentSnapshot) => doc.data() as Card
        )
      );
  const doReadCreatedCards = (uid: string): Promise<Card[]> =>
    TICKLE_ENV_REF.collection('cards')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot: QuerySnapshot) =>
        querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data())
      );

  const doReadCards = (): Promise<Card[]> =>
    TICKLE_ENV_REF.collection('cards')
      .get()
      .then((querySnapshot: QuerySnapshot) =>
        querySnapshot.docs.map(
          (doc: DocumentSnapshot) => doc.data() as Card
        )
      );

  const doReadSubmissions = (
    id: string
  ): Promise<ActivitySubmission[]> =>
    TICKLE_ENV_REF.collection('cards')
      .doc(id)
      .collection('activitySubmissions')
      .get()
      .then((sn: QuerySnapshot) =>
        sn.docs.map((d: DocumentSnapshot) => ({
          ...d.data()
        }))
      );

  const doReadCardsWithSubmission = (uid: string): Promise<Card[]> =>
    TICKLE_ENV_REF.collection('cards')
      .get()
      .then((snapshot: QuerySnapshot) =>
        Promise.all(
          snapshot.docs.map((d: DocumentSnapshot) =>
            d.ref
              .collection('activitySubmissions')
              .doc(uid)
              .get()
              .then((sn: DocumentSnapshot) => ({
                ...d.data(),
                activitySubmission:
                  sn.data() !== null
                    ? {id: uuidv1(), ...sn.data(), uid}
                    : null
              }))
          )
        )
      );

  const addFileToEnv = ({
    file,
    path
  }: {
    file: unknown;
    path: string;
  }): Promise<void> => addToStorage({file, path: `${ENV_STR}/${path}`});

  const removeFileFromEnv = (path: string): Promise<void> =>
    removeFromStorage(`${ENV_STR}/${path}`);

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
