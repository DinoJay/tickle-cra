import React from 'react';
import CloseIcon from 'react-feather/dist/icons/x';
import PreviewCard from '~/components/cards/PreviewCard';
const NotificationPreview = props => {
    const { cardId, preview, msg, caption, title, onClose, onSelect, id } = props;
    return (React.createElement("div", { className: "flex my-3" },
        React.createElement("div", { className: "flex flex-row flex-grow" },
            React.createElement("div", { className: "flex mr-5" },
                React.createElement(PreviewCard, { className: "h-full w-full", title: " ", img: preview, style: { height: '5rem', width: '5rem' }, onClick: () => {
                        onSelect(cardId);
                        onClose(id);
                    } })),
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("div", { className: "flex items-start text-gray-400" },
                    React.createElement("p", null, title)),
                React.createElement("div", { className: "flex items-start" },
                    React.createElement("p", null, msg)))),
        React.createElement("div", { className: "flex items-end text-gray-400" },
            React.createElement("p", null, caption)),
        onClose && (React.createElement("button", { className: "flex justify-end", type: "button", onClick: () => {
                onClose(id);
            } },
            React.createElement(CloseIcon, null)))));
};
export default NotificationPreview;
