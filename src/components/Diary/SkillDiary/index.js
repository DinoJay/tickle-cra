import React, { useState } from 'react';
import calcPoints from '~/components/utils/calcPoints';
import UserMenu from './UserMenu';
import Wallet from './Wallet';
import MetaActivities from './MetaActivities';
import InterestMenu from './InterestMenu';
const INTEREST_TAB_ID = 'INTEREST_TAB_ID';
const WALLET_TAB_ID = 'WALLET_TAB_ID';
const ACTIVITIES_TAB_ID = 'ACTIVITIES_TAB_ID';
const SkillDiary = props => {
    const { authUser, cards, userEnvId, ownedCards, updateAuthUser, topicDict } = props;
    const { userEnvs, rewardIds: ownedRewardIds = [] } = authUser;
    const [tabId, setTabId] = useState(INTEREST_TAB_ID);
    const toggleTab = (id) => tabId !== id ? setTabId(id) : setTabId(null);
    const selectedUserEnv = userEnvs.find(u => u.id === userEnvId);
    const { rewards: allRewards } = selectedUserEnv || { rewards: [] };
    const ownedRewards = ownedRewardIds.reduce((acc, id) => {
        const r = allRewards.find(a => a.id === id);
        if (r)
            return [r, ...acc];
        return acc;
    }, []);
    const allXpoints = calcPoints(cards);
    const xPoints = calcPoints(ownedCards, ownedRewards);
    return (React.createElement("div", { className: "flex flex-grow flex-col overflow-hidden h-full pr-2" },
        React.createElement(UserMenu, Object.assign({}, props, { updateAuthUser: updateAuthUser, open: tabId === null })),
        React.createElement(InterestMenu, Object.assign({}, props, { topicDict: topicDict, className: "mb-2", allXpoints: allXpoints, open: tabId === INTEREST_TAB_ID, onClick: () => toggleTab(INTEREST_TAB_ID) })),
        React.createElement(Wallet, Object.assign({}, props, { allRewards: allRewards, className: "mb-2", allXpoints: allXpoints, xPoints: xPoints, ownedRewards: ownedRewards, open: tabId === WALLET_TAB_ID, onClick: () => toggleTab(WALLET_TAB_ID) })),
        React.createElement(MetaActivities, Object.assign({}, props, { className: "", open: tabId === ACTIVITIES_TAB_ID, onClick: () => toggleTab(ACTIVITIES_TAB_ID) }))));
};
export default SkillDiary;
