import React, { useState } from 'react';
import clsx from 'clsx';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import PreviewCard from '~/components/cards/PreviewCard';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import CardActivity from './CardActivity';
import MovementActivity from './MovementActivity';
const Activities = props => {
    const { open, onClick, style, routeCard } = props;
    const [selected, setSelected] = useState(false);
    const [selectedCards, setSelectedCards] = useState(null);
    return (React.createElement(React.Fragment, null,
        React.createElement(FlexCollapsible, { header: "Activity", className: "w-full overflow-hidden ", open: open, onClick: onClick, style: style, footer: React.createElement("div", { className: "flex flex-grow text-base" },
                React.createElement("button", { type: "button", className: clsx('btn flex-grow', selected && 'bg-gray-500 text-white'), onClick: () => setSelected(true) }, "Movement"),
                React.createElement("button", { type: "button", className: clsx('btn flex-grow', !selected && 'bg-gray-500 text-white'), onClick: () => setSelected(false) }, "Challenges")) }, !selected ? (React.createElement(CardActivity, Object.assign({}, props, { onClick: setSelectedCards }))) : (React.createElement(MovementActivity, Object.assign({}, props)))),
        React.createElement(BlackModal, { visible: !!selectedCards },
            React.createElement(ModalBody, { className: "", onClose: () => setSelectedCards(null), title: selectedCards &&
                    selectedCards.every(a => a.activitySubmission && a.activitySubmission.succeeded)
                    ? 'Succeeded Cards'
                    : 'Started Cards' },
                React.createElement("div", { className: "flex justify-center flex-wrap flex-grow" }, selectedCards !== null &&
                    selectedCards.map(d => (React.createElement(PreviewCard, { onClick: () => routeCard(d.id), className: "mr-2 mb-2", key: d.id, img: d.img && d.img.value, title: d.title && d.title.value }))))))));
};
export default Activities;
