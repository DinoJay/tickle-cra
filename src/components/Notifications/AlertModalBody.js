import React, { useState } from "react";
// import pose, {PoseGroup} from 'react-pose';
import clsx from 'clsx';
import { ModalBody } from '~/components/utils/Modal';
// import NotificationPreview from './NotificationPreview';
import { OneNotification } from "./index";
const AlertModalBody = props => {
    const { onClose, 
    // onSelect,
    notifications, cards, onClick
    // authUser,
    // asyncMarkNotificationAsSeen
     } = props;
    const firstNotification = notifications[0];
    const [isOpen, setIsOpen] = useState(false);
    // console.log('notifications len', notifications.length - 1);
    return (React.createElement(ModalBody, { footerClassName: "border-t-4 border-yellow-500", style: { transition: "all 400ms" }, title: "Notifications", onClose: onClose, footer: notifications.length > 1 && (React.createElement("button", { className: clsx('btn border-4 p-1 md:p-2 '), type: "button", onClick: () => setIsOpen(!isOpen) }, isOpen
            ? 'Minder...'
            : `${notifications.length - 1} notificatie(s)`)) },
        React.createElement(OneNotification, Object.assign({}, firstNotification, props)),
        isOpen &&
            notifications
                .slice(1)
                .map((n) => (React.createElement(OneNotification, Object.assign({}, n, { cards: cards }, props, { key: n.id, onClick: onClick }))))));
};
export default AlertModalBody;
