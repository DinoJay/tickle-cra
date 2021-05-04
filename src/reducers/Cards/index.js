import uniqBy from 'lodash/uniqBy';
import allSoftSkills from '~/constants/softSkillData';
import { TITLE, TEMP_ID, LOC } from '~/constants/cardFields';
import defaultTopics from '~/constants/defaultTopics';
import { 
// RECEIVE_PLACES,
UPDATE_CARD, 
// SET_FIELD_VISIBILITY,
SET_CARDS, PUT_REWARD, RECEIVE_REWARDS, SUBMIT_ACTIVITY, SET_HELP_REQUESTS, 
// UPDATE_CARD_SUCCESS,
UPDATE_CARD_TEMPLATE, SET_CARD_TEMPLATE, RECEIVE_COLLECTIBLE_CARDS, RECEIVE_TOPICS, RECEIVE_CREATED_CARDS, CREATE_CARD, SUCCESS_CREATE_CARD, ERROR_CREATE_CARD, DELETE_CARD, DELETE_TOPIC, DELETE_REWARD, ERROR_DELETE_CARD, SUCCESS_DELETE_CARD, REMOVE_ACTIVITY_SUB, 
// SEE_CARD,
// SELECT_CARD,
// EXTEND_SELECTED_CARD,
// TOGGLE_CARD_AUTHORING,
// LOADING_CARDS,
PUT_TOPIC
// ADD_CARD_FILTER,
// REMOVE_CARD_FILTER,
// FILTER_CARDS
 } from './types';
const cardTemplateId = 'temp';
const defaultLocation = {
    latitude: 50.85146,
    longitude: 4.315483,
    radius: 500
};
const defaultCardTemplate = {
    // TODO: not perfect
    id: 'exampleId',
    uid: 'exampleUid',
    title: { key: TITLE, value: 'New Card' },
    // TODO remove
    template: true,
    loc: { key: LOC, value: defaultLocation }
};
const INITIAL_STATE = {
    cardTemplateId,
    collectibleCards: [],
    createdCards: [],
    rewards: [],
    softSkillDict: allSoftSkills,
    topicDict: [],
    tmpCard: defaultCardTemplate,
    challenges: [],
    cardChallengeOpen: false,
    selectedTags: [],
    cards: [],
    helpRequests: []
};
// const cardTemplateId = 'temp';
function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        // case LOADING_CARDS: {
        //   // const isLoadingCards = action.options;
        //   return {
        //     ...state,
        //     isLoadingCards
        //   };
        // }
        case SET_HELP_REQUESTS: {
            const helpRequests = action.options;
            return {
                ...state,
                helpRequests: [...state.helpRequests, ...helpRequests]
            };
        }
        case REMOVE_ACTIVITY_SUB: {
            const { cards } = state;
            const { id, uid } = action.options;
            const ca = cards.find(c => c.id === id);
            if (!ca)
                return state;
            const nc = {
                ...ca,
                activitySubmission: null,
                allActivitySubs: ca.allActivitySubs
                    ? ca.allActivitySubs.filter(a => a.uid !== uid)
                    : []
            };
            const newCards = cards.reduce((acc, c) => [...acc, c.id !== id ? c : nc], []);
            return {
                ...state,
                cards: newCards
                // fieldVisibility: {...state.fieldVisibility, ...action.options}
            };
        }
        case SET_CARDS: {
            const cards = action.options;
            return { ...state, cards };
        }
        // case SEE_CARD: {
        //   const {cards}: {cards:Card[]} = state;
        //
        //   // const updatedCollectibleCards = collectibleCards.map(d => {
        //   //   if (d.id === id) return {...d, seen: true};
        //   //   return d;
        //   // });
        //
        //   return {...state};
        // }
        case RECEIVE_CREATED_CARDS: {
            // const {collectibleCards}: {collectibleCards: Card[]} = state;
            const cards = action.options;
            return {
                ...state,
                cards,
                tmpCard: defaultCardTemplate
            };
        }
        case RECEIVE_TOPICS: {
            const topicDict = action.options;
            return {
                ...state,
                topicDict: uniqBy([...defaultTopics, ...topicDict], 'id')
            };
        }
        case DELETE_TOPIC: {
            const id = action.options;
            const { topicDict } = state;
            return { ...state, topicDict: topicDict.filter(d => d.id !== id) };
        }
        case RECEIVE_COLLECTIBLE_CARDS: {
            const cards = action.options;
            return {
                ...state,
                cards,
                tmpCard: defaultCardTemplate
            };
        }
        case SUCCESS_CREATE_CARD: {
            return {
                ...state
            };
        }
        case CREATE_CARD: {
            const { cards } = state;
            const newCard = action.options;
            return {
                ...state,
                cards: [newCard, ...cards]
                // tmpCard: defaultCardTemplate
            };
        }
        case ERROR_CREATE_CARD: {
            return state;
        }
        case UPDATE_CARD: {
            const { cards } = state;
            const updatedCard = action.options;
            const doUpdateCard = (c) => {
                if (c.id === updatedCard.id) {
                    return updatedCard;
                }
                return c;
            };
            const updatedCards = cards.map(doUpdateCard);
            return {
                ...state,
                cards: updatedCards
            };
        }
        case SUBMIT_ACTIVITY: {
            const { cards } = state;
            const activitySubmission = action.options;
            const updatedCards = cards.map(c => {
                const allActivitySubs = c.allActivitySubs
                    ? c.allActivitySubs.reduce((acc, a) => [
                        ...acc,
                        activitySubmission.uid === a.uid &&
                            activitySubmission.id === a.id
                            ? activitySubmission
                            : a
                    ], [])
                    : [];
                if (activitySubmission.id === c.id)
                    return { ...c, activitySubmission, allActivitySubs };
                return { ...c, allActivitySubs };
            });
            return {
                ...state,
                cards: updatedCards
            };
        }
        // case TOGGLE_CARD_CHALLENGE: {
        //   const {cardChallengeOpen} = action.options;
        //   return {
        //     ...state,
        //     cardChallengeOpen
        //   };
        // }
        case SET_CARD_TEMPLATE: {
            const card = action.options;
            return {
                ...state,
                tmpCard: { ...card, template: true }
            };
        }
        case UPDATE_CARD_TEMPLATE: {
            const { tmpCard } = state;
            const card = action.options;
            return {
                ...state,
                tmpCard: { ...tmpCard, ...card, id: TEMP_ID, template: true }
            };
        }
        case DELETE_CARD: {
            const { cards } = state;
            const cid = action.options;
            const newCards = cards.filter(c => c.id !== cid);
            return {
                ...state,
                cards: newCards
                // selectedCardId: 'temp'
            };
        }
        case SUCCESS_DELETE_CARD: {
            return state;
        }
        case ERROR_DELETE_CARD: {
            return state;
        }
        // case RECEIVE_PLACES: {
        //   const {results: places} = action.options;
        //   // console.log('places', places);
        //   const placeCards = places.map(
        //     ({
        //       id,
        //       geometry: {
        //         location: {lat: latitude, lng: longitude}
        //       },
        //       types: tags,
        //       name: title
        //     }) => ({
        //       id,
        //       loc: {latitude, longitude},
        //       tags,
        //       title,
        //       challenge: {type: null},
        //       media: []
        //     })
        //   );
        //   // console.log('cardPlaces', placeCards);
        //   // const newCards = [...state.cards, ...placeCards];
        //   // console.log('newCards', state.cards, placeCards);
        //   return {
        //     ...state,
        //     accessibleCards: placeCards,
        //     defaultCards: placeCards
        //   };
        // }
        case PUT_TOPIC: {
            const newTopic = action.options;
            const { topicDict } = state;
            const alreadyExist = topicDict.find(d => d.id === newTopic.id) || null;
            const newTopicDict = alreadyExist !== null
                ? topicDict.map(d => (d.id === newTopic.id ? newTopic : d))
                : [newTopic, ...topicDict];
            return {
                ...state,
                topicDict: newTopicDict
                // isLoadingCards
            };
        }
        case RECEIVE_REWARDS: {
            const rewards = action.options;
            return { ...state, rewards };
        }
        case PUT_REWARD: {
            const newReward = action.options;
            const { rewards } = state;
            const alreadyExist = rewards.find(d => d.id === newReward.id) || null;
            const newRewards = alreadyExist !== null
                ? rewards.map(d => (d.id === newReward.id ? newReward : d))
                : [newReward, ...rewards];
            return {
                ...state,
                rewards: newRewards
                // isLoadingCards
            };
        }
        case DELETE_REWARD: {
            const id = action.options;
            const { rewards } = state;
            return {
                ...state,
                rewards: rewards.filter((d) => d.id !== id)
            };
        }
        default:
            return state;
        // default: {
        //   console.log('action', action);
        // }
    }
}
export default reducer;
