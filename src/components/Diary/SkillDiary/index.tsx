import React, { useState } from 'react';

import AuthUser from '~/constants/authUserType';
import { Card } from '~/constants/cardFields';
import UserEnv from '~/constants/userEnvType';
import Reward from '~/constants/rewardType';
import Topic from '~/constants/topicType';

import calcPoints from '~/components/utils/calcPoints';

import UserMenu from './UserMenu';
import Wallet from './Wallet';
import MetaActivities from './MetaActivities';

import InterestMenu from './InterestMenu';

const INTEREST_TAB_ID = 'INTEREST_TAB_ID';
const WALLET_TAB_ID = 'WALLET_TAB_ID';
const ACTIVITIES_TAB_ID = 'ACTIVITIES_TAB_ID';

const SkillDiary: React.FC<{
  authUser: AuthUser;
  cards: Card[];
  userEnvId: string;
  ownedCards: Card[];
  updateAuthUser: Function;
  topicDict: Topic[];
  routeCard: Function;
  locs: any[]
}> = props => {
  const {
    authUser,
    cards,
    userEnvId,
    ownedCards,
    updateAuthUser,
    topicDict
  } = props;

  const { userEnvs, rewardIds: ownedRewardIds = [] } = authUser;

  const [tabId, setTabId] = useState<string | null>(INTEREST_TAB_ID);

  const toggleTab = (id: string): void =>
    tabId !== id ? setTabId(id) : setTabId(null);

  const selectedUserEnv: UserEnv | undefined = userEnvs.find(
    u => u.id === userEnvId
  );
  const { rewards: allRewards } = selectedUserEnv || { rewards: [] };

  const ownedRewards: Reward[] = ownedRewardIds.reduce(
    (acc: Reward[], id) => {
      const r = allRewards.find(a => a.id === id);
      if (r) return [r, ...acc];
      return acc;
    },
    []
  );

  const allXpoints = calcPoints(cards);
  const xPoints = calcPoints(ownedCards, ownedRewards);

  return (
    <div className="flex flex-grow flex-col overflow-hidden h-full pr-2">
      <UserMenu
        {...props}
        updateAuthUser={updateAuthUser}
        open={tabId === null}
      />
      <InterestMenu
        {...props}
        topicDict={topicDict}
        className="mb-2"
        allXpoints={allXpoints}
        open={tabId === INTEREST_TAB_ID}
        onClick={() => toggleTab(INTEREST_TAB_ID)}
      />
      <Wallet
        {...props}
        allRewards={allRewards}
        className="mb-2"
        allXpoints={allXpoints}
        xPoints={xPoints}
        ownedRewards={ownedRewards}
        open={tabId === WALLET_TAB_ID}
        onClick={() => toggleTab(WALLET_TAB_ID)}
      />
      <MetaActivities
        {...props}
        className=""
        open={tabId === ACTIVITIES_TAB_ID}
        onClick={() => toggleTab(ACTIVITIES_TAB_ID)}
      />
    </div>
  );
};

export default SkillDiary;
