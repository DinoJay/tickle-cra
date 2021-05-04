export default function rewardDb(userEnvStr: string): {
    doReadRewards: Function;
    doCreateReward: Function;
    doDeleteReward: Function;
};
