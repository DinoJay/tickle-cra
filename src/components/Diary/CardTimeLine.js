import React, { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import MapIcon from 'react-feather/dist/icons/map';
import Layers from 'react-feather/dist/icons/layers';
import Plus from 'react-feather/dist/icons/plus';
import Minus from 'react-feather/dist/icons/minus';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import PreviewCard from '~/components/cards/PreviewCard';
import distanceLoc from '~/components/utils/distanceLoc';
import { avatarUrls } from '~/constants/avatars';
import { formatTime } from '~/components/utils/time';
import { Line, ArrowDown } from './LineArrow';
import SlideShow from './DiarySlideShow';
const LazyAnimation = ({ children, className }) => {
    const [ref, inView] = useInView({
        rootMargin: '-100px 0px'
    });
    const props = useSpring({ opacity: inView ? 1 : 0 });
    return (React.createElement(animated.div, { ref: ref, style: props, className: className }, children));
};
const TopicRecommendations = ({ id, cards, open, onCardClick, size, topics }) => {
    const getCards = idd => cards.filter(c => { var _a; return c.id !== id && !!((_a = c.topics.value) === null || _a === void 0 ? void 0 : _a.find(t => t.id === idd)); });
    return (React.createElement(motion.div, { className: "w-full overflow-hidden", animate: open
            ? { height: 'auto', opacity: 1 }
            : { height: 0, opacity: 0, display: 'none' }, transition: { duration: 0.4 }, exit: { height: 0 } },
        React.createElement("div", { className: "flex flex-col items-center justify-center" },
            React.createElement(Line, null),
            React.createElement("div", { className: "" }, "Topics"),
            React.createElement(ArrowDown, { className: "" })),
        React.createElement("div", { className: "flex p-1 flex-col mt-1 w-full justify-center" }, topics.map((d) => (React.createElement("div", { className: "flex justify-center flex-col w-full" },
            React.createElement("h3", { className: "text-base text-center" }, d.title),
            getCards(d.id).length !== 0 && (React.createElement(SlideShow, { size: size, cards: getCards(d.id), onCardClick: onCardClick }))))))));
};
const DistRecommendations = ({ id, onClick, selected, allCards, location, open, size }) => {
    const dists = allCards.map(c => ({
        ...c,
        dist: calcDist(c.loc.value, location)
    }));
    const cards = dists.filter(c => c.dist > 0 && c.dist < 1);
    return (React.createElement(motion.div, { className: "w-full", key: id, initial: { opacity: 0 }, animate: open
            ? { opacity: 1, height: 'auto' }
            : { opacity: 0, height: 0, display: 'none' }, transition: { duration: 0.4 }, exit: { opacity: 0 } },
        React.createElement("div", { className: "flex flex-col items-center justify-center" },
            React.createElement(Line, null),
            React.createElement("div", { className: "" }, "Cards in proximity"),
            React.createElement(ArrowDown, { className: "" })),
        React.createElement(SlideShow, { cards: cards, size: size })));
};
const calcDist = (loc0, loc1) => +(distanceLoc(loc0, loc1) / 1000).toFixed(2);
const WP = props => {
    const { selected, onCardClick, title, img, topics, allCards, size } = props;
    const [ext, setExt] = useState(null);
    const btnClass = 'shadow-md ml-2 mt-1 flex justify-center items-center text-white rounded-full p-1';
    const TOPICS = 'topics';
    const DIST = 'dist';
    return (React.createElement(motion.div, { layoutTransition: true, className: "flex flex-col items-center w-full" },
        React.createElement(motion.div, { layoutTransition: true, className: "relative" },
            React.createElement(PreviewCard, { className: "m-1 ", onClick: () => setExt(!ext), style: {
                    minWidth: `${size}rem`,
                    width: `${size}rem`,
                    height: `${size}rem`,
                    // minWidth: '5rem',
                    // height: '5rem',
                    transform: `scale(${selected ? 1.05 : 1})`,
                    // transformOrigin: d.id === selectedCardId && null ,
                    transition: 'transform 300ms'
                }, title: title, img: img }),
            React.createElement(motion.div, { className: "absolute right-0 top-0 flex flex-col justify-center h-full", style: { transform: 'translate(100%)' } },
                React.createElement("button", { type: "button", className: clsx(btnClass, ext === TOPICS ? 'bg-black' : 'bg-gray-500'), onClick: () => setExt(ext !== 'topics' ? 'topics' : null) },
                    React.createElement(Layers, { size: 30 })),
                React.createElement("button", { type: "button", className: clsx(btnClass, ext === DIST ? 'bg-black' : 'bg-gray-500'), onClick: () => setExt(ext !== 'dist' ? 'dist' : null) },
                    React.createElement(MapIcon, { size: 25 })))),
        React.createElement(DistRecommendations, Object.assign({ open: ext === DIST }, props, { cards: allCards, size: size, key: "yeah" })),
        React.createElement(TopicRecommendations, Object.assign({ open: ext === TOPICS }, props, { cards: allCards, key: "yeah1" }))));
};
const CardTimeLine = props => {
    const { cards, onCardClick, selectedCardId, authUser, userLocation } = props;
    const createdDate = new Date(authUser.created);
    const waypoints = cards.map((c, i) => {
        const date1 = i !== cards.length - 1
            ? cards[i + 1].activitySubmission.date.toDate()
            : null;
        const date0 = c.activitySubmission.date.toDate();
        const distance = date1 ? Math.abs(date1 - date0) / 1000 : null;
        return {
            ...c,
            distance,
            date: date0,
            submissionDateStr: formatTime(date0)
        };
    });
    const userDistance = waypoints.length
        ? calcDist(userLocation, waypoints[0].loc.value)
        : null;
    const [size, setSize] = useState(7);
    const scale = scaleLinear()
        .domain(extent(waypoints, d => d.distance))
        .range([60, 200 - 300 / size]);
    // console.log
    // const cropLineHeight = (distance: number) => {
    //   const dist = distance / 100000;
    //
    //   const ret = Math.max(100, dist);
    //   console.log('height', ret, 'distnce', distance);
    //   return ret;
    // };
    return (React.createElement(motion.div, { exit: { opacity: 0 }, className: "w-full flex-grow flex flex-col items-center overflow-y-auto" },
        React.createElement("div", { className: "absolute left-0" },
            React.createElement("button", { type: "button", onClick: () => setSize(size + 1) },
                React.createElement(Plus, null)),
            React.createElement("button", { type: "button", onClick: () => setSize(size - 1) },
                React.createElement(Minus, null))),
        cards.length === 0 && React.createElement("div", null, "No Cards"),
        cards.length > 0 && (React.createElement(React.Fragment, null,
            React.createElement("img", { className: "shadow-lg", style: { width: `${size}rem`, minHeight: `${size}rem` }, alt: "usr", src: avatarUrls[authUser.avatar] }),
            React.createElement(motion.div, { positionTransition: true, className: "flex flex-col items-center" },
                React.createElement(Line, null),
                React.createElement("div", { className: "" }, "25/10/2019"),
                React.createElement(ArrowDown, null)))),
        waypoints.map((d) => {
            var _a, _b, _c;
            return (React.createElement("div", { key: d.id, className: "w-full" },
                React.createElement(WP, Object.assign({}, props, { size: size, onCardClick: onCardClick, selected: d.id === selectedCardId, topics: ((_a = d.topics) === null || _a === void 0 ? void 0 : _a.value) || [], title: (_b = d.title) === null || _b === void 0 ? void 0 : _b.value, location: d.loc.value, id: d.id, img: (_c = d.img) === null || _c === void 0 ? void 0 : _c.value })),
                d.distance && (React.createElement(motion.div, { exit: { opacity: 0 }, layoutTransition: true, key: `${d.id}kas`, className: "flex flex-col items-center " },
                    React.createElement(Line, { height: scale(d.distance) / 2 }),
                    React.createElement("div", { className: "" }, d.submissionDateStr),
                    React.createElement(ArrowDown, { height: scale(d.distance) / 2 })))));
        })));
};
export default CardTimeLine;
