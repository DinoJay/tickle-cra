import React from 'react';
import Notification from '~/constants/notificationType';
import { Card } from '~/constants/cardFields';
export declare const OneNotification: React.FC<{
    message?: string;
    dateStr?: string;
    meta: string;
    read: boolean;
    onClose?: Function;
    onClick?: Function;
    cardId: string;
    cards: Card[];
}>;
interface NotificationsPanelProps {
    notifications: Notification[];
    markAsRead: (a: string, b: Notification) => void;
    userId: string;
    cards: Card[];
    onClick: Function;
}
declare const NotificationsPanel: React.FC<NotificationsPanelProps>;
export default NotificationsPanel;
