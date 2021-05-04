import { RECEIVE_PLACES, SET_CARDS, SET_HELP_REQUESTS, RECEIVE_REWARDS, DELETE_REWARD, PUT_REWARD, RECEIVE_COLLECTIBLE_CARDS, RECEIVE_CREATED_CARDS, UPDATE_CARD, SUCCESS_UPDATE_CARD, ERROR_UPDATE_CARD, CREATE_CARD, SEE_CARD, SUCCESS_CREATE_CARD, ERROR_CREATE_CARD, DELETE_CARD, SUCCESS_DELETE_CARD, ERROR_DELETE_CARD, UPDATE_CARD_TEMPLATE, SUBMIT_ACTIVITY, SUBMIT_ACTIVITY_SUCCESS, DELETE_TOPIC, RECEIVE_TOPICS, PUT_TOPIC, SET_CARD_TEMPLATE, REMOVE_ACTIVITY_SUB } from './types';
// TODO
export function receivePlaces(options) {
    return { type: RECEIVE_PLACES, options };
}
export function setCards(options) {
    return { type: SET_CARDS, options };
}
export function setHelpRequests(options) {
    return { type: SET_HELP_REQUESTS, options };
}
export function setCardTemplate(options) {
    return { type: SET_CARD_TEMPLATE, options };
}
export function receiveRewards(options) {
    return { type: RECEIVE_REWARDS, options };
}
export function deleteReward(options) {
    return { type: DELETE_REWARD, options };
}
export function putReward(options) {
    return { type: PUT_REWARD, options };
}
export function receiveCollectibleCards(options) {
    return { type: RECEIVE_COLLECTIBLE_CARDS, options };
}
export function receiveCreatedCards(options) {
    return { type: RECEIVE_CREATED_CARDS, options };
}
export function updateCard(options) {
    return { type: UPDATE_CARD, options };
}
export function removeActivitySub(options) {
    return { type: REMOVE_ACTIVITY_SUB, options };
}
export function updateCardSuccess() {
    return { type: SUCCESS_UPDATE_CARD };
}
export function updateCardError() {
    return { type: ERROR_UPDATE_CARD };
}
export function createCard(options) {
    return { type: CREATE_CARD, options };
}
export function seeCard(options) {
    return { type: SEE_CARD, options };
}
export function createCardSuccess() {
    return { type: SUCCESS_CREATE_CARD };
}
export function createCardError() {
    return { type: ERROR_CREATE_CARD };
}
export function deleteCard(options) {
    return { type: DELETE_CARD, options };
}
export function deleteCardSuccess() {
    return { type: SUCCESS_DELETE_CARD };
}
export function deleteCardError() {
    return { type: ERROR_DELETE_CARD };
}
export function updateCardTemplate(options) {
    return { type: UPDATE_CARD_TEMPLATE, options };
}
// export const TOGGLE_CARD_AUTHORING = 'TOGGLE_CARD_AUTHORING';
// export function toggleCardAuthoring(options) {
//   return { type: TOGGLE_CARD_AUTHORING, options };
// }
// TODO: rename
export function submitActivity(options) {
    return { type: SUBMIT_ACTIVITY, options };
}
export function submitActivitySuccess() {
    return { type: SUBMIT_ACTIVITY_SUCCESS };
}
export function deleteTopic(options) {
    return { type: DELETE_TOPIC, options };
}
export function receiveTopics(options) {
    return { type: RECEIVE_TOPICS, options };
}
export function putTopic(options) {
    return { type: PUT_TOPIC, options };
}
