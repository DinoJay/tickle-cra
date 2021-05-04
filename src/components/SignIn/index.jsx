import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import {
  signIn,
  // signInWithFacebook
} from '~/reducers/Session/async_actions';

import ThreeDots from '~/components/utils/ThreeDots';

import { GEO_VIEW, SIGN_IN } from '~/constants/routeSpec';
import tickleSrc from '~/styles/alt_tickle_icon.svg';

import DefaultLayout from '~/components/DefaultLayout';
import { SignUpLink } from '../SignUp';

import backgroundUrl from './signin_background.png';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

/**
 * SignIn component for the user
 * TODO untangle Redux functionality into another file
 */
const SignInPage = ({ signIn, ...props }) => {
  const [error, setError] = useState(null);
  const { match, authUser, height, history } = props;
  const {
    params: { userEnv }
  } = match;

  if (authUser) {
    history.push(`/${GEO_VIEW.path}`);
  }

  return (
    <DefaultLayout
      style={{
        backgroundImage: `url("${backgroundUrl}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
      <div
        className={`z-50 w-full absolute flex justify-center ${!error &&
          'opacity-0'}`}
        style={{
          transform: `translateY(${error ? '0' : '-200%'})`,
          transition: 'transform 100ms'
        }}>
        <div className="max-w-md bg-white m-2 p-4 border-2 border-black shadow text-2xl">
          {error}
        </div>
      </div>
      <div className="flex-grow flex flex-col items-center">
        <div
          className="mb-6 mt-4 sm:mt-6 md:mt-12 w-full flex-grow"
          style={{
            maxHeight: 600,
            background: `url(${tickleSrc}) `,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
        <div className="w-3/4 flex-shrink-0 md:mt-auto mb-2 mb-32">
          <StatefulSignInForm
            {...props}
            disabled={!userEnv}
            onError={err => {
              setError(err);
            }}
            onSubmit={({ email, password, onError }) =>
              signIn({
                userEnvId: userEnv,
                email,
                password,
                onError
              }).then(() => {
                history.push(`/${GEO_VIEW.path}/${userEnv}`);
              })
            }
          />
          <div className="flex-shrink-0 bg-white border-2 border-black p-2">
            <SignUpLink userEnv={userEnv} />
          </div>
          {!userEnv && (
            <div className="alert mt-3">
              You did not specify a user environment! Please change the
              URL
            </div>
          )}
        </div>
      </div>
      <div className="absolute" style={{ bottom: 0, right: 0 }}>
        <div className="m-2 italic text-white ">{userEnv}</div>
      </div>
    </DefaultLayout>
  );
};

const StatefulSignInForm = props => {
  const INITIAL_STATE = {
    email: null,
    password: null,
    error: null
  };

  const [loading, setLoading] = useState(false);

  const { onSubmit, onError, disabled } = props;
  const [state, setState] = useState(INITIAL_STATE);
  const updateState = d => setState({ ...state, ...d });

  const { email, password } = state;

  const isInvalid = password === '' || email === '';
  // console.log('routerProps', this.props);

  return (
    <SignInForm
      loading={loading}
      setLoading={setLoading}
      disabled={disabled}
      onSubmit={() =>
        onSubmit({
          email: email.trim(),
          password
          // onError: err => {
          //   console.log('ERROR in sign in', err);
          //   // this.setState({error: err});
          // }
        }).catch(err => {
          onError(err.message);
          setLoading(false);
        })
      }
      email={email}
      onEmailChange={event => updateState({ email: event.target.value })}
      password={password}
      onPasswordChange={event =>
        updateState({ password: event.target.value })
      }
      isInvalid={isInvalid}
    />
  );
};

const SignInForm = ({
  email,
  onSubmit,
  password,
  isInvalid,
  error,
  onPasswordChange,
  onEmailChange,
  setLoading,
  loading,
  disabled
}) => {
  const inputClass =
    'w-full border-2 md:border-4 bg-white text-lg md:text-2xl py-2 px-3 text-grey-700 border-black mb-1';

  const btnClass =
    'uppercase bg-white btn md:text-xl p-1 md:p-2 font-bold border-2 md:border-4 border-black';

  return (
    <form
      className="mb-1"
      onSubmit={e => {
        e.preventDefault();
        setLoading(true);
        onSubmit();
      }}>
      <input
        value={email}
        disabled={disabled}
        onChange={onEmailChange}
        type="text"
        id="email-address"
        placeholder="Email Address"
        className={`${inputClass} `}
      />
      <input
        value={password}
        disabled={disabled}
        onChange={onPasswordChange}
        type="password"
        id="password"
        placeholder="Password"
        className={inputClass}
      />
      <div className="flex">
        <button
          className={`${btnClass} mr-1 `}
          id="signin"
          disabled={isInvalid}
          style={{ width: '100%' }}
          type="submit">
          {loading ? <ThreeDots /> : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  userEnv: state.Session.userEnvSelectedId,
  ...state.Session,
  ...state.Screen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signIn
    },
    dispatch
  );

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(SignInPage);

const SignInRedirectPure = ({ userEnv }) => (
  <Redirect to={`/${userEnv}/${SIGN_IN.path}`} />
);

export const SignInRedirect = connect(mapStateToProps)(
  SignInRedirectPure
);
