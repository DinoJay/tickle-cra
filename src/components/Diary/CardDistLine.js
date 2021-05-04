import React, { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Layers from 'react-feather/dist/icons/layers';
import PreviewCard from '~/components/cards/PreviewCard';
import distanceLoc from '~/components/utils/distanceLoc';
import { avatarUrls } from '~/constants/avatars';
import { Line, ArrowDown } from './LineArrow';
import SlideShow from './DiarySlideShow';
const WP = props => {
    const { selected, cards, id, onCardClick, title, img, topics } = props;
    const [ext, setExt] = useState(false);
    const getCards = idd => cards.filter(c => { var _a; return c.id !== id && !!((_a = c.topics.value) === null || _a === void 0 ? void 0 : _a.find(t => t.id === idd)); });
    return (React.createElement(motion.div, { layoutTransition: true, className: "flex flex-col justify-center items-center w-full" },
        React.createElement("div", { className: "relative" },
            React.createElement(PreviewCard, { onClick: () => onCardClick(id), key: title, className: "preview-card-size m-1 ", style: {
                    transform: `scale(${selected ? 1.05 : 1})`,
                    // transformOrigin: d.id === selectedCardId && null ,
                    transition: 'transform 300ms'
                }, title: title, img: img }),
            React.createElement("div", { className: "absolute flex items-center right-0 top-0 h-full", style: { transform: 'translate(100%)' } },
                React.createElement("button", { type: "button", onClick: () => setExt(!ext), className: clsx('btn rounded-full p-1 bottom-0 right-0 z-10 m-2', !ext ? 'bg-gray-500' : 'bg-black') },
                    React.createElement(Layers, { className: "text-white", size: 30 })))),
        ext && topics.length !== 0 && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flex flex-col items-center justify-center" },
                React.createElement(Line, null),
                React.createElement("div", { className: "" }, "Topics"),
                React.createElement(ArrowDown, { className: "" })),
            React.createElement("div", { className: " flex p-1 bg-gray-300 w-full justify-center" }, topics.map((d) => (React.createElement("div", { className: "flex justify-center flex-col" },
                React.createElement("h3", { className: "text-base text-center" }, d.title),
                getCards(d.id).length !== 0 && (React.createElement(SlideShow, { cards: getCards(d.id), onCardClick: onCardClick }))))))))));
};
const CardTimeLine = props => {
    const { cards, onCardClick, selectedCardId, authUser, userLocation } = props;
    const calcDist = (loc0, loc1) => Math.round(distanceLoc(loc0, loc1) / 1000).toFixed(2);
    const waypoints = cards.map((c, i) => {
        const loc1 = i !== cards.length - 1 ? cards[i + 1].loc.value : null;
        const loc0 = c.loc.value;
        const distance = loc1 ? calcDist(loc0, loc1) : null;
        return { ...c, distance };
    });
    const userDistance = waypoints.length
        ? calcDist(userLocation, waypoints[0].loc.value)
        : null;
    return (React.createElement(motion.div, { exit: { opacity: 0 }, className: "flex-grow flex flex-col items-center" },
        !cards.length && React.createElement("div", null, "No Cards"),
        React.createElement("img", { className: "w-32", alt: "usr", src: avatarUrls[authUser.avatar] }),
        React.createElement(motion.div, { layoutTransition: true, className: "" },
            React.createElement(Line, null),
            React.createElement("div", { className: "w-0" },
                userDistance,
                "km"),
            React.createElement(ArrowDown, null)),
        waypoints.map((d) => {
            var _a, _b, _c;
            return (React.createElement(React.Fragment, null,
                React.createElement(WP, Object.assign({}, props, { key: d.id, onCardClick: onCardClick, selected: d.id === selectedCardId, id: d.id, title: (_a = d.title) === null || _a === void 0 ? void 0 : _a.value, topics: ((_b = d.topics) === null || _b === void 0 ? void 0 : _b.value) || [], img: (_c = d.img) === null || _c === void 0 ? void 0 : _c.value })),
                d.distance && (React.createElement(motion.div, { layoutTransition: true, className: "" },
                    React.createElement(Line, null),
                    React.createElement("div", { className: "w-0" },
                        d.distance,
                        "km"),
                    React.createElement(ArrowDown, { height: Math.min(140, Math.max(40, d.distance / 10)) })))));
        })));
};
export default CardTimeLine;
