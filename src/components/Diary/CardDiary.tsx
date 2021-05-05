import React, { useState, useEffect } from 'react';
import { timeParse } from 'd3-time-format';

import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import PreviewCard from '~/components/cards/PreviewCard';

import FlexCollapsible from '~/components/utils/FlexCollapsible';
// import DetailsFrame from '~/components/utils/DetailsFrame';
// import PreviewTag from '~/components/utils/PreviewTag';
import UserEnv from '~/constants/userEnvType';
import { Card } from '~/constants/cardFields';
import Notification from '~/constants/notificationType';
import AuthUser from '~/constants/authUserType';
import Backlog from './Backlog';
import CardDistLine from './CardDistLine';
import CardTimeLine from './CardTimeLine';

import { RouterTypes } from '~/constants/typeUtils';
import RadioBtn from '~/components/utils/RadioBtn';
import UserEnvSelect from './UserEnvSelect';
import BubbleSetGrid from './BubbleSetGrid';
import DistCircle from './DistCircle';

const sortByDate = (cards: Card[]): Card[] =>
  cards.sort((a, b) => {
    if (
      (a.loc && a.loc.value && a.loc.value.startDateTime) ||
      (b.loc && b.loc.value && b.loc.value.startDateTime)
    ) {
      const parseTime = timeParse('%Y-%m-%dT%H:%M');

      const parsedAStartTime = parseTime(a.loc.value.startDateTime);
      const parsedBStartTime = parseTime(b.loc.value.startDateTime);
      if (!parsedAStartTime || !parsedBStartTime) return -1;

      if (parsedAStartTime > parsedBStartTime) {
        return 1;
      }
      if (parsedAStartTime < parsedBStartTime) {
        return -1;
      }

      return 0;
    }

    return -1;
  });

// TODO put in another function or file
const filterCardsOnTime = (card: Card) => {
  const parseTime = timeParse('%Y-%m-%dT%H:%M');

  // If card has a timeRange
  if (card.loc && card.loc.value && card.loc.value.startDateTime) {
    const parsedStartTime = parseTime(card.loc.value.startDateTime);
    if (!parsedStartTime) return false;
    const now = new Date();

    const inTime = now >= parsedStartTime;

    return inTime;
  }
  return true;
};

const CardGrid = props => {
  const { cards, onCardClick, selectedCardId } = props;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="flex-grow flex flex-wrap justify-center">
      {!cards.length && <div>No Cards</div>}
      {cards.map((d: Card) => (
        <AnimatePresence>
          <PreviewCard
            detail={false}
            key={d.id}
            className="preview-card-size m-1"
            onClick={() => onCardClick(d.id)}
            style={{
              transform: `scale(${d.id === selectedCardId ? 1.05 : 1})`,
              transition: 'transform 300ms'
            }}
            title={d.title?.value}
            img={d.img?.value}
          />
        </AnimatePresence>
      ))}
    </motion.div>
  );
};

const CardView: React.FC<{
  authUser: AuthUser;
  cards: Card[];
  collectedCards: Card[];
  onClick: Function;
  style: React.CSSProperties;
  open: boolean;
  onCardClick: Function;
  selectedCardId: string;
  className: string;
  userLocation?: any;
  width: number
}> = props => {
  const {
    authUser,
    cards,
    collectedCards,
    onClick,
    style,
    open,
    onCardClick,
    selectedCardId,
    userLocation,
    className,
    width
  } = props;

  const [collected, setCollected] = useState(false);

  const openCards = sortByDate(
    cards.filter(
      (c: Card) =>
        !collectedCards.map(d => d.id).includes(c.id) &&
        filterCardsOnTime(c)
    )
  );

  const filteredCards = collected ? collectedCards : openCards;

  const selectedCard = cards.find(c => c.id === selectedCardId);

  const [selected, setTimeLineSelected] = useState(true);

  const showGrid = !selected && !collected;

  return (
    <FlexCollapsible
      className={clsx(
        `flex flex-grow flex-col overflow-hidden `,
        className
        // open && smallLayout && 'mb-16'
      )}
      style={style}
      open={open}
      onClick={onClick}
      header={
        <div className="flex w-full justify-between items-center">
          <span className="italic">Cards</span>
          <form
            className={clsx('ml-auto flex p-1', !open && 'hidden')}
            onSubmit={e => e.preventDefault()}>
            <RadioBtn
              className="mr-1"
              onChange={() => setTimeLineSelected(!selected)}
              checked={selected}>
              {collected ? 'Time' : 'Distance'}
            </RadioBtn>
            <RadioBtn
              onChange={() => setTimeLineSelected(!selected)}
              checked={!selected}>
              Grid
            </RadioBtn>
          </form>
        </div>
      }
      footer={
        <div className="w-full flex">
          <div className="flex flex-grow text-base">
            <button
              type="button"
              className={clsx(
                'flex-grow btn mx-2 : void p-1 border-2',
                !collected && 'bg-gray-500 text-white'
              )}
              onClick={() => setCollected(false)}>
              Open ({openCards.length})
            </button>
            <button
              onClick={() => setCollected(true)}
              type="button"
              className={clsx(
                'flex-grow btn mx-2 p-1 border-2',
                collected && 'bg-gray-500 text-white'
              )}>
              Collected ({collectedCards.length})
            </button>
          </div>
        </div>
      }>
      {selected && collected && (
        <CardTimeLine
          key="CardTimeLine"
          authUser={authUser}
          userLocation={userLocation}
          cards={filteredCards}
          allCards={cards}
          onCardClick={onCardClick}
          selectedCardId={selectedCardId}
        />
      )}
      {selected && !collected && (
        <DistCircle {...props} onCardClick={onCardClick} />
      )}
      {!selected && (
        <BubbleSetGrid
          key={!collected}
          {...props}
          cards={filteredCards as any[]}
          onCardClick={onCardClick}
        />
      )}
    </FlexCollapsible>
  );
};

interface CardDiaryTypes {
  // numSeenCards,
  selectedCardId: string;
  routeCard: any;
  cards: any;
  ownedCards: any;
  authUser: any;
  fetchCollectibleCards: any;
  notifications: Notification[];
  width: number;
  // fetchNotifications,
  fetchTopics: any;
}
const CardDiary: React.FC<CardDiaryTypes & RouterTypes> = props => {
  const {
    selectedCardId,
    routeCard,
    cards,
    ownedCards,
    authUser,
    match,
    history,
    fetchCollectibleCards,
    fetchTopics,
    notifications,
    width
  } = props;

  const smallLayout = width < 500;
  // console.log('smallLayout', smallLayout);
  const { params } = match;
  const { userEnvId } = params;

  const { userEnvs, uid } = authUser;
  const selectedUserEnv: UserEnv | undefined = userEnvs.find(
    (u: UserEnv) => u.id === userEnvId
  );

  const ENV_TAB_ID = 'env';
  const CARD_TAB_ID = 'card';
  const BACKLOG_ID = 'backlog';
  const [tabId, setTabId] = useState<string | null>(CARD_TAB_ID);

  const toggleTab = (id: string): void =>
    tabId !== id ? setTabId(id) : setTabId(null);

  const flex = (tid: string): React.CSSProperties => ({
    flex: tabId === tid ? 1 : '0 1 auto'
  });

  useEffect(() => {
    fetchCollectibleCards({ uid, userEnvId });
    fetchTopics(userEnvId);
  }, [userEnvId]);

  const visible = tabId !== CARD_TAB_ID || !smallLayout;

  return (
    <div className="flex flex-grow flex-col overflow-hidden h-full pr-2 ">
      {visible && (
        <FlexCollapsible
          header={
            <div className="truncate italic">
              Env:{' '}
              <span className="italic">
                {selectedUserEnv && selectedUserEnv.name}
              </span>
            </div>
          }
          className="overflow-hidden mb-3 "
          open={tabId === ENV_TAB_ID}
          onClick={() => toggleTab(ENV_TAB_ID)}
          style={flex(ENV_TAB_ID)}
          footer={null}>
          <UserEnvSelect
            {...props}
            history={history}
            userEnvId={userEnvId}
            userEnvs={userEnvs}
            uid={uid}
          />
        </FlexCollapsible>
      )}
      <CardView
        {...props}
        className="mb-3"
        style={flex(CARD_TAB_ID)}
        open={tabId === CARD_TAB_ID}
        onClick={() => toggleTab(CARD_TAB_ID)}
        authUser={authUser}
        cards={cards}
        collectedCards={ownedCards}
        onCardClick={routeCard}
        selectedCardId={selectedCardId}
      />
      {visible && (
        <Backlog
          {...props}
          open={tabId === BACKLOG_ID}
          onClick={() => toggleTab(BACKLOG_ID)}
          notifications={notifications}
          onCardClick={routeCard}
          style={flex(BACKLOG_ID)}
          cards={cards}
        />
      )}
    </div>
  );
};

export default CardDiary;
