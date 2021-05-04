import React, { useEffect } from "react";
import Plus from "react-feather/dist/icons/plus";
import Minus from "react-feather/dist/icons/minus";

import ElementPanel from "./ElementPanel";
import Reward from "constants/rewardType";

interface IncrementPointsProps {
  points: number | undefined;
  onClick: Function;
}

const IncrementPoints: React.FC<IncrementPointsProps> = props => {
  const { points = 10, onClick } = props;
  return (
    <div className="flex items-center mb-2">
      <div className="mr-auto text-xl">{points}</div>

      <div className="flex">
        <button
          type="button"
          className="btn bg-yellow-500"
          onClick={() => onClick(Math.max(0, points - 10))}
        >
          <Minus color="white" />
        </button>
        <button
          type="button"
          className="btn bg-green-500"
          onClick={() => onClick(Math.min(100, points + 10))}
        >
          <Plus color="white" />
        </button>
      </div>
    </div>
  );
};

interface RewardPanelProps {
  rewards: Reward[];
  userEnvId: string;
  updateReward: Function;
  removeReward: Function;
  fetchRewards: (a: string) => any;
  open: boolean;
  onClick: Function;
}

const RewardPanel: React.FC<RewardPanelProps> = props => {
  const {
    rewards = [],
    userEnvId,
    updateReward,
    removeReward,
    fetchRewards,
    open,
    onClick
  } = props;

  const onSubmitReward = (reward: number) => updateReward(reward, userEnvId);
  const onRemoveReward = (rewardId: string) =>
    removeReward(rewardId, userEnvId);

  useEffect(() => {
    fetchRewards(userEnvId);
  }, [userEnvId]);

  return (
    <ElementPanel
      {...props}
      className=""
      title="Rewards"
      elementTitle="Reward"
      data={rewards}
      removable={() => true}
      onClick={() => onClick()}
      open={open}
      onSubmitElement={onSubmitReward}
      onRemoveElement={onRemoveReward}
      extendForm={(datum, setDatum) => (
        <div className="mt-3 w-full">
          <h3>Points:</h3>
          <IncrementPoints
            points={(datum as Reward).points}
            onClick={(ps: any) => (setDatum as Function)({ points: ps })}
          />
        </div>
      )}
    />
  );
};

export default RewardPanel;
