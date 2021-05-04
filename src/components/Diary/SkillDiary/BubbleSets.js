import React, { useState } from 'react';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import PreviewCard from '~/components/cards/PreviewCard';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';
import SelectTags from '~/components/utils/SelectTags';
import setify from '~/components/utils/setify';
import { BubbleSet, ShapeSimplifier, BSplineShapeGenerator, PointPath } from '../bubblesets';
const colors = [
    'green',
    'yellow',
    'red',
    'blue',
    'gray',
    'lightgreen',
    'brown',
    'coral',
    'cyan',
    'pink'
];
const sort = cards => uniqBy(sortBy(setify(cards), d => d.count)
    .reverse()
    .map(d => d.cards)
    .flat(), d => d.id);
const Grid = props => {
    const { cards, onRendered, size } = props;
    const ref = React.useRef();
    React.useEffect(() => {
        onRendered([...ref.current.children].map((c, i) => ({
            height: c.offsetHeight,
            width: c.offsetWidth,
            x: c.offsetLeft,
            y: c.offsetTop,
            ...cards[i]
        })));
    }, [useDeepCompareMemoize(cards), size]);
    return (React.createElement("div", { ref: ref, className: "relative flex flex-wrap justify-center items-start" }, cards.map((d, i) => (React.createElement(PreviewCard, { key: d.id, className: "m-6", style: {
            maxWidth: `${size}rem`,
            minWidth: `${size}rem`,
            height: `${size}rem`
        }, title: (d.title && d.title.value) || undefined, img: (d.img && d.img.value) || undefined })))));
};
const OneBubbleSet = props => {
    const { coords, color, opacity, altCards } = props;
    const pad = 0;
    const bubbles = new BubbleSet();
    const list = bubbles.createOutline(BubbleSet.addPadding(coords, pad), BubbleSet.addPadding(altCards, pad), null);
    const outline = new PointPath(list).transform([
        new ShapeSimplifier(0.0),
        new BSplineShapeGenerator(),
        new ShapeSimplifier(0.0)
    ]);
    return (React.createElement("svg", { className: "absolute z-20 w-full overflow-visible" },
        React.createElement("path", { fill: color, opacity: opacity, d: outline.toString() })));
};
const BubbleSets = props => {
    const { nodes, size, colorMap } = props;
    const nestedSet = setify(nodes)
        .map((d, i) => ({ ...d, color: colors[i] }))
        .filter(d => d.count > 1);
    return nestedSet.map((d, i) => (React.createElement(OneBubbleSet, { opacity: 0.2, coords: d.cards, color: colorMap[d.id], altCards: [] })));
};
const BubbleSetsWrapper = props => {
    const { open, onClick, style, authUser: { uid }, locs, cards } = props;
    const [filteredCards, setFilteredCards] = useState(sort(cards));
    const [domNodes, setDomNodes] = useState([]);
    const [size, setSize] = useState(3);
    const nested = setify(sort(cards))
        .map((d, i) => ({ ...d, color: colors[i] }))
        .filter(d => d.count > 1);
    const colorMap = nested.reduce((acc, d) => {
        acc[d.id] = d.color;
        return acc;
    }, {});
    return (React.createElement("div", { className: "mx-1 overflow-y-auto justify-center relative " },
        React.createElement("div", { className: "text-base mb-6 flex" },
            React.createElement("div", { className: "z-50 flex mr-2 text-lg" },
                React.createElement("button", { type: "button", onClick: () => setSize(size + 1) }, "+"),
                React.createElement("button", { type: "button", onClick: () => setSize(size - 1) }, "-")),
            React.createElement(SelectTags, { className: "z-50 bg-white flex-grow", values: [
                    { id: 'all', title: 'All', cards: sort(cards) },
                    ...nested
                ], idAcc: d => d.id, onChange: a => {
                    setFilteredCards(a.cards);
                }, valueAcc: d => (React.createElement("div", { className: "flex justify-between" },
                    React.createElement("div", null, d.title),
                    React.createElement("div", { className: "w-6 h-6", style: { background: d.color, opacity: 0.4 } }))) })),
        React.createElement(BubbleSets, { nodes: domNodes, size: size, colorMap: colorMap }),
        React.createElement(Grid, { cards: filteredCards, onRendered: setDomNodes, size: size })));
};
export default BubbleSetsWrapper;
