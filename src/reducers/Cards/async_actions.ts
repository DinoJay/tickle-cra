import uuidv1 from 'uuid/v1';
import {ThunkAction} from 'redux-thunk';

import {Action} from 'redux';
import CardDB from '~/firebase/db/card_db';
import helpRequestDB from '~/firebase/db/helpRequest_db';
import ActivityDB from '~/firebase/db/activity_db';

import {extractCardFields, Card} from '~/constants/cardFields';
import TopicDB from '~/firebase/db/topic_db';
import RewardDB from '~/firebase/db/reward_db';

import {firebase} from '~/firebase';
import AppStateType from '~/reducers/appStateType';
import ActivitySubmission from '~/constants/activitySubmissionType';
import Topic from '~/constants/topicType';
import Reward from '~/constants/rewardType';
import HelpRequest from '~/constants/HelpRequestType';

// import idGenerate from 'Src/idGenerator';
import {
  // receivePlaces,
  // receiveCollectibleCards,
  receiveRewards,
  putReward,
  deleteReward,
  setHelpRequests,
  // receiveCardTemplates,
  createCard,
  deleteCard,
  deleteCardSuccess,
  setCards,
  updateCard,
  updateCardTemplate,
  setCardTemplate,
  updateCardSuccess,
  submitActivity,
  submitActivitySuccess,
  receiveTopics,
  deleteTopic,
  putTopic,
  removeActivitySub
} from './actions';

import {setXp} from '../Session/actions';
import calcPoints from '../../components/utils/calcPoints';

// import {selectCard, extendSelectedCard} from '../DataView/actions';

type ThunkType = ThunkAction<void, AppStateType, null, Action<string>>;

const setXPoints = (dispatch: Function, getState: Function): void => {
  const {Cards: cardsState} = getState();
  const {cards, rewards} = cardsState;

  const points =
    calcPoints(
      cards.filter(
        (c: Card) =>
          c.activitySubmission && c.activitySubmission.succeeded
      ),
      rewards
    ) || 0;
  dispatch(setXp({xp: points}));
};

/**
 * fetches collectible cards for one user
 * @param {string} uid for user
 * @returns {string} user environment id
 */
export type FetchCollectibleCardsType = (a: {
  uid: string;
  userEnvId: string;
}) => any;
export function fetchCollectibleCards({
  uid,
  userEnvId
}: {
  uid: string;
  userEnvId: string;
}): ThunkType {
  return function(dispatch: Function, getState: Function): void {
    const db = CardDB(userEnvId);
    const {doReadOneActivitySub} = ActivityDB(userEnvId);
    const {doReadTopics} = TopicDB(userEnvId);
    doReadTopics().then((topics: Topic[]) => {
      dispatch(receiveTopics(topics));
    });
    // TODO: change later with obj params
    db.doReadCardsWithSubmission(uid)
      .then((data: Card[]) =>
        Promise.all(
          data.map(d =>
            doReadOneActivitySub({id: d.id, uid}).then(
              (activitySubmission: ActivitySubmission) => ({
                ...d,
                activitySubmission
              })
            )
          )
        )
      )
      .then((data: Card[]) => {
        dispatch(setCards(data.map(extractCardFields)));
        setXPoints(dispatch, getState);
      });
  };
}

export type FetchHelpRequests = (a: {
  uid: string;
  userEnvId: string;
}) => any;
export function fetchHelpRequests({
  uid,
  userEnvId
}: {
  uid: string;
  userEnvId: string;
}): ThunkType {
  return function(dispatch: Function, getState: Function): void {
    const db = helpRequestDB(userEnvId);
    console.log('fetchHelpRequests', db);
    db.doReadHelpRequests().then((data: HelpRequest[]) => {
      dispatch(setHelpRequests(data));
      // setXPoints(dispatch, getState);
    });
  };
}

export type AddHelpRequest = (a: {
  helpRequest: HelpRequest;
  userEnvId: string;
}) => any;

export function addHelpRequest({
  userEnvId,
  helpRequest
}: {
  helpRequest: HelpRequest;
  userEnvId: string;
}): ThunkType {
  return function(dispatch: Function, getState: Function): void {
    const db = helpRequestDB(userEnvId);
    const {
      Cards: {helpRequests}
    } = getState();
    console.log('db addhelpreq', helpRequests, helpRequest);

    db.doUpdateHelpRequest(helpRequest).then(() => {
      dispatch(setHelpRequests([...helpRequests, helpRequest]));
    });
    // db.doReadHelpRequests().then((data: HelpRequest[]) => {
    //   dispatch(setHelpRequests(data));
    //   // setXPoints(dispatch, getState);
    // });
  };
}

export type FetchCardTemplatesType = (a: {
  uid: string;
  userEnvId: string;
}) => any;
export function fetchCardTemplates(userEnvId: string): ThunkType {
  return function(dispatch: Function) {
    const db = CardDB(userEnvId);
    db.doReadTemplateCards().then((data: Card[]) => {
      console.log('readCards', data);
      dispatch(
        setCardTemplate(
          // TODO: fix
          // @ts-ignore
          extractCardFields(data && data[0] ? data[0] : {})
        )
      );
    });
  };
}

export type FetchAllCardWithSubmissionType = (userEnvId: string) => any;
export function fetchAllCardsWithSubmissions(
  userEnvId: string
): ThunkType {
  return function(
    dispatch: Function,
    getState: Function
  ): Promise<void> {
    const db = CardDB(userEnvId);

    // TODO: change to sth more consistent
    return db.doReadCards().then(
      (data: Card[]): Promise<Card[]> =>
        Promise.all(
          data.map(
            (d: Card): Promise<Card> =>
              db
                .doReadSubmissions(d.id)
                .then(
                  (allActivitySubs: ActivitySubmission[]) =>
                    ({...d, allActivitySubs} as Card)
                )
          )
        ).then((cards: any[]): any => {
          dispatch(setCards(cards));
          setXPoints(dispatch, getState);
        })
    );
  };
}

export type FetchAllCardsType = (userEnvId: string) => any;
export function fetchAllCards(userEnvId: string): ThunkType {
  return function(dispatch: Function): Promise<void> {
    const db = CardDB(userEnvId);
    return db.doReadCards().then((data: Card[]) => {
      dispatch(setCards(data.map(extractCardFields)));
    });
  };
}

// export function fetchCreatedCards({
//   userEnvId,
//   uid
// }: {
//   userEnvId: string;
//   uid: string;
// }): ThunkType {
//   return function(dispatch): void {
//     return db.doReadCreatedCards(uid).then(
//       data => {
//         dispatch(setCards(data.map(extractCardFields)));
//       },
//       err => console.log('fetch createdCards', err)
//
//     );
//   };
// }

export type AsyncCreateCardType = (a: {
  cardData: Card;
  userEnvId: string;
}) => any;

export const asyncCreateCard = ({
  cardData,
  userEnvId
}: {
  cardData: Card;
  userEnvId: string;
}) =>
  function(dispatch: Function): Promise<void> {
    const db = CardDB(userEnvId);

    const newCard = extractCardFields({
      ...cardData,
      id: uuidv1()
      // date: new Date()
    });
    dispatch(createCard(newCard));
    // dispatch(extendSelectedCard(null));
    // dispatch(selectCard(newCard.id));

    return db.doUpdateCard(newCard);
  };
//
export type AsyncRemoveCardType = (a: {
  cardId: string;
  userEnvId: string;
}) => any;

export const asyncRemoveCard: AsyncRemoveCardType = ({
  cardId,
  userEnvId
}: {
  cardId: string;
  userEnvId: string;
}) =>
  function(dispatch: Function): void {
    const db = CardDB(userEnvId); // createDbEnv(getState());
    dispatch(deleteCard(cardId));
    // dispatch(selectCard(null));
    db.doDeleteCard(cardId).then(() => {
      dispatch(deleteCardSuccess());
    });
  };

export type AsyncUpdateCardType = (arg: {
  cardData: Card;
  userEnvId: string;
}) => any;

export const asyncUpdateCard: AsyncUpdateCardType = ({
  cardData,
  userEnvId
}: {
  cardData: Card;
  userEnvId: string;
}) => (dispatch: Function): Promise<void> => {
  dispatch(updateCard(cardData));
  const db = CardDB(userEnvId);
  return db
    .doUpdateCard(cardData)
    .then(() => dispatch(updateCardSuccess()));
};

export const asyncRemoveActivitySub: any = ({
  id,
  uid,
  userEnvId
}: {
  id: string;
  uid: string;
  userEnvId: string;
}) => (dispatch: Function): Promise<void> => {
  const {doRemoveActivitySub} = ActivityDB(userEnvId);
  dispatch(removeActivitySub({id, uid}));
  return doRemoveActivitySub({id, uid});
};

export const asyncUpdateCardTemplate: AsyncUpdateCardType = ({
  cardData,
  userEnvId
}: {
  cardData: Card;
  userEnvId: string;
}) => (dispatch: Function): Promise<void> => {
  dispatch(updateCardTemplate(extractCardFields(cardData)));
  const db = CardDB(userEnvId);
  return db.doUpdateCardTemplate(extractCardFields(cardData));
  // .then(() => dispatch(updateCardSuccess()));
};

export type AddActivitySubmissionType = (
  activitySubmission: ActivitySubmission,
  userEnvId: string
) => any;

export const addActivitySubmission: AddActivitySubmissionType = (
  activitySubmission: ActivitySubmission,
  userEnvId: string
) =>
  function(dispatch: Function, getState: Function): Promise<void> {
    const {
      Session: {authUser}
    } = getState();

    const {username, uid} = authUser;

    const db = ActivityDB(userEnvId);

    dispatch(submitActivity(activitySubmission));

    return db
      .doAddActivitySub({
        date: firebase.Timestamp.now(),
        // TODO reordered, when not breaks when submitting feedback
        uid,
        username,
        ...activitySubmission
      })
      .then(() => {
        dispatch(submitActivitySuccess());
        setXPoints(dispatch, getState);
      });
  };

export type UpdateTopicType = (topic: Topic, userEnv: string) => any;
export const updateTopic = (topic: Topic, userEnv: string) =>
  function(dispatch: Function): Promise<void> {
    const {doCreateTopic} = TopicDB(userEnv);

    return doCreateTopic(topic).then(() => {
      dispatch(putTopic(topic));
    });
  };

export type RemoveTopicType = (topicId: string, userEnv: string) => any;
export const removeTopic: RemoveTopicType = (
  topicId: string,
  userEnv: string
) =>
  function(dispatch: Function): Promise<void> {
    const {doDeleteTopic} = TopicDB(userEnv);

    return doDeleteTopic(topicId).then(() => {
      dispatch(deleteTopic(topicId));
    });
  };

export type FetchTopicsType = (userEnv: string) => any;
export const fetchTopics: FetchTopicsType = (userEnv: string) =>
  function(dispatch: Function): Promise<void> {
    const {doReadTopics} = TopicDB(userEnv);
    return doReadTopics().then((topics: Topic[]) => {
      dispatch(receiveTopics(topics));
    });
  };

export type FetchRewardsType = (userEnv: string) => any;
export const fetchRewards: FetchRewardsType = (userEnv: string) =>
  function(dispatch: Function): Promise<void> {
    const {doReadRewards} = RewardDB(userEnv);

    return doReadRewards().then((rewards: Reward[]) => {
      dispatch(receiveRewards(rewards));
    });
  };

export type UpdateRewardType = (reward: Reward, userEnv: string) => any;

export function updateReward(
  reward: Reward,
  userEnv: string
): ThunkType {
  return function(dispatch: Function): Promise<void> {
    const {doCreateReward} = RewardDB(userEnv);

    return doCreateReward(reward).then(() => {
      dispatch(putReward(reward));
    });
  };
}

export type RemoveRewardType = (
  rewardId: string,
  userEnv: string
) => any;

export const removeReward: RemoveRewardType = (
  rewardId: string,
  userEnv: string
): ThunkType =>
  function(dispatch: Function): Promise<void> {
    const {doDeleteReward} = RewardDB(userEnv);

    return doDeleteReward(rewardId).then(() => {
      dispatch(deleteReward(rewardId));
    });
  };
