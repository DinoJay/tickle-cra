import React from 'react';
import AuthUser from '~/constants/authUserType';
import Topic from '~/constants/topicType';
import { Card } from '~/constants/cardFields';
declare const CardBack: React.FC<{
    onFlip: Function;
    id: string;
    uid: string;
    onClose: Function;
    className?: Function;
    addComment: Function;
    userEnvId: string;
    authUser: AuthUser;
    cards: Card[];
    topicDict: Topic[];
    controls?: React.ReactNode;
}>;
export default CardBack;
