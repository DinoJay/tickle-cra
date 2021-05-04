import Topic from '~/constants/topicType';
import Reward from '~/constants/rewardType';
import {Card} from '~/constants/cardFields';
import ActivitySubmission from '~/constants/activitySubmissionType';
import HelpRequest from '~/constants/HelpRequestType';

import {
  RECEIVE_PLACES,
  SET_CARDS,
  SET_HELP_REQUESTS,
  RECEIVE_REWARDS,
  DELETE_REWARD,
  PUT_REWARD,
  RECEIVE_COLLECTIBLE_CARDS,
  RECEIVE_CREATED_CARDS,
  UPDATE_CARD,
  SUCCESS_UPDATE_CARD,
  ERROR_UPDATE_CARD,
  CREATE_CARD,
  SEE_CARD,
  SUCCESS_CREATE_CARD,
  ERROR_CREATE_CARD,
  DELETE_CARD,
  SUCCESS_DELETE_CARD,
  ERROR_DELETE_CARD,
  UPDATE_CARD_TEMPLATE,
  SUBMIT_ACTIVITY,
  SUBMIT_ACTIVITY_SUCCESS,
  DELETE_TOPIC,
  RECEIVE_TOPICS,
  PUT_TOPIC,
  SET_CARD_TEMPLATE,
  REMOVE_ACTIVITY_SUB,
  CardActionTypes
} from './types';

// TODO
export function receivePlaces(options: any): CardActionTypes {
  return {type: RECEIVE_PLACES, options};
}

export function setCards(options: Card[]): CardActionTypes {
  return {type: SET_CARDS, options};
}
export function setHelpRequests(
  options: HelpRequest[]
): CardActionTypes {
  return {type: SET_HELP_REQUESTS, options};
}

export function setCardTemplate(options: Card): CardActionTypes {
  return {type: SET_CARD_TEMPLATE, options};
}
export function receiveRewards(options: Reward[]): CardActionTypes {
  return {type: RECEIVE_REWARDS, options};
}

export function deleteReward(options: string): CardActionTypes {
  return {type: DELETE_REWARD, options};
}

export function putReward(options: Reward): CardActionTypes {
  return {type: PUT_REWARD, options};
}

export function receiveCollectibleCards(
  options: Card[]
): CardActionTypes {
  return {type: RECEIVE_COLLECTIBLE_CARDS, options};
}

export function receiveCreatedCards(options: Card[]): CardActionTypes {
  return {type: RECEIVE_CREATED_CARDS, options};
}

export function updateCard(options: Card): CardActionTypes {
  return {type: UPDATE_CARD, options};
}

export function removeActivitySub(options: {
  id: string;
  uid: string;
}): CardActionTypes {
  return {type: REMOVE_ACTIVITY_SUB, options};
}

export function updateCardSuccess(): CardActionTypes {
  return {type: SUCCESS_UPDATE_CARD};
}

export function updateCardError(): CardActionTypes {
  return {type: ERROR_UPDATE_CARD};
}

export function createCard(options: Card): CardActionTypes {
  return {type: CREATE_CARD, options};
}

export function seeCard(options: string): CardActionTypes {
  return {type: SEE_CARD, options};
}

export function createCardSuccess(): CardActionTypes {
  return {type: SUCCESS_CREATE_CARD};
}

export function createCardError(): CardActionTypes {
  return {type: ERROR_CREATE_CARD};
}

export function deleteCard(options: string): CardActionTypes {
  return {type: DELETE_CARD, options};
}

export function deleteCardSuccess(): CardActionTypes {
  return {type: SUCCESS_DELETE_CARD};
}

export function deleteCardError(): CardActionTypes {
  return {type: ERROR_DELETE_CARD};
}

export function updateCardTemplate(options: Card): CardActionTypes {
  return {type: UPDATE_CARD_TEMPLATE, options};
}

// export const TOGGLE_CARD_AUTHORING = 'TOGGLE_CARD_AUTHORING';
// export function toggleCardAuthoring(options) {
//   return { type: TOGGLE_CARD_AUTHORING, options };
// }

// TODO: rename

export function submitActivity(
  options: ActivitySubmission
): CardActionTypes {
  return {type: SUBMIT_ACTIVITY, options};
}

export function submitActivitySuccess(): CardActionTypes {
  return {type: SUBMIT_ACTIVITY_SUCCESS};
}

export function deleteTopic(options: string): CardActionTypes {
  return {type: DELETE_TOPIC, options};
}

export function receiveTopics(options: Topic[]): CardActionTypes {
  return {type: RECEIVE_TOPICS, options};
}

export function putTopic(options: Topic): CardActionTypes {
  return {type: PUT_TOPIC, options};
}
