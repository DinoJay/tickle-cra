// import React from 'react';

// import React from 'react';
import {withRouter} from 'react-router-dom';
import Redux, {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {MapViewStateType} from '~/reducers/Map';
import {SessionStateType} from '~/reducers/Session';
import {ScreenStateType} from '~/reducers/Screen';
import {CardsStateType} from '~/reducers/Cards';
import {NotificationsStateType} from '~/reducers/Notifications';

// import uniq from 'lodash/uniq';
import AppState from '~/reducers/appStateType';
import AuthUser from '~/constants/authUserType';
// import Topic from '~/constants/topicType';
import {Card} from '~/constants/cardFields';

// import { range } from 'd3';
// import intersection from 'lodash/intersection';

import * as cardAsyncActions from '~/reducers/Cards/async_actions';

import withAuthentication from '~/components/withAuthentication';
import DiaryPage from './DiaryPage';
import Props from './Props';

const mapStateToProps = (
  state: AppState
): MapViewStateType &
  SessionStateType &
  ScreenStateType &
  NotificationsStateType &
  CardsStateType => ({
  ...state.MapView,
  ...state.Session,
  ...state.Screen,
  ...state.Cards,
  ...state.Notifications
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): any =>
  bindActionCreators({...cardAsyncActions}, dispatch);

const mergeProps = (
  stateProps: MapViewStateType &
    SessionStateType &
    ScreenStateType &
    CardsStateType,
  dispatchProps: any,
  ownProps: any
): any => {
  const {match} = ownProps;
  const {collectibleCards, cards, authUser} = stateProps;
  if (!authUser) return {};
  const {uid} = authUser;

  const {userEnvId} = match.params;

  const numSeenCards = collectibleCards.filter(
    // TODO: find in real location???
    (c: Card & {seen?: boolean}) => c.seen
  ).length;

  const {fetchCollectibleCards} = dispatchProps;

  const fetchCards = (): void =>
    fetchCollectibleCards({uid, userEnvId});

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    userEnvId,
    relatedTags: [],
    fetchCards,
    numSeenCards,
    cards: cards.sort((a: Card, b: Card) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    })
  };
};

const composer: (
  a: React.FC<Props>
) => React.ComponentClass<{}, any> = compose(
  withAuthentication((authUser: AuthUser, userEnvId: string) => {
    const {envIds} = authUser;
    return envIds.includes(userEnvId);
  }),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
);

export default composer(DiaryPage);
