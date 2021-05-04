import React from 'react';
import AuthUser from '~/constants/authUserType';
import Notification from '~/constants/notificationType';
import { Card } from '~/constants/cardFields';
interface NotifyMenuProps {
    notifications: Notification[];
    authUser: AuthUser;
    asyncMarkNotificationAsRead: (a: string, b: Notification) => void;
    userEnvId: string;
    onToggle: (a: boolean) => void;
    open: boolean;
    disabled: boolean;
    cards: Card[];
    onClick: Function;
    width: number;
}
declare const NotifyMenu: React.FC<NotifyMenuProps>;
export default NotifyMenu;
