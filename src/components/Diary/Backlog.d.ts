import React from 'react';
import Notification from '~/constants/notificationType';
import { Card } from '~/constants/cardFields';
declare type BacklogType = {
    style: React.CSSProperties;
    onClick: Function;
    onCardClick: (id: string) => any;
    notifications: Notification[];
    open: boolean;
    cards: Card[];
};
declare const Backlog: React.FC<BacklogType>;
export default Backlog;
