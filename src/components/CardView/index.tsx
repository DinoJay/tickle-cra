// import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import Redux, {bindActionCreators} from 'redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import Topic from '~/constants/topicType';
import {Card, TEMP_ID} from '~/constants/cardFields';
import calcDist from './calcDist';
import {parseTime} from '~/components/utils/time';

// import debounce from 'lodash/debounce';
import {History, Match} from '~/constants/typeUtils';

import AppStateType from '~/reducers/appStateType';
import * as mapActions from '~/reducers/Map/actions';
import * as asyncSessionActions from '~/reducers/Session/async_actions';

import setify from '~/components/utils/setify';

// import distanceLoc from '~components/utils/distanceLoc';
// import distanceLoc from 'Src/components/utils/distanceLoc';

// rename path
import {screenResize} from '~/reducers/Screen/actions';
import * as cardActions from '~/reducers/Cards/actions';
import * as asyncCardActions from '~/reducers/Cards/async_actions';
import * as asyncNotificationActions from '~/reducers/Notifications/async_actions';

import {removeNotifications} from '../../reducers/Notifications/actions';

import withAuthentication from '~/components/withAuthentication';

import {distanceLoc} from '~/components/utils/geometricRadius';

import AuthUser from '~/constants/authUserType';
import CardViewPage from './CardViewPage';

const sortByTime = (a: Card, b: Card) => {
  const aStartDateTime =
    a.loc && a.loc.value && a.loc.value.startDateTime
      ? a.loc.value.startDateTime
      : '';
  const bStartDateTime =
    b.loc && b.loc.value && b.loc.value.startDateTime
      ? b.loc.value.startDateTime
      : '';

  const aParsedTime = parseTime(aStartDateTime)!;
  const bParsedTime = parseTime(bStartDateTime)!;

  if (aParsedTime < bParsedTime) {
    return -1;
  }
  if (aParsedTime > bParsedTime) {
    return 1;
  }
  return 0;
};
const mapStateToProps = (state: AppStateType) => ({
  ...state.MapView,
  ...state.Screen,
  ...state.Session,
  ...state.Cards,
  // ...state.DataView,
  ...state.Notifications
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) =>
  bindActionCreators(
    {
      ...asyncSessionActions,
      ...cardActions,
      ...mapActions,
      ...asyncCardActions,
      ...asyncNotificationActions,
      removeNotifications,
      // topicFilter,
      screenResize
    },
    dispatch
  );

// });

const mergeProps = (
  state: any,
  dispatcherProps: any,
  ownProps: Match & History
) => {
  const {
    // collectibleCards,
    topicSet = [],
    userLocation,
    // accessibleRadius,
    mapSettings,
    width,
    height,
    topicDict,
    cards,
    notifications,
    tmpCard,
    authUser
    // userEnvId
  } = state;

  const {uid, admin} = authUser;
  const {match} = ownProps;
  const {userEnvId} = match.params;
  const {
    fetchCollectibleCards,
    fetchAllNotifications,
    asyncUpdateCard,
    updateCardTemplate
  } = dispatcherProps;

  const mapViewport = {
    ...mapSettings,
    width,
    height
  };

  const onCardDrop = (cardData: Card) => {
    if (cardData.id === TEMP_ID) updateCardTemplate(cardData);
    else asyncUpdateCard({cardData, userEnvId});
  };

  const filteredCards = cards
    .filter((d: Card) => d.published)
    // .filter(
    //   d => topicSet.length === 0 || isSubset(d.topics.value, topicSet)
    // )
    .filter((c: Card) => {
      const {radius = Infinity} = c.loc.value;
      const accessible =
        admin ||
        distanceLoc(userLocation, c.loc.value) < radius / 2 + 1;
      return accessible;
    })
    .map((c: Card) => ({
      ...c,
      distance: calcDist(c, userLocation)
    }))
    .filter(
      (c: Card) =>
        (c.loc && c.loc.value && !c.loc.value.startDateTime) ||
        parseTime(c.loc.value.startDateTime)! <= new Date()
    )
    // .filter((c: Card) => !c.activitySubmission)
    .sort(sortByTime);

  const topics = setify(filteredCards).map(d => ({
    ...topicDict.find((e: Topic) => e.id === d.id),
    ...d
  }));

  const fetchCards = () => {
    fetchCollectibleCards({uid, userEnvId});
  };
  const fetchNotifications = () =>
    fetchAllNotifications(authUser.uid, userEnvId);

  const newCard = {
    ...tmpCard,
    id: TEMP_ID,
    uid: authUser.uid,
    loc: {...tmpCard.loc, value: userLocation}
  };

  const superAdmin = authUser.email === 'jmaushag@gmail.com';

  return {
    ...ownProps,
    ...state,
    ...dispatcherProps,
    cards: filteredCards,
    topicSet,
    topics,
    newCard,
    notifications,
    mapViewport,
    fetchCards,
    fetchNotifications,
    onCardDrop,
    superAdmin,
    userEnvId
  };
};

const authCondition = (authUser: AuthUser) => authUser !== null;

const composeScaffold = (comp: any) =>
  compose(
    withRouter,
    withAuthentication(authCondition),
    connect(mapStateToProps, mapDispatchToProps as any, mergeProps)
  )(comp);

const MapViewPage = composeScaffold(CardViewPage);

export default MapViewPage;
