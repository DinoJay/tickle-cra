import React from 'react';
import Topic from '~/constants/topicType.ts';
import AuthUser from '~/constants/authUserType.ts';
import { Card } from '~/constants/cardFields';
declare const InterestMenu: React.FC<{
    className: string;
    cards: Card[];
    open: boolean;
    onClick: Function;
    allXpoints: number;
    topicDict: Topic[];
    authUser: AuthUser;
}>;
export default InterestMenu;
