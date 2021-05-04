import React from 'react';
import AuthUser from '~/constants/authUserType';
import { Card } from '~/constants/cardFields';
import Topic from '~/constants/topicType';
declare const SkillDiary: React.FC<{
    authUser: AuthUser;
    cards: Card[];
    userEnvId: string;
    ownedCards: Card[];
    updateAuthUser: Function;
    topicDict: Topic[];
}>;
export default SkillDiary;
