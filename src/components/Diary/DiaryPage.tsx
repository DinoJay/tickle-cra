import React, {useState, useEffect} from 'react';
// import AuthUser from '~/constants/authUserType';

import clsx from 'clsx';
import ConnectedCard from '~/components/cards/ConnectedCard';
// import Topic from '~/constants/topicType';
import Props from './Props';

import {Card} from '~/constants/cardFields';

import {BlackModal} from '~/components/utils/Modal';
import DefaultLayout from '~/components/DefaultLayout';

import useRouteParams from '~/Routes/useRouteParams';

import TabSlider from '~/components/utils/TabSlider';
import CardDiary from './CardDiary';

import SkillDiary from './SkillDiary';
import FriendsActivity from './FriendsActivity';

/** {
 * This Component displays all the cards the use has interfaced with.
 * This means submitted, rated, and bookmarked cards
 * TODO: filter options and testing in general
 * @param {cards} user cards
 */
// TODO because of redux connect
const DiaryPage: React.FC<Props> = (props: Props) => {
  const {
    cards,
    width,
    height,
    userEnvId,
    fetchCollectibleCards,
    fetchTopics,
    authUser,
    topicDict,
    updateAuthUser,
    match,
    location
  } = props;

  const {uid} = authUser;

  const ref = React.useRef<HTMLDivElement>(null);

  const {
    // routeId,
    setQuery,
    query: {id: selectedCardId, extended: cardExtended}
  } = useRouteParams();

  const routeCard = (id: string): void => {
    setQuery({extended: true, id});
  };

  const selectedCard = cards.find((c: Card) => c.id === selectedCardId);

  useEffect(() => {
    fetchCollectibleCards({uid, userEnvId});
  }, [userEnvId]);

  const [visibleTabIndex, setVisibleTabIndex] = useState(0);

  const filterByActivitySucceeded = (d: Card) =>
    d.activitySubmission && d.activitySubmission.succeeded;
  const ownedCards = cards.filter(filterByActivitySucceeded);
  // const openCards = cards.filter(
  //   (d: Card) =>
  //     !d.activitySubmission || !d.activitySubmission.succeeded
  // );

  // const smallLayout = width < 500;
  return (
    <DefaultLayout
      className="bg-gray-100 md:my-4 md:border-2"
      style={{maxHeight: null}}
      menu={
        <div className="ml-3 flex-grow flex items-center">
          <button
            className={clsx(
              'btn border-4 mr-2 p-1 md:p-2',
              visibleTabIndex === 0 && 'bg-gray-500 text-white'
            )}
            type="button"
            onClick={(): void => setVisibleTabIndex(0)}>
            Cards
          </button>
          <button
            className={clsx(
              'btn border-4 text-lg mr-2 px-6 p-1 px-2 md:py-2',
              visibleTabIndex === 1 && 'bg-gray-500 text-white'
            )}
            type="button"
            onClick={(): void => setVisibleTabIndex(1)}>
            XP
          </button>
          <button
            className={clsx(
              'btn border-4 text-lg p-1 md:p-2',
              visibleTabIndex === 2 && 'bg-gray-500 text-white'
            )}
            type="button"
            onClick={(): void => setVisibleTabIndex(2)}>
            Friends
          </button>
        </div>
      }>
      <BlackModal visible={cardExtended} zIndex={1000}>
        <ConnectedCard {...selectedCard} />
      </BlackModal>
      <div
        className="flex flex-col flex-grow md:px-24 overflow-hidden "
        ref={ref}>
        <TabSlider
          visibleIndex={visibleTabIndex}
          className="flex-grow flex flex-col"
          tabClassName="overflow-y-auto">
          <div key="1" className="flex-grow flex flex-col p-1">
            <CardDiary
              {...props}
              match={match}
              location={location}
              selectedCardId={selectedCardId}
              ownedCards={ownedCards}
              fetchTopics={fetchTopics}
              routeCard={routeCard}
            />
          </div>
          <div key="0" className="flex flex-grow flex-col p-3">
            <SkillDiary
              {...props}
              authUser={authUser}
              cards={cards}
              userEnvId={userEnvId}
              ownedCards={ownedCards}
              updateAuthUser={updateAuthUser}
              topicDict={topicDict}
              routeCard={routeCard}
            />
          </div>
          <div key="2" className="flex flex-col p-2">
            <FriendsActivity ownedCards={ownedCards} {...props} />
          </div>
        </TabSlider>
      </div>
    </DefaultLayout>
  );
};
export default DiaryPage;
