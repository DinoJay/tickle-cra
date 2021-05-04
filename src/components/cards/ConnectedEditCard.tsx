import React from 'react';
// import chroma from 'chroma-js';
import {compose} from 'recompose';

// import Trash2 from 'react-feather/dist/icons/trash-2';
import Redux, {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';

import DB from '~/firebase/db/card_db';
import * as cardActions from '~/reducers/Cards/actions';

import {changeMapViewport} from '~/reducers/Map/actions';

import * as asyncCardActions from '~/reducers/Cards/async_actions';

// import ActivityDB from '~/firebase/db/activity_db';

import useRouteParams from '~/Routes/useRouteParams';
// import ThreeDots from '~/components/utils/ThreeDots';

import {initCardFields, Card} from '~/constants/cardFields';
import EditCardFront from './CardFront/EditCardFront';

import ReviewCard from './ReviewCard';
import ConnectedCard from './ConnectedCard';

import CardBack from './CardBack';

import CardFrame from './CardFrame';

// import ActivitySubmission from '~/constants/activitySubmissionType';
import AuthUser from '~/constants/authUserType';
import Topic from '~/constants/topicType';

import AppState from '~/reducers/appStateType';

import {MapViewStateType} from '~/reducers/Map';
import {SessionStateType} from '~/reducers/Session';
import {ScreenStateType} from '~/reducers/Screen';
import {CardsStateType} from '~/reducers/Cards';

function mapStateToProps(state: AppState) {
  return {
    ...state.MapView,
    ...state.Cards,
    ...state.Screen,
    userLocation: state.MapView.userLocation,
    ...state.Session,
    ...state.Cards
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): any =>
  bindActionCreators(
    {
      ...cardActions,
      ...asyncCardActions,
      changeMapViewport
    },
    dispatch
  );

const mergeProps = (
  state: MapViewStateType &
    SessionStateType &
    ScreenStateType &
    CardsStateType,
  dispatcherProps: any,
  ownProps: any
) => {
  // Rename topic
  const {authUser} = state;
  const {uid: authorId} = authUser!;
  const {
    params: {userEnvId}
  } = ownProps.match;
  const defaultProps = {...initCardFields, ...ownProps};

  const {
    id: cardId,
    onFlip,

    onCreateCard = () => null,
    onUpdateCard = () => null,
    temporary,
    template
    // addActivitySubmission
  } = defaultProps;

  const {
    asyncUpdateCardTemplate,
    asyncCreateCard,
    asyncUpdateCard,
    asyncRemoveCard
  } = dispatcherProps;

  const createCard = (cardData: Card) =>
    asyncCreateCard({cardData, userEnvId}).then(() =>
      onCreateCard(cardData)
    );

  const updateCard = (cardData: Card) =>
    asyncUpdateCard({cardData, userEnvId}).then(() =>
      onUpdateCard(cardData)
    );

  const removeCard = () => asyncRemoveCard({cardId, userEnvId});
  const updateCardTemplate = (cardData: Card) => {
    asyncUpdateCardTemplate({cardData, userEnvId});
  };

  const onCardUpdate = (cardData: Card) => {
    if (template) updateCardTemplate(cardData);
    else if (!temporary) updateCard(cardData);
  };

  const db = DB(userEnvId);

  const filePath = `cards/${authorId}/${cardId}`;

  const removeFromStorage = (fileId: string) =>
    db.removeFileFromEnv({
      path: filePath,
      id: fileId
    });

  const addToStorage = ({file, id}: {file: File; id: string}) =>
    db.addFileToEnv({file, path: filePath, id});

  return {
    ...state,
    ...dispatcherProps,
    ...defaultProps,
    onCardUpdate,
    createCard,
    removeCard,
    addToStorage,
    updateCardTemplate,
    updateCard,
    removeFromStorage,
    onFlip
  };
};

interface EditCardType extends ConnectedEditCardType {
  // userEnvId: string;
  // id: string;
  flipped: boolean;
  routeToggleExtend: Function;
  onFlip: Function;
  // asyncRemoveActivitySub: Function;
  // fetchAuthorData: Function;
  authUser: AuthUser;
  userEnvId: string;
  addComment: Function;
  // uid: string;
  cards: Card[];
  topicDict: Topic[];
  onCreate?: Function;
  onClose?: Function;
}

const EditCard: React.FC<EditCardType> = props => {
  const {
    id,
    flipped,
    routeToggleExtend,
    removeCard,
    createCard,
    onCardUpdate,
    onFlip,
    toggleUserview,
    // fetchAuthorData,
    authUser,
    addComment,
    uid,
    cards,
    topicDict,
    userEnvId,
    onCreate,
    onClose
  } = props;

  return (
    <CardFrame
      key={id}
      flipped={flipped}
      className="flex flex-col flex-grow"
      front={
        <EditCardFront
          {...props}
          toggleUserview={toggleUserview}
          onClose={() => {
            routeToggleExtend();
            onClose && onClose();
          }}
          onFlip={onFlip}
          onRemove={() => {
            routeToggleExtend();
            removeCard(props.id);
          }}
          onCreate={(d: Card) => {
            routeToggleExtend();
            createCard({...d});
            onCreate && onCreate();
          }}
          onUpdate={(d: Card) => {
            onCardUpdate({...d});
          }}
        />
      }
      back={
        <CardBack
          userEnvId={userEnvId}
          uid={uid}
          addComment={addComment}
          authUser={authUser}
          cards={cards}
          {...props}
          id={id}
          onClose={() => {
            routeToggleExtend();
            onClose && onClose();
          }}
          onFlip={onFlip}
          topicDict={topicDict}
        />
      }
    />
  );
};

type ConnectedEditCardType = Card & {
  // userEnvId: string;
  createCard: (a: Card) => any;
  removeCard: (id: string) => any;
  onCardUpdate: (c: Card) => any;
  onFlip: Function;
  temporary?: boolean;
  userview: boolean;
  id: string;
  // fetchAuthorData: Function;
  authUser: AuthUser;
  cards: Card[];
  addComment: Function;
  topicDict: Topic[];
  template: boolean;
};

const ConnectedEditCard: React.FC<any> = props => {
  const {
    // createCard,
    //
    // removeCard,
    // onCardUpdate,
    // onFlip,
    // fetchAuthorData,
    // id,
    // userEnvId,
    uid,
    authUser,
    allActivitySubs,
    template,
    userview,
    id,
    removeCard,
    createCard,
    onFlip,
    loc,
    toggleUserview,
    userEnvId,
    asyncRemoveActivitySub,
    // fetchAuthorData,
    topicDict
  } = props;

  const {
    query: {flipped},
    routeToggleExtend
  } = useRouteParams();

  if (userview)
    return (
      <ConnectedCard
        {...props}
        userEnvId={userEnvId}
        flipped={flipped}
        routeToggleExtend={routeToggleExtend}
      />
    );

  if (template)
    return (
      <EditCard
        loc={loc}
        {...props}
        userEnvId={userEnvId}
        id={id}
        uid={uid}
        routeToggleExtend={routeToggleExtend}
        removeCard={removeCard}
        createCard={createCard}
        onFlip={onFlip}
        flipped={flipped}
        topicDict={topicDict}
      />
    );

  if (!allActivitySubs || allActivitySubs.length === 0)
    return (
      <EditCard
        {...props}
        userEnvId={userEnvId}
        loc={loc}
        id={id}
        uid={uid}
        authUser={authUser}
        routeToggleExtend={routeToggleExtend}
        removeCard={removeCard}
        createCard={createCard}
        onFlip={onFlip}
        flipped={flipped}
        topicDict={topicDict}
        removable
      />
    );

  return (
    <ReviewCard
      {...props}
      asyncRemoveActivitySub={asyncRemoveActivitySub}
      userEnvId={userEnvId}
      toggleUserview={toggleUserview}
      loc={loc}
      flipped={flipped}
      onClose={routeToggleExtend}
      authUser={authUser}
      routeToggleExtend={routeToggleExtend}
      removeCard={removeCard}
      createCard={createCard}
      onFlip={onFlip}
      topicDict={topicDict}
      removable
    />
  );
};

const composer: (
  a: React.FC<any>
) => React.ComponentClass<any> = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
);

export default composer(ConnectedEditCard);
