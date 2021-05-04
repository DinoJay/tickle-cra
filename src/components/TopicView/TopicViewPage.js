import React, { useState, useEffect } from 'react';
// import clsx from 'clsx';
import ConnectedCard from '~/components/cards/ConnectedCard';
import useRouteParams from '~/Routes/useRouteParams';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import abcLetters from '~/styles/abc_letters';
import PreviewCard from '~/components/cards/PreviewCard';
import DefaultLayout from '~/components/DefaultLayout';
// These two are just helpers, they curate spring data, values that are later being interpolated into css
// const to = ( i:number) => ({
//   x: i * 2,
//   y: i * 4,
//   scale: 1,
//   delay: i * 100
// });
const TopicPreview = props => {
    const { img, style, title, onClick, points } = props;
    const letter = title.charAt(0);
    return (React.createElement("div", { className: "h-full shadow-md flex flex-col", onClick: () => onClick(), style: {
            ...style,
            backgroundImage: `url(${(img && img.url) ||
                abcLetters[letter.toLowerCase()]}) `,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        } },
        React.createElement("div", { className: "bg-black flex flex-col justify-between items-center text-white uppercase font-bold text-base p-1" }, title),
        React.createElement("div", { className: "mt-auto mb-3 mx-auto text-2xl" },
            points,
            "XP")));
};
const extendTopics = (topicDict, cards) => {
    return topicDict
        .map((d) => ({
        ...d,
        cards: cards.filter((c) => c.topics &&
            c.topics.value &&
            !!c.topics.value.find((e) => e.id === d.id))
    }))
        .map((d) => ({
        ...d,
        points: d.cards.reduce((acc, e) => {
            const incr = e.topics && e.topics.value
                ? e.topics.value.reduce((ac, t) => ac + (t.points || 0), 0)
                : 0;
            return acc + incr;
        }, 0)
    }))
        .sort((a, b) => b.points - a.points);
};
const CardStack = props => {
    const { cards } = props;
    const { setQuery, query: { id, extended } } = useRouteParams();
    const selectedCard = cards.find((c) => c.id === id) || {};
    return (React.createElement("div", { className: "flex flex-wrap" },
        cards.map((d) => (React.createElement(PreviewCard, { title: (d.title && d.title.value) || '', img: d.img ? d.img.value : undefined, className: "m-1", onClick: () => setQuery({ id: d.id, extended: true }) }))),
        React.createElement(BlackModal, { visible: extended },
            React.createElement(ConnectedCard, Object.assign({}, selectedCard)))));
};
const TopicViewPage = props => {
    const { topicDict, fetchCollectibleCards, fetchTopics, userEnvId, authUser, width, cards } = props;
    const { uid } = authUser;
    const extTopicDict = extendTopics(topicDict, cards).filter(c => c.cards.length > 0);
    const [id, setId] = useState(null);
    // console.log('extTopicDict', extTopicDict, 'cards', cards);
    useEffect(() => {
        fetchCollectibleCards({ userEnvId, uid });
        fetchTopics(userEnvId);
    }, [userEnvId]);
    const selectedTopic = id ? extTopicDict.find(d => d.id === id) : null;
    const selectedCards = selectedTopic ? selectedTopic.cards : [];
    console.log('selectedTopic', selectedTopic);
    return (React.createElement(DefaultLayout, { className: "relative overflow-hidden", menu: React.createElement("div", { className: "flex-grow flex justify-end items-center" }) },
        React.createElement(BlackModal, { visible: id !== null },
            React.createElement(ModalBody, { title: selectedTopic ? selectedTopic.title : '', onClose: () => setId(null), className: "flex-grow" },
                React.createElement(CardStack, { cards: selectedCards }))),
        React.createElement("div", { className: "flex-grow p-2 overflow-y-auto", style: {
                display: 'grid',
                gridTemplateColumns: `repeat(${width > 500 ? 5 : 3}, 1fr)`,
                gridGap: '1rem',
                gridTemplateRows: `repeat(${topicDict.length * 3}, 1rem)`
            } }, extTopicDict.map((d, i) => (React.createElement(TopicPreview, Object.assign({ onClick: () => setId(d.id), cards: d.cards }, d, { style: {
                gridRow: i % 2 === 0 ? 'span 10' : 'span 8',
                gridColumn: 'span 1'
            } })))))));
};
export default TopicViewPage;
