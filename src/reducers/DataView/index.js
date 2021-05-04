import union from 'lodash/union';
import uniq from 'lodash/uniq';
import difference from 'lodash/difference';

import {TEMPLATE_ID} from '~/constants/cardTemplate';

import {CHALLENGE_NOT_SUBMITTED} from '~/constants/cardFields';

import {
  TOGGLE_AUTH_ENV,
  EXTEND_SELECTED_CARD,
  ADD_CARD_FILTER,
  REMOVE_CARD_FILTER,
  FILTER_CARDS,
  CONCEAL_CARD_STACK,
  EXTEND_CARD_STACK,
  FILTER_BY_CHALLENGE_STATE,
  TOGGLE_NAV
  // ADD_CARD_FILTER,
  // REMOVE_CARD_FILTER,
  // FILTER_CARDS
} from './actions';

const INITIAL_STATE = {
  // dataView: 'topic',
  // authEnv: false,
  cardStackBottom: false,
  cardStackExtended: false,
  // selectedCardId: null,
  extCard: null,
  topicSet: [],
  clusteredIds: [],
  challengeStateFilter: CHALLENGE_NOT_SUBMITTED
};

export default function dataViewReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXTEND_SELECTED_CARD: {
      // const { selectedCardId } = state;
      const extCardId = action.options;
      // console.log('extCardId', extCardId);
      // TODO: update
      return {...state, extCardId};
    }

    case ADD_CARD_FILTER: {
      const {topicSet} = state;
      const topicId = action.options;
      const newFs = uniq([...topicSet, topicId]);
      return {
        ...state,
        topicSet: newFs,
        selectedCardId: null
      };
    }

    case REMOVE_CARD_FILTER: {
      const {topicSet} = state;
      const tag = action.options;

      return {
        ...state,
        topicSet: difference(topicSet, [tag]),
        selectedCardId: null
      };
    }
    case TOGGLE_NAV: {
      const navigation = action.options;
      return {
        ...state,
        navigation,
        cardStackBottom: navigation
      };
    }
    case FILTER_CARDS: {
      const topicSet = action.options;
      return {
        ...state,
        topicSet,
        selectedCardId: null
      };
    }
    case EXTEND_CARD_STACK: {
      return {...state, cardStackExtended: !state.cardStackExtended};
    }

    case CONCEAL_CARD_STACK: {
      return {...state, cardStackBottom: !state.cardStackBottom};
    }

    case FILTER_BY_CHALLENGE_STATE: {
      const challengeStateFilter = action.options;
      return {...state, challengeStateFilter};
    }
    default:
      return state;
  }
}
