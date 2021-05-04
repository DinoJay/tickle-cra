export const SET_DATA_VIEW = 'SET_DATA_VIEW';
export function setDataView(options) {
  return {type: SET_DATA_VIEW, options};
}

export const TOGGLE_AUTH_ENV = 'TOGGLE_AUTH_ENV';
export function toggleAuthEnv() {
  return {type: TOGGLE_AUTH_ENV};
}

export const SELECT_CARD = 'SELECT_CARD';
export function selectCard(options) {
  return {type: SELECT_CARD, options};
}

export const EXTEND_SELECTED_CARD = 'EXTEND_SELECTED_CARD';
export function extendSelectedCard(options) {
  return {type: EXTEND_SELECTED_CARD, options};
}

export const TOGGLE_NAV = 'TOGGLE_NAV';
export function toggleNav(options) {
  return {type: TOGGLE_NAV, options};
}

// export const FLIP_CARD = 'FLIP_CARD';
// export function flipCard(options) {
//   return { type: FLIP_CARD, options };
// }
// export const FILTER = 'FILTER';
// export function filter(options) {
//   return { type: FILTER, options };
// }
export const ADD_CARD_FILTER = 'ADD_CARD_FILTER';
export function addCardFilter(options) {
  return {type: ADD_CARD_FILTER, options};
}

export const REMOVE_CARD_FILTER = 'REMOVE_CARD_FILTER';
export function removeCardFilter(options) {
  return {type: REMOVE_CARD_FILTER, options};
}

export const FILTER_CARDS = 'FILTER_CARDS';
export function filterCards(options) {
  return {type: FILTER_CARDS, options};
}

export const CONCEAL_CARD_STACK = 'CONCEAL_CARD_STACK';
export function concealCardStack(options) {
  return {type: CONCEAL_CARD_STACK, options};
}

export const EXTEND_CARD_STACK = 'EXTEND_CARD_STACK';
export function extendCardStack(options) {
  return {type: EXTEND_CARD_STACK, options};
}

export const FILTER_BY_CHALLENGE_STATE = 'FILTER_BY_CHALLLENGE_STATE';
export function filterByChallengeState(options) {
  return {type: FILTER_BY_CHALLENGE_STATE, options};
}

//
// export const FILTER = 'FILTER';
// export function filter(options) {
//   return { type: FILTER, options };
// }
//
// export const FILTER_CARDS = 'FILTER_CARDS';
// export function filterCards(options) {
//   return { type: FILTER_CARDS, options };
// }
//
// export const ADD_CARD_FILTER = 'ADD_CARD_FILTER';
// export function addCardFilter(options) {
//   return { type: ADD_CARD_FILTER, options };
// }
//
// export const REMOVE_CARD_FILTER = 'REMOVE_CARD_FILTER';
// export function removeCardFilter(options) {
//   return { type: REMOVE_CARD_FILTER, options };
// }
