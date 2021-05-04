import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import * as asyncSessionActions from '~/reducers/Session/async_actions';
import * as sessionActions from '~/reducers/Session/actions';
import * as asyncAdminActions from '~/reducers/Admin/async_actions';
import * as asyncCardActions from '~/reducers/Cards/async_actions';
import * as adminActions from '~/reducers/Admin/actions';
import { User } from '~/constants/userFields';

import AppStateType from '~/reducers/appStateType';

// import withAuthorization from '~/components/withAuthorization';
import withAuthentication from '~/components/withAuthentication';
import { History, Match } from '~/constants/typeUtils';

// import uuidv1 from 'uuid/v1';

import { ScreenStateType } from '~/reducers/Screen';
import { SessionStateType } from '~/reducers/Session';
import { MapViewStateType } from '~/reducers/Map';
import { CardsStateType } from '~/reducers/Cards';
import { AdminStateType } from '~/reducers/Admin';

import { TEMP_ID } from '~/constants/cardFields';
import AdminPage from './AdminPage';

const mapStateToProps = (state: AppStateType) => ({
  ...state.Screen,
  ...state.Session,
  ...state.MapView,
  ...state.Admin,
  ...state.Cards
  // userEnvs: state.Session.authUser ? state.Session.authUser.userEnvs : [],
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): any =>
  bindActionCreators(
    {
      ...asyncSessionActions,
      ...sessionActions,
      ...asyncAdminActions,
      ...adminActions,
      ...asyncCardActions
    },
    dispatch
  );

const mergeProps = (
  stateProps: SessionStateType &
    MapViewStateType &
    CardsStateType &
    AdminStateType &
    ScreenStateType,
  dispatchProps: any,
  ownProps: Match & History
) => {
  const {
    selectedUserId,
    authUser,
    tmpCard,
    userLocation,
  } = stateProps;

  const { inviteUser, selectUser } = dispatchProps;

  const { match, history } = ownProps;
  const { url, params } = match;
  const { userEnvId } = params;

  const changeUserEnv = (envId: string) => {
    const nurl = url.replace(`${userEnvId}`, envId);
    selectUser(null);
    history.push(nurl);
    // routeId(null);
  };

  const templateCard = {
    loc: userLocation,
    ...tmpCard,
    uid: authUser!.uid,
    id: TEMP_ID,
    template: true,
    edit: true
  };

  // const routeUserEnv = env => setUserEnv(env);

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    changeUserEnv,
    selectedUserId,
    templateCard,
    // nonEnvUsers,
    userEnvId,
    selectedUserEnvId: userEnvId,
    inviteUser: (usr: User) => {
      // TODO
      inviteUser({ ...usr, userEnvIds: [userEnvId] });
    }
  };
};

const composer: (
  a: React.FC<any>
) => React.ComponentClass<{}, any> = compose(
  withRouter,
  withAuthentication(authUser => authUser.admin),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
);

export default composer(AdminPage);
