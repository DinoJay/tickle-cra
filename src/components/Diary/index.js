// import React from 'react';
// import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { range } from 'd3';
// import intersection from 'lodash/intersection';
import * as cardAsyncActions from '~/reducers/Cards/async_actions';
import withAuthentication from '~/components/withAuthentication';
import DiaryPage from './DiaryPage';
const mapStateToProps = (state) => ({
    ...state.MapView,
    ...state.Session,
    ...state.Screen,
    ...state.Cards,
    ...state.Notifications
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...cardAsyncActions }, dispatch);
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { match } = ownProps;
    const { collectibleCards, cards, authUser } = stateProps;
    if (!authUser)
        return {};
    const { uid } = authUser;
    const { userEnvId } = match.params;
    const numSeenCards = collectibleCards.filter(
    // TODO: find in real location???
    (c) => c.seen).length;
    const { fetchCollectibleCards } = dispatchProps;
    const fetchCards = () => fetchCollectibleCards({ uid, userEnvId });
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        userEnvId,
        relatedTags: [],
        fetchCards,
        numSeenCards,
        cards: cards.sort((a, b) => {
            if (a.id < b.id)
                return -1;
            if (a.id > b.id)
                return 1;
            return 0;
        })
    };
};
const composer = compose(withAuthentication((authUser, userEnvId) => {
    const { envIds } = authUser;
    return envIds.includes(userEnvId);
}), withRouter, connect(mapStateToProps, mapDispatchToProps, mergeProps));
export default composer(DiaryPage);
