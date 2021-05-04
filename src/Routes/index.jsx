import React, { Suspense, lazy } from 'react';

import { QueryParamProvider } from 'use-query-params';

import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';

import {
  MYCARDS,
  LEADERBOARD,
  GEO_VIEW,
  TAG_VIEW,
  AUTHOR,
  GEO_AUTHOR,
  SIGN_UP,
  SIGN_IN,
  ADMIN,
  ADMIN_SIGN_UP,
  TOPIC_VIEW
} from '~/constants/routeSpec';

import DefaultLayout from '~/components/DefaultLayout';

import LogoWobble from '~/components/LogoWobble';

const SignUp = lazy(() => import('~/components/SignUp'));
const SignIn = lazy(() => import('~/components/SignIn'));
const Diary = lazy(() => import('~/components/Diary'));
const CardView = lazy(() => import('~/components/CardView'));
const Admin = lazy(() => import('~/components/Admin'));
const TopicView = lazy(() => import('~/components/TopicView'));

const NoMatch = () => (
  <DefaultLayout>
    <div className="content-margin">
      <h1>Unknown path</h1>
    </div>
  </DefaultLayout>
);

// Object Oriented Modelling environment
const defaultEnv = '65a5cea0-dae2-11e9-879a-c50279cf71aa';

/**
 * This function defines the routes for the whole app
 */
const Routes = () => (
  <HashRouter>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Suspense
        fallback={
          <div className="w-full h-full">
            <LogoWobble />
          </div>
        }>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Redirect to={`/${defaultEnv}/${SIGN_IN.path}`} />
            )}
          />
          <Route
            path={`/${MYCARDS.path}/:userEnvId`}
            component={Diary}
          />
          <Route
            path={`/${MYCARDS.path}`}
            exact
            render={() => <Redirect to={`/${MYCARDS.path}/default`} />}
          />
          <Route
            exact
            path={`/${GEO_VIEW.path}/:userEnvId`}
            component={CardView}
          />
          <Route
            path={`/${GEO_VIEW.path}`}
            exact
            render={() => (
              <Redirect to={`/${GEO_VIEW.path}/${defaultEnv}`} />
            )}
          />
          <Route
            exact
            path={/* TODO */ `/:userEnv/${SIGN_UP.path}/:admin?`}
            component={() => <SignUp admin={false} />}
          />
          <Route
            path={ADMIN_SIGN_UP.path}
            exact
            render={() => (
              <Redirect to={`${ADMIN_SIGN_UP.path}/default`} />
            )}
          />
          <Route
            exact
            path={`${ADMIN_SIGN_UP.path}/:admin`}
            component={() => (
              <DefaultLayout>
                <SignUp admin />
              </DefaultLayout>
            )}
          />
          <Route
            path={`/:userEnv/${SIGN_IN.path}`}
            component={SignIn}
          />
          <Route
            exact
            path={`/${ADMIN.path}/:userEnvId`}
            component={() => <Admin />}
          />
          <Route
            exact
            path={`/${TOPIC_VIEW.path}/:userEnvId`}
            component={() => <TopicView />}
          />
          <Route
            path={`/${ADMIN.path}`}
            exact
            render={() => <Redirect to={`/${ADMIN.path}/default`} />}
          />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </QueryParamProvider>
  </HashRouter>
);

export default Routes;
