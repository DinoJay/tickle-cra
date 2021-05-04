import React from "react";
import { Card } from '~/constants/cardFields';
import Notification from '~/constants/notificationType';
declare type AlertModalBodyProps = {
    onClose: (id: string) => any;
    onSelect: (id: string) => any;
    notifications: Notification[];
    cards: Card[];
    onClick: Function;
};
declare const AlertModalBody: React.FC<AlertModalBodyProps>;
export default AlertModalBody;
