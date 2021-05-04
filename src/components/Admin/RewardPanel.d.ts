import React from "react";
import Reward from "~/constants/rewardType";
interface RewardPanelProps {
    rewards: Reward[];
    userEnvId: string;
    updateReward: Function;
    removeReward: Function;
    fetchRewards: (a: string) => any;
    open: boolean;
    onClick: Function;
}
declare const RewardPanel: React.FC<RewardPanelProps>;
export default RewardPanel;
