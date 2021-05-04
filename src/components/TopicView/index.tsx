import {connect} from 'react-redux';
import Redux, {bindActionCreators} from 'redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
// import Topic from '~/constants/topicType';
// import {Card, TEMP_ID} from '~/constants/cardFields';

// import debounce from 'lodash/debounce';
import {History, Match} from '~/constants/typeUtils';

import AppStateType from '~/reducers/appStateType';
import * as mapActions from '~/reducers/Map/actions';
import * as asyncSessionActions from '~/reducers/Session/async_actions';

// import distanceLoc from '~components/utils/distanceLoc';
// import distanceLoc from 'Src/components/utils/distanceLoc';

// rename path
import {screenResize} from '~/reducers/Screen/actions';
import * as cardActions from '~/reducers/Cards/actions';
import * as asyncCardActions from '~/reducers/Cards/async_actions';
import * as asyncNotificationActions from '~/reducers/Notifications/async_actions';

import {removeNotifications} from '../../reducers/Notifications/actions';

import withAuthentication from '~/components/withAuthentication';

import AuthUser from '~/constants/authUserType';
import TopicViewPage from './TopicViewPage';

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
    // accessibleRadius,
    mapSettings,
    width,
    height,
    cards,
    notifications
    // userEnvId
  } = state;

  const {match} = ownProps;
  const {userEnvId} = match.params;

  const mapViewport = {
    ...mapSettings,
    width,
    height
  };

  return {
    ...ownProps,
    ...state,
    ...dispatcherProps,
    cards,
    topicSet,
    notifications,
    mapViewport,
    userEnvId
  };
};

const authCondition = (authUser: AuthUser) => authUser !== null;

const composeScaffold = (comp: any) =>
  compose(
    withRouter,
    withAuthentication(authCondition),
    connect(
      mapStateToProps,
      mapDispatchToProps as any,
      mergeProps
    )
  )(comp);

const ConnectedTopicViewPage = composeScaffold(TopicViewPage);

export default ConnectedTopicViewPage;
