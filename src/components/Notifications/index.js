import React from 'react';
import { timeFormat } from 'd3-time-format';
import X from 'react-feather/dist/icons/x';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import PreviewCard from '~/components/cards/PreviewCard';
export const OneNotification = props => {
    const { 
    // title,
    onClick, cardId, message, dateStr, meta, read, onClose, cards } = props;
    const card = cards.find(c => c.id === cardId);
    if (!card)
        return null; // <div>Error card in notification not found</div>;
    return (React.createElement(motion.div, { exit: { opacity: 0 }, positionTransition: true, className: clsx('border-b-2 flex-shrink-0 border-yellow-500 p-2 ', !read && 'font-bold') },
        React.createElement("div", { className: "w-full" },
            React.createElement("div", { className: "flex justify-between" },
                React.createElement(PreviewCard, { onClick: () => onClick && onClick(card), title: card.title && card.title.value, img: card.img && card.img.value, className: "w-24 flex-shrink-0" }),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("p", { className: "text-sm ml-2 text-gray-500" }, message && message)),
                onClose && (React.createElement("button", { type: "button", className: "m-1 h-8", onClick: () => onClose() },
                    React.createElement(X, null)))),
            React.createElement("div", { className: "flex justify-between" },
                React.createElement("p", { className: "text-xs text-gray-500 mt-2" }, meta),
                dateStr && (React.createElement("p", { className: "text-xs text-gray-500 mt-2" }, dateStr))))));
};
const compare = (a, b) => a.created && b.created && a.created.toDate() < b.created.toDate()
    ? 1
    : -1;
const NotificationsPanel = props => {
    const { notifications, markAsRead, userId, cards, onClick } = props;
    const formatDate = timeFormat('%a, %H:%M');
    // const unreadNotifications = notifications.filter(
    //   (un: Notification) => !un.read
    // );
    return (React.createElement("div", { className: "flex flex-col h-64 overflow-auto" },
        notifications.length === 0 && React.createElement("p", null, "No new notifications"),
        notifications.sort(compare).map(n => {
            var _a;
            return (React.createElement(AnimatePresence, null,
                React.createElement(OneNotification, { key: n.cardId, cards: cards, cardId: n.cardId, meta: n.meta, read: n.read, onClose: () => {
                        markAsRead(userId, n);
                    }, onClick: onClick, message: n.message, dateStr: ((_a = n.created) === null || _a === void 0 ? void 0 : _a.toDate) && formatDate(n.created.toDate()) })));
        })));
};
export default NotificationsPanel;
