import React from 'react';
import Reward from '~/constants/rewardType';
import AuthUser from '~/constants/authUserType';
declare const Wallet: React.SFC<{
    open: boolean;
    allRewards: Reward[];
    onClick: Function;
    style?: React.CSSProperties;
    authUser: AuthUser;
    updateAuthUser: Function;
    ownedRewards: Reward[];
    xPoints: number;
    allXpoints: number;
    className?: string;
}>;
export default Wallet;
