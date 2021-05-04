import uuidv1 from 'uuid/v1';
import CardDB from '~/firebase/db/card_db';
import helpRequestDB from '~/firebase/db/helpRequest_db';
import ActivityDB from '~/firebase/db/activity_db';
import { extractCardFields } from '~/constants/cardFields';
import TopicDB from '~/firebase/db/topic_db';
import RewardDB from '~/firebase/db/reward_db';
import { firebase } from '~/firebase';
// import idGenerate from 'Src/idGenerator';
import { 
// receivePlaces,
// receiveCollectibleCards,
receiveRewards, putReward, deleteReward, setHelpRequests, 
// receiveCardTemplates,
createCard, deleteCard, deleteCardSuccess, setCards, updateCard, updateCardTemplate, setCardTemplate, updateCardSuccess, submitActivity, submitActivitySuccess, receiveTopics, deleteTopic, putTopic, removeActivitySub } from './actions';
import { setXp } from '../Session/actions';
import calcPoints from '../../components/utils/calcPoints';
const setXPoints = (dispatch, getState) => {
    const { Cards: cardsState } = getState();
    const { cards, rewards } = cardsState;
    const points = calcPoints(cards.filter((c) => c.activitySubmission && c.activitySubmission.succeeded), rewards) || 0;
    dispatch(setXp({ xp: points }));
};
export function fetchCollectibleCards({ uid, userEnvId }) {
    return function (dispatch, getState) {
        const db = CardDB(userEnvId);
        const { doReadOneActivitySub } = ActivityDB(userEnvId);
        const { doReadTopics } = TopicDB(userEnvId);
        doReadTopics().then((topics) => {
            dispatch(receiveTopics(topics));
        });
        // TODO: change later with obj params
        db.doReadCardsWithSubmission(uid)
            .then((data) => Promise.all(data.map(d => doReadOneActivitySub({ id: d.id, uid }).then((activitySubmission) => ({
            ...d,
            activitySubmission
        })))))
            .then((data) => {
            dispatch(setCards(data.map(extractCardFields)));
            setXPoints(dispatch, getState);
        });
    };
}
export function fetchHelpRequests({ uid, userEnvId }) {
    return function (dispatch, getState) {
        const db = helpRequestDB(userEnvId);
        console.log('fetchHelpRequests', db);
        db.doReadHelpRequests().then((data) => {
            dispatch(setHelpRequests(data));
            // setXPoints(dispatch, getState);
        });
    };
}
export function addHelpRequest({ userEnvId, helpRequest }) {
    return function (dispatch, getState) {
        const db = helpRequestDB(userEnvId);
        const { Cards: { helpRequests } } = getState();
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
export function fetchCardTemplates(userEnvId) {
    return function (dispatch) {
        const db = CardDB(userEnvId);
        db.doReadTemplateCards().then((data) => {
            console.log('readCards', data);
            dispatch(setCardTemplate(
            // TODO: fix
            // @ts-ignore
            extractCardFields(data && data[0] ? data[0] : {})));
        });
    };
}
export function fetchAllCardsWithSubmissions(userEnvId) {
    return function (dispatch, getState) {
        const db = CardDB(userEnvId);
        // TODO: change to sth more consistent
        return db.doReadCards().then((data) => Promise.all(data.map((d) => db
            .doReadSubmissions(d.id)
            .then((allActivitySubs) => ({ ...d, allActivitySubs })))).then((cards) => {
            dispatch(setCards(cards));
            setXPoints(dispatch, getState);
        }));
    };
}
export function fetchAllCards(userEnvId) {
    return function (dispatch) {
        const db = CardDB(userEnvId);
        return db.doReadCards().then((data) => {
            dispatch(setCards(data.map(extractCardFields)));
        });
    };
}
export const asyncCreateCard = ({ cardData, userEnvId }) => function (dispatch) {
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
export const asyncRemoveCard = ({ cardId, userEnvId }) => function (dispatch) {
    const db = CardDB(userEnvId); // createDbEnv(getState());
    dispatch(deleteCard(cardId));
    // dispatch(selectCard(null));
    db.doDeleteCard(cardId).then(() => {
        dispatch(deleteCardSuccess());
    });
};
export const asyncUpdateCard = ({ cardData, userEnvId }) => (dispatch) => {
    dispatch(updateCard(cardData));
    const db = CardDB(userEnvId);
    return db
        .doUpdateCard(cardData)
        .then(() => dispatch(updateCardSuccess()));
};
export const asyncRemoveActivitySub = ({ id, uid, userEnvId }) => (dispatch) => {
    const { doRemoveActivitySub } = ActivityDB(userEnvId);
    dispatch(removeActivitySub({ id, uid }));
    return doRemoveActivitySub({ id, uid });
};
export const asyncUpdateCardTemplate = ({ cardData, userEnvId }) => (dispatch) => {
    dispatch(updateCardTemplate(extractCardFields(cardData)));
    const db = CardDB(userEnvId);
    return db.doUpdateCardTemplate(extractCardFields(cardData));
    // .then(() => dispatch(updateCardSuccess()));
};
export const addActivitySubmission = (activitySubmission, userEnvId) => function (dispatch, getState) {
    const { Session: { authUser } } = getState();
    const { username, uid } = authUser;
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
export const updateTopic = (topic, userEnv) => function (dispatch) {
    const { doCreateTopic } = TopicDB(userEnv);
    return doCreateTopic(topic).then(() => {
        dispatch(putTopic(topic));
    });
};
export const removeTopic = (topicId, userEnv) => function (dispatch) {
    const { doDeleteTopic } = TopicDB(userEnv);
    return doDeleteTopic(topicId).then(() => {
        dispatch(deleteTopic(topicId));
    });
};
export const fetchTopics = (userEnv) => function (dispatch) {
    const { doReadTopics } = TopicDB(userEnv);
    return doReadTopics().then((topics) => {
        dispatch(receiveTopics(topics));
    });
};
export const fetchRewards = (userEnv) => function (dispatch) {
    const { doReadRewards } = RewardDB(userEnv);
    return doReadRewards().then((rewards) => {
        dispatch(receiveRewards(rewards));
    });
};
export function updateReward(reward, userEnv) {
    return function (dispatch) {
        const { doCreateReward } = RewardDB(userEnv);
        return doCreateReward(reward).then(() => {
            dispatch(putReward(reward));
        });
    };
}
export const removeReward = (rewardId, userEnv) => function (dispatch) {
    const { doDeleteReward } = RewardDB(userEnv);
    return doDeleteReward(rewardId).then(() => {
        dispatch(deleteReward(rewardId));
    });
};
