import React, { useState, useEffect } from 'react';
import { timeParse } from 'd3-time-format';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import PreviewCard from '~/components/cards/PreviewCard';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import Backlog from './Backlog';
import CardTimeLine from './CardTimeLine';
import RadioBtn from '~/components/utils/RadioBtn';
import UserEnvSelect from './UserEnvSelect';
import BubbleSetGrid from './BubbleSetGrid';
import DistCircle from './DistCircle';
const sortByDate = (cards) => cards.sort((a, b) => {
    if ((a.loc && a.loc.value && a.loc.value.startDateTime) ||
        (b.loc && b.loc.value && b.loc.value.startDateTime)) {
        const parseTime = timeParse('%Y-%m-%dT%H:%M');
        const parsedAStartTime = parseTime(a.loc.value.startDateTime);
        const parsedBStartTime = parseTime(b.loc.value.startDateTime);
        if (!parsedAStartTime || !parsedBStartTime)
            return -1;
        if (parsedAStartTime > parsedBStartTime) {
            return 1;
        }
        if (parsedAStartTime < parsedBStartTime) {
            return -1;
        }
        return 0;
    }
    return -1;
});
// TODO put in another function or file
const filterCardsOnTime = (card) => {
    const parseTime = timeParse('%Y-%m-%dT%H:%M');
    // If card has a timeRange
    if (card.loc && card.loc.value && card.loc.value.startDateTime) {
        const parsedStartTime = parseTime(card.loc.value.startDateTime);
        if (!parsedStartTime)
            return false;
        const now = new Date();
        const inTime = now >= parsedStartTime;
        return inTime;
    }
    return true;
};
const CardGrid = props => {
    const { cards, onCardClick, selectedCardId } = props;
    return (React.createElement(motion.div, { exit: { opacity: 0 }, className: "flex-grow flex flex-wrap justify-center" },
        !cards.length && React.createElement("div", null, "No Cards"),
        cards.map((d) => {
            var _a, _b;
            return (React.createElement(AnimatePresence, null,
                React.createElement(PreviewCard, { key: d.id, className: "preview-card-size m-1", onClick: () => onCardClick(d.id), style: {
                        transform: `scale(${d.id === selectedCardId ? 1.05 : 1})`,
                        transition: 'transform 300ms'
                    }, title: (_a = d.title) === null || _a === void 0 ? void 0 : _a.value, img: (_b = d.img) === null || _b === void 0 ? void 0 : _b.value })));
        })));
};
const CardView = props => {
    const { authUser, cards, collectedCards, onClick, style, open, onCardClick, selectedCardId, userLocation, className, width } = props;
    const [collected, setCollected] = useState(false);
    const openCards = sortByDate(cards.filter((c) => !collectedCards.map(d => d.id).includes(c.id) &&
        filterCardsOnTime(c)));
    const filteredCards = collected ? collectedCards : openCards;
    const selectedCard = cards.find(c => c.id === selectedCardId);
    const [selected, setTimeLineSelected] = useState(true);
    const showGrid = !selected && !collected;
    return (React.createElement(FlexCollapsible, { id: "cards", className: clsx(`flex flex-grow flex-col overflow-hidden `, className
        // open && smallLayout && 'mb-16'
        ), style: style, open: open, onClick: onClick, header: React.createElement("div", { className: "flex w-full justify-between items-center" },
            React.createElement("span", { className: "italic" }, "Cards"),
            React.createElement("form", { className: clsx('ml-auto flex p-1', !open && 'hidden'), onSubmit: e => e.preventDefault() },
                React.createElement(RadioBtn, { className: "mr-1", onChange: () => setTimeLineSelected(!selected), checked: selected }, collected ? 'Time' : 'Distance'),
                React.createElement(RadioBtn, { onChange: () => setTimeLineSelected(!selected), checked: !selected }, "Grid"))), footer: React.createElement("div", { className: "w-full flex" },
            React.createElement("div", { className: "flex flex-grow text-base" },
                React.createElement("button", { type: "button", className: clsx('flex-grow btn mx-2 : void p-1 border-2', !collected && 'bg-gray-500 text-white'), onClick: () => setCollected(false) },
                    "Open (",
                    openCards.length,
                    ")"),
                React.createElement("button", { onClick: () => setCollected(true), type: "button", className: clsx('flex-grow btn mx-2 p-1 border-2', collected && 'bg-gray-500 text-white') },
                    "Collected (",
                    collectedCards.length,
                    ")"))) },
        selected && collected && (React.createElement(CardTimeLine, { key: "CardTimeLine", authUser: authUser, userLocation: userLocation, cards: filteredCards, allCards: cards, onCardClick: onCardClick, selectedCardId: selectedCardId })),
        selected && !collected && (React.createElement(DistCircle, Object.assign({}, props, { onCardClick: onCardClick }))),
        !selected && (React.createElement(BubbleSetGrid, Object.assign({ key: !collected }, props, { cards: filteredCards, onCardClick: onCardClick })))));
};
const CardDiary = props => {
    const { selectedCardId, routeCard, cards, ownedCards, authUser, match, history, fetchCollectibleCards, fetchTopics, notifications, width } = props;
    const smallLayout = width < 500;
    // console.log('smallLayout', smallLayout);
    const { params } = match;
    const { userEnvId } = params;
    const { userEnvs, uid } = authUser;
    const selectedUserEnv = userEnvs.find((u) => u.id === userEnvId);
    const ENV_TAB_ID = 'env';
    const CARD_TAB_ID = 'card';
    const BACKLOG_ID = 'backlog';
    const [tabId, setTabId] = useState(CARD_TAB_ID);
    const toggleTab = (id) => tabId !== id ? setTabId(id) : setTabId(null);
    const flex = (tid) => ({
        flex: tabId === tid ? 1 : '0 1 auto'
    });
    useEffect(() => {
        fetchCollectibleCards({ uid, userEnvId });
        fetchTopics(userEnvId);
    }, [userEnvId]);
    const visible = tabId !== CARD_TAB_ID || !smallLayout;
    return (React.createElement("div", { className: "flex flex-grow flex-col overflow-hidden h-full pr-2 " },
        visible && (React.createElement(FlexCollapsible, { header: React.createElement("div", { className: "truncate italic" },
                "Env:",
                ' ',
                React.createElement("span", { className: "italic" }, selectedUserEnv && selectedUserEnv.name)), className: "overflow-hidden mb-3 ", open: tabId === ENV_TAB_ID, onClick: () => toggleTab(ENV_TAB_ID), style: flex(ENV_TAB_ID), footer: null },
            React.createElement(UserEnvSelect, Object.assign({}, props, { history: history, userEnvId: userEnvId, userEnvs: userEnvs, uid: uid })))),
        React.createElement(CardView, Object.assign({}, props, { className: "mb-3", style: flex(CARD_TAB_ID), open: tabId === CARD_TAB_ID, onClick: () => toggleTab(CARD_TAB_ID), authUser: authUser, cards: cards, collectedCards: ownedCards, onCardClick: routeCard, selectedCardId: selectedCardId })),
        visible && (React.createElement(Backlog, Object.assign({}, props, { open: tabId === BACKLOG_ID, onClick: () => toggleTab(BACKLOG_ID), notifications: notifications, onCardClick: routeCard, style: flex(BACKLOG_ID), cards: cards })))));
};
export default CardDiary;
