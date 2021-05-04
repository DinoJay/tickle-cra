import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { firebase } from '~/firebase';
import * as cardActions from '~/reducers/Cards/async_actions';
import * as sessionAsyncActions from '~/reducers/Session/async_actions';
import * as sessionActions from '~/reducers/Session/actions';
import DefaultLayout from '~/components/DefaultLayout';
// import DefaultLayout from '~/components/DefaultLayout';
import LogoWobble from './LogoWobble';
// import css from './withAuthentication.scss';
// import tickleSrc from '~/styles/alt_tickle_icon.svg';
/**
 * Authentication Higher Order Component to implement a Session
 */
const withAuthentication = (condition = (authUser, _) => !!authUser, DefaultScreen = LogoWobble) => (Component) => {
    const WithAuthentication = props => {
        const [authenticated, setAuthenticated] = useState(false);
        const { clearAuthUser, fetchUser, authUser, history, match: { params: { userEnvId } }, height
        // width
         } = props;
        useEffect(() => {
            firebase.auth.onAuthStateChanged(auth => {
                if (auth === null) {
                    clearAuthUser();
                    setAuthenticated(false);
                    history.push(`/${userEnvId}/signin`);
                }
                else if (!authUser)
                    fetchUser(auth.uid).then(() => {
                        setAuthenticated(true);
                    });
                else {
                    setAuthenticated(true);
                }
            });
            // return () => firebase.auth.onAuthStateChanged(() => null);
        }, []);
        if (!authenticated)
            return React.createElement(DefaultScreen, { height: height });
        if (!authUser)
            return React.createElement(DefaultScreen, { height: height });
        if (!condition(authUser, userEnvId))
            return (React.createElement(DefaultLayout, null,
                React.createElement("h1", null, "User has no access rights!!!")));
        return React.createElement(Component, Object.assign({}, props));
    };
    const mapStateToProps = (state) => ({
        ...state.Session,
        ...state.Screen
    });
    const mergeProps = (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps
    });
    const mapDispatchToProps = (dispatch) => ({
        ...bindActionCreators({
            ...sessionAsyncActions,
            ...sessionActions,
            ...cardActions
        }, dispatch)
    });
    const composer = compose(withRouter, connect(mapStateToProps, mapDispatchToProps, mergeProps));
    return composer(WithAuthentication);
};
export default withAuthentication;
