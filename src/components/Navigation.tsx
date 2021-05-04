import React from 'react';
import {connect} from 'react-redux';

import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {auth} from '~/firebase';

import AuthUser from '~/constants/authUserType';

import {RouterTypes} from '~/constants/typeUtils';

import AppStateType from '~/reducers/appStateType';

import {
  authRoutes,
  adminRoutes,
  nonAuthRoutes
} from '~/constants/routeSpec';

const listItemClass = 'mb-1 p-2 text-xl cursor-pointer';

const ListItem: React.FC<{
  path: string;
  children: React.ReactNode;
  userEnvId: string;
}> = ({path, children, userEnvId = []}) => (
  <li className={listItemClass}>
    <Link className="link" to={`/${path}/${userEnvId}`}>
      {children}
    </Link>
  </li>
);

const NavigationHelper: React.FC<{
  location: any;
  routes: any[];
  signOut: boolean;
  // TODO Function does not work
  children?: any;
  userEnvId: string;
}> = ({location, routes, signOut, children, userEnvId}) => (
  <ul className="list-reset">
    {routes.map(r => (
      <ListItem
        userEnvId={userEnvId}
        {...r}
        curPath={location.pathname}>
        {children && children(r)}
      </ListItem>
    ))}
    {signOut && (
      <li>
        <button
          type="button"
          className="btn border-2 p-2"
          onClick={(): void => {
            auth.doSignOut();
          }}>
          Sign Out
        </button>
      </li>
    )}
  </ul>
);

/**
 * Utility to map routes to session state i.e. authenticated,
 * not authenticated and admin
 */

const RouteNavigation: React.FC<
  RouterTypes & {authUser: AuthUser}
> = props => {
  const {authUser, match, location} = props;

  const {
    params: {userEnvId}
  } = match;

  if (authUser) {
    if (authUser.admin) {
      return (
        <NavigationHelper
          {...props}
          location={location}
          userEnvId={userEnvId}
          signOut
          routes={adminRoutes}
        />
      );
    }
    return (
      <NavigationHelper
        {...props}
        location={location}
        userEnvId={userEnvId}
        signOut
        routes={authRoutes}
      />
    );
  }
  return (
    <NavigationHelper
      {...props}
      location={location}
      userEnvId={userEnvId}
      routes={nonAuthRoutes}
      signOut={false}
    />
  );
};

const mapStateToProps = (state: AppStateType): object => ({
  ...state.Session
});

const composer: Function = compose(
  withRouter,
  connect(mapStateToProps)
);

export default composer(RouteNavigation);
