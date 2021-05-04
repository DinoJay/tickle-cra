import React from 'react';
import {compose} from 'recompose';
import Redux, {bindActionCreators} from 'redux';

import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import * as cardsThunks from '~/reducers/Cards/async_actions';

import useRouteParams from '~/Routes/useRouteParams';

import {initCardFields, Card} from '~/constants/cardFields';
import Topic from '~/constants/topicType';
import AppStateType from '~/reducers/appStateType';

import CardBack from './CardBack';

import CardFrontAndModal from './CardFront/CardFrontAndModal';
import CardFrame from './CardFrame';

interface CardInterface extends Card {
  onLeftClick?: Function;
  onRightClick?: Function;
  cards: Card[];
  topicDict: Topic[];
  userEnvId: string;
}

/**
 * Representation component to show viewable Card
 */
const CardViewable: React.FC<CardInterface> = props => {
  const {id, addComment, authUser, controls, userEnvId} = props;

  const {query, routeToggleExtend, routeFlip} = useRouteParams();

  return (
    <CardFrame
      {...props}
      className="flex flex-col flex-grow"
      key={id}
      flipped={query.flipped}
      front={
        <CardFrontAndModal
          {...props}
          onFlip={routeFlip}
          onClose={routeToggleExtend}
        />
      }
      back={
        <CardBack
          {...props}
          userEnvId={userEnvId}
          id={id}
          onClose={routeToggleExtend}
          onFlip={routeFlip}
          addComment={addComment}
          authUser={authUser}
          controls={controls}
        />
      }
    />
  );
};

// TODO fix later
const mapStateToProps = (state: AppStateType): any => ({
  ...state.Session,
  ...state.Cards
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): any =>
  bindActionCreators({...cardsThunks}, dispatch);

// TODO
const mergeProps = (
  state: AppStateType,
  dispatcherProps: object,
  ownProps: object
) => {
  const defProps = {...state, ...initCardFields, ...ownProps};

  return {
    ...defProps,
    ...state,
    ...dispatcherProps
  };
};

/**
 * Connect CardViewable to the Store
 */
const composer: Function = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
);

export default composer(CardViewable);
