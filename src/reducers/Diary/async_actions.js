import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';

import {receiveUserInfo} from './actions';

import NearbyPlaces from '../places.json';

import {getDetailedUserInfo} from '~/firebase/db/user_db';
import setify from '~/components/utils/setify';

// export const REQUEST_CHALLENGES = 'REQUEST_CHALLENGES';
// function requestChallenges(subreddit) {
//   return {
//     type: REQUEST_CHALLENGES,
//     subreddit
//   };
// }
// export const RECEIVE_CHALLENGES = 'RECEIVE_CHALLENGES';
// function receiveCards(json) {
//   return {
//     type: RECEIVE_CHALLENGES,
//     challenges: json,
//     receivedAt: Date.now()
//   };
// }

// export const SCREEN_RESIZE = 'SCREEN_RESIZE_jan';
// export function screenResize(options) {
//   return { type: SCREEN_RESIZE, options };
// }
export function getUserInfo(uid) {
  return function(dispatch) {
    return getDetailedUserInfo(uid).then(info => {
      const {
        interests: plainInterests,
        createdCards,
        collectedCards,
        ...userDetails
      } = info;

      const interests = plainInterests.map(key => ({
        key,
        count: 10,
        values: []
      }));

      const cardSets = setify([...createdCards, ...collectedCards]);

      const numCollectedCards = collectedCards.length;
      const numCreatedCards = createdCards.length;

      const detailInfo = {
        ...userDetails,
        interests,
        cardSets,
        skills: cardSets,
        collectedCards,
        createdCards,
        numCollectedCards,
        numCreatedCards
      };

      dispatch(receiveUserInfo(detailInfo));
    });
  };
}
