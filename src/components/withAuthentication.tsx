import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import Redux, {bindActionCreators} from 'redux';
import {firebase} from '~/firebase';

import * as cardActions from '~/reducers/Cards/async_actions';

import * as sessionAsyncActions from '~/reducers/Session/async_actions';
import * as sessionActions from '~/reducers/Session/actions';

import AppStateShape from '~/reducers/appStateType';
import {ScreenStateType} from '~/reducers/Screen';
import {SessionStateType} from '~/reducers/Session';
import UserEnv from '~/constants/userEnvType';
import AuthUser from '~/constants/authUserType';
import DefaultLayout from '~/components/DefaultLayout';

// import DefaultLayout from '~/components/DefaultLayout';
import LogoWobble from './LogoWobble';

// import css from './withAuthentication.scss';

// import tickleSrc from '~/styles/alt_tickle_icon.svg';

/**
 * Authentication Higher Order Component to implement a Session
 */
const withAuthentication = (
  condition = (authUser: AuthUser, _: string) => !!authUser,
  DefaultScreen = LogoWobble
): Function => (Component: React.ComponentType<any>): any => {
  const WithAuthentication: React.FC<{
    clearAuthUser: Function;
    fetchUser: Function;
    authUser: AuthUser;
    history: {push(url: string): void};
    userEnvs: UserEnv[];
    match: {params: any};
    height: number;
    width: number;
  }> = props => {
    const [authenticated, setAuthenticated] = useState(false);
    const {
      clearAuthUser,
      fetchUser,
      authUser,
      history,
      match: {
        params: {userEnvId}
      },
      height
      // width
    } = props;

    useEffect(() => {
      firebase.auth.onAuthStateChanged(auth => {
        if (auth === null) {
          clearAuthUser();
          setAuthenticated(false);
          history.push(`/${userEnvId}/signin`);
        } else if (!authUser)
          fetchUser(auth.uid).then(() => {
            setAuthenticated(true);
          });
        else {
          setAuthenticated(true);
        }
      });
      // return () => firebase.auth.onAuthStateChanged(() => null);
    }, []);

    if (!authenticated) return <DefaultScreen height={height} />;
    if (!authUser) return <DefaultScreen height={height} />;

    if (!condition(authUser, userEnvId))
      return (
        <DefaultLayout>
          <h1>User has no access rights!!!</h1>
        </DefaultLayout>
      );

    return <Component {...props} />;
  };

  const mapStateToProps = (
    state: AppStateShape
  ): ScreenStateType & SessionStateType => ({
    ...state.Session,
    ...state.Screen
  });

  const mergeProps: any = (
    stateProps: any,
    dispatchProps: any,
    ownProps: any
  ) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  });

  const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): any => ({
    ...bindActionCreators(
      {
        ...sessionAsyncActions,
        ...sessionActions,
        ...cardActions
      },
      dispatch
    )
  });

  const composer: Function = compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps
    )
  );

  return composer(WithAuthentication);
};

export default withAuthentication;
