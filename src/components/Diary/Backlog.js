import React from 'react';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import { OneNotification } from '~/components/Notifications';
const Backlog = props => {
    const { style, onClick, notifications, open, cards, onCardClick } = props;
    const readNotifications = notifications.filter(d => d.read);
    return (React.createElement(FlexCollapsible, { header: React.createElement("div", { className: "truncate italic" }, "Notifications"), className: "overflow-hidden mb-3", open: open, onClick: onClick, style: style, footer: null },
        React.createElement("div", { className: "m-1 flex-grow flex items-center justify-center" },
            readNotifications.length === 0 && (React.createElement("div", { className: "text-4xl text-gray-600", style: { transform: 'rotate(45deg)' } }, "No Notifications!")),
            readNotifications.map(d => (React.createElement(OneNotification, Object.assign({}, d, { cards: cards, onClick: (c) => onCardClick(c.id) })))))));
};
export default Backlog;
