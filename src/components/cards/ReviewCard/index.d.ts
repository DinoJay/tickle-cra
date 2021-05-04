import React from 'react';
import { Card } from '~/constants/cardFields';
import AuthUser from '~/constants/authUserType';
interface ReviewCardType extends Card {
    id: string;
    flipped: boolean;
    authUser: AuthUser;
    routeToggleExtend: Function;
    removeCard: (a: string) => any;
    createCard: (c: Card) => any;
    toggleUserview: Function;
    onCardUpdate: (c: Card) => any;
    asyncRemoveActivitySub: Function;
    userEnvId: string;
}
declare const ReviewCard: React.FC<ReviewCardType>;
export default ReviewCard;
