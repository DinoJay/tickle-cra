import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as mapActions from '~/reducers/Map/actions';
import * as asyncSessionActions from '~/reducers/Session/async_actions';
// import distanceLoc from '~components/utils/distanceLoc';
// import distanceLoc from 'Src/components/utils/distanceLoc';
// rename path
import { screenResize } from '~/reducers/Screen/actions';
import * as cardActions from '~/reducers/Cards/actions';
import * as asyncCardActions from '~/reducers/Cards/async_actions';
import * as asyncNotificationActions from '~/reducers/Notifications/async_actions';
import { removeNotifications } from '../../reducers/Notifications/actions';
import withAuthentication from '~/components/withAuthentication';
import TopicViewPage from './TopicViewPage';
const mapStateToProps = (state) => ({
    ...state.MapView,
    ...state.Screen,
    ...state.Session,
    ...state.Cards,
    // ...state.DataView,
    ...state.Notifications
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    ...asyncSessionActions,
    ...cardActions,
    ...mapActions,
    ...asyncCardActions,
    ...asyncNotificationActions,
    removeNotifications,
    // topicFilter,
    screenResize
}, dispatch);
// });
const mergeProps = (state, dispatcherProps, ownProps) => {
    const { 
    // collectibleCards,
    topicSet = [], 
    // accessibleRadius,
    mapSettings, width, height, cards, notifications
    // userEnvId
     } = state;
    const { match } = ownProps;
    const { userEnvId } = match.params;
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
const authCondition = (authUser) => authUser !== null;
const composeScaffold = (comp) => compose(withRouter, withAuthentication(authCondition), connect(mapStateToProps, mapDispatchToProps, mergeProps))(comp);
const ConnectedTopicViewPage = composeScaffold(TopicViewPage);
export default ConnectedTopicViewPage;
