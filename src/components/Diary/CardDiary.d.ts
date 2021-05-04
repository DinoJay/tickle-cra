import React from 'react';
import Notification from '~/constants/notificationType';
import { RouterTypes } from '~/constants/typeUtils';
interface CardDiaryTypes {
    selectedCardId: string;
    routeCard: any;
    cards: any;
    ownedCards: any;
    authUser: any;
    fetchCollectibleCards: any;
    notifications: Notification[];
    width: number;
    fetchTopics: any;
}
declare const CardDiary: React.FC<CardDiaryTypes & RouterTypes>;
export default CardDiary;
