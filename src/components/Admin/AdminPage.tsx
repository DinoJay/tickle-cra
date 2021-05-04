import React, { useState, useEffect } from 'react';

import { Card, TEMP_ID } from '~/constants/cardFields';
import { User } from '~/constants/userFields';

import useRouteParams from '~/Routes/useRouteParams';
import DefaultLayout from '~/components/DefaultLayout';
import UserPanel from './UserPanel';
import TopicPanel from './TopicPanel';
import EnvPanel from './EnvPanel';
import CardPanel from './CardPanel';
import MapPanel from './MapPanel/MapPanel';
import RewardPanel from './RewardPanel';

import ConnectedEditCard from '~/components/cards/ConnectedEditCard';
import UserEnv from '~/constants/userEnvType';
import Event from '~/constants/eventType';
import AuthUser from '~/constants/authUserType';

import { BlackModal } from '~/components/utils/Modal';

import css from './AdminPage.scss';
import {
  UpdateRewardType,
  RemoveRewardType,
  FetchRewardsType,
  UpdateTopicType,
  RemoveTopicType
} from 'reducers/Cards/async_actions';
import Topic from 'constants/topicType';
import Reward from 'constants/rewardType';

const AdminPage: React.FC<{
  updateReward: UpdateRewardType;
  removeReward: RemoveRewardType;
  fetchRewards: FetchRewardsType;
  // fetchTopics,
  updateTopic: UpdateTopicType;
  removeTopic: RemoveTopicType;
  userEnvId: string;
  fetchUsers: () => User[];
  cards: Card[];
  templateCard: Card;
  fetchTopics: (userEnv: string) => any;
  height: number;
  fetchAllEnvs: () => UserEnv[];
  addUser: Function;
  updateUser: Function;
  selectUser: Function;
  envs: UserEnv[];
  users: User[];
  events: Event[];
  fetchAllUserEvents: Function;
  registerUserToEnv: Function;
  removeUserFromEnv: Function;
  width: number;
  updateAuthUser: Function;
  authUser: AuthUser;
  asyncUpdateCard: ({
    cardData,
    userEnvId
  }: {
    cardData: Card;
    userEnvId: string;
  }) => any;
  userLocation: { latitude: number; longitude: number };
  fetchAllCardsWithSubmissions: (userEnvId: string) => any;
  fetchCardTemplates: (userEnvId: string) => any;
  createEnv: (u: UserEnv) => any;
  removeEnv: (s: string) => any;
  changeUserEnv: (u: UserEnv) => any;
  topicDict: Topic[];
  rewards: Reward[];
}> = props => {
  const {
    updateReward,
    removeReward,
    fetchRewards,
    // fetchTopics,
    updateTopic,
    removeTopic,
    // urlConfig,
    userEnvId,
    fetchUsers,
    cards,
    templateCard,
    fetchTopics,
    height,
    fetchAllEnvs,
    addUser,
    updateUser,
    selectUser,
    envs,
    asyncUpdateCard,
    userLocation,
    fetchAllCardsWithSubmissions,
    fetchCardTemplates,
    rewards,
    topicDict,
    createEnv,
    removeEnv,
    changeUserEnv
  } = props;

  const [leftTabId, setLeftTabId] = useState<string | null>(null);
  const toggleTabId = (tid: string) =>
    setLeftTabId(tid === leftTabId ? null : tid);

  const {
    query: { id: selectedCardId, extended },
    routeFlip,
    setQuery
  } = useRouteParams();

  const routeSelectExtend = (id: string) =>
    setQuery({ id, extended: true });

  const selectedCard = [...cards, templateCard].find(
    c => c.id === selectedCardId
  );

  const tabHeight = (height * 2) / 3;

  const contentStyle = { maxHeight: tabHeight };

  useEffect(() => {
    fetchUsers();
    fetchAllEnvs();
  }, []);

  useEffect(() => {
    // fetchTopics(userEnvId);
    // fetchUserIdsFromEnv(userEnvId);
  }, [userEnvId]);

  const ENV_PANEL = 'ENV_PANEL';
  const TOPIC_PANEL = 'TOPIC_PANEL';
  const REWARD_PANEL = 'REWARD_PANEL';
  const USER_PANEL = 'USER_PANEL';
  // const SOFT_SKILL_PANEL = 'SOFT_SKILL_PANEL';
  const CARD_PANEL = 'TEMPLATE_CARD_PANEL';
  const MAP_PANEL = 'MAP_PANEL';
  // const BOOKWIDGET_PANEL = 'BOOKWIDGET_PANEL';

  const leftPanelOpen = (tid: string) => leftTabId === tid;
  const [userview, setUserview] = useState(false);

  return (
    <DefaultLayout
      className="admin-container"
      menu={
        <div className="flex justify-center w-full">
          <h1>Admin</h1>
        </div>
      }>
      <div className={`overflow-y-auto p-2 lg:p-10 ${css.grid}`}>
        <div className="mb-3 md:mb-3" style={{ transition: 'all 300ms' }}>
          <EnvPanel
            {...props}
            createEnv={createEnv}
            removeEnv={removeEnv}
            changeUserEnv={changeUserEnv}
            open={leftPanelOpen(ENV_PANEL)}
            onClick={() => toggleTabId(ENV_PANEL)}
          />
        </div>
        <div key={REWARD_PANEL} className="mb-3 md:mb-3">
          <RewardPanel
            key={REWARD_PANEL}
            {...props}
            open={leftPanelOpen(REWARD_PANEL)}
            onClick={() => toggleTabId(REWARD_PANEL)}
            rewards={rewards}
            updateReward={updateReward}
            removeReward={removeReward}
            fetchRewards={fetchRewards}
          />
        </div>
        <div key={TOPIC_PANEL} className="mb-3 md:mb-3">
          <TopicPanel
            {...props}
            key={TOPIC_PANEL}
            open={leftPanelOpen(TOPIC_PANEL)}
            onClick={() => toggleTabId(TOPIC_PANEL)}
            topicDict={topicDict}
            fetchTopics={fetchTopics}
            updateTopic={updateTopic}
            removeTopic={removeTopic}
          />
        </div>
        <div key={MAP_PANEL} className="mb-3 md:mb-3">
          <MapPanel
            {...props}
            userLocation={userLocation}
            asyncUpdateCard={asyncUpdateCard}
            envs={envs}
            onClick={() => toggleTabId(MAP_PANEL)}
            routeSelectExtend={routeSelectExtend}
            key={userEnvId}
            open={leftPanelOpen(MAP_PANEL)}
            style={{ height: 500 }}
          />
        </div>
        <div key={USER_PANEL} className="mb-3 md:mb-3">
          <UserPanel
            {...props}
            envs={envs}
            addUser={addUser}
            updateUser={updateUser}
            selectUser={selectUser}
            open={leftPanelOpen(USER_PANEL)}
            onClick={() => toggleTabId(USER_PANEL)}
          />
        </div>
        <div key={CARD_PANEL} className="mb-3 md:mb-3">
          <CardPanel
            {...props}
            cards={cards}
            fetchAllCardsWithSubmissions={fetchAllCardsWithSubmissions}
            fetchCardTemplates={fetchCardTemplates}
            onClick={() => toggleTabId(CARD_PANEL)}
            open={leftPanelOpen(CARD_PANEL)}
            routeSelectExtend={routeSelectExtend}
            style={contentStyle}
          />
        </div>
      </div>

      {selectedCardId && (
        <BlackModal className="flex-grow m-auto" visible={extended}>
          <ConnectedEditCard
            {...props}
            userview={userview}
            toggleUserview={() => setUserview(!userview)}
            template={selectedCardId === TEMP_ID}
            temporary={!selectedCard}
            onFlip={routeFlip}
            key={`${selectedCardId} ${userEnvId}`}
            {...selectedCard}
          />
        </BlackModal>
      )}
    </DefaultLayout>
  );
};

export default AdminPage;
