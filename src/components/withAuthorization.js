import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import * as asyncActions from '~/reducers/Session/async_actions';

const withAuthorization = (
  condition = authUser => !!authUser
) => Component => {
  class WithAuthorization extends React.Component {
    state = {};

    componentDidMount() {
      const {match, history} = this.props;
      const {params} = match;
      const {authUser, userEnvId} = this.props;

      if (!condition(authUser)) history.push(`/${userEnvId}/signin`);
    }

    componentDidUpdate(prevProps, prevState) {
      const {authUser, history, userEnvId} = this.props;

      if (!condition(authUser)) history.push(`/${userEnvId}/signin`);
    }

    render() {
      const {authUser} = this.props;
      return authUser ? (
        <Component {...this.props} />
      ) : (
        <div>No Right</div>
      );
    }
  }

  const mapStateToProps = state => ({
    ...state.Session
  });

  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(asyncActions, dispatch)
  });

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
    // onSetAuthUser
  });

  return compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps
    )
  )(WithAuthorization);
};

export default withAuthorization;
