import React from 'react';
import sortBy from 'lodash/sortBy';
import { max } from 'd3-array';
import PreviewCard from '~/components/cards/PreviewCard';
import distanceLoc from '~/components/utils/distanceLoc';
import useDragToScroll, { useScrollTo } from './useDragToScroll';
import { avatars } from '~/constants/avatars';
const layoutCircle = ({ cards, radius, width, height }) => {
    let angle = 0;
    const step = (2 * Math.PI) / cards.length;
    return cards.map(c => {
        const x = width / 2 + radius * Math.cos(angle);
        const y = height / 2 + radius * Math.sin(angle);
        angle += step;
        return { x, y, ...c };
    });
};
const Img = React.forwardRef(({ style, src }, ref) => (React.createElement("img", { ref: ref, alt: "avatar", style: {
        ...style,
        transform: 'translate(-50%,-50%)'
    }, className: "absolute w-24 h-24", src: src })));
const Labels = props => {
    const { size, b, i } = props;
    const textOffset = (pi, offset) => size / 2 + (b.r + offset) * pi;
    return (React.createElement("g", null,
        React.createElement("text", { style: { fontSize: 20 }, x: textOffset(Math.cos(2 * Math.PI), i !== 0 ? 50 : 50), y: textOffset(Math.sin(2 * Math.PI), i !== 0 ? 50 : 50) },
            b.dist ? b.dist.toFixed(1) : 0,
            "km"),
        React.createElement("text", { style: { fontSize: 20 }, x: textOffset(Math.cos(Math.PI), i !== 0 ? 110 : 100), y: textOffset(Math.sin(Math.PI), i !== 0 ? 110 : 100) },
            b.dist ? b.dist.toFixed(1) : 0,
            "km"),
        React.createElement("text", { textAnchor: "middle", style: { fontSize: 20 }, x: textOffset(Math.cos(Math.PI / 2), 100), y: textOffset(Math.sin(Math.PI / 2), i !== 0 ? 110 : 100) },
            b.dist ? b.dist.toFixed(1) : 0,
            "km"),
        React.createElement("text", { textAnchor: "middle", style: { fontSize: 20 }, x: textOffset(Math.cos(-Math.PI / 2), 100), y: textOffset(Math.sin(-Math.PI / 2), i !== 0 ? 110 : 100) },
            b.dist ? b.dist.toFixed(1) : 0,
            "km")));
};
const DistCircle = props => {
    const { cards, authUser, userLocation, onCardClick } = props;
    const ref = React.useRef(null);
    const focusRef = React.useRef(null);
    const [dim, setDim] = React.useState([0, 0]);
    const avatar = avatars.find(a => a.id === authUser.avatar);
    React.useEffect(() => {
        const cont = ref.current;
        if (cont && cont.offsetWidth && cont.offsetHeight)
            setDim([cont.offsetWidth, cont.offsetHeight]);
    }, []);
    useDragToScroll(ref);
    useScrollTo(focusRef, ref, []);
    const cardsWithDist = cards.map(d => ({
        ...d,
        dist: distanceLoc(userLocation, d.loc.value)
    }));
    const sortedCards = sortBy(cardsWithDist, d => d.dist);
    const maxRad = 450;
    const buck0 = sortedCards.slice(0, 4);
    const buck1 = sortedCards.slice(4, 9);
    const buck2 = sortedCards.slice(9, 30);
    const buckets = [
        { cards: buck0, r: 150, dist: max(buck0, d => d.dist) },
        { cards: buck1, r: 300, dist: max(buck1, d => d.dist) },
        { cards: buck2, r: maxRad, dist: max(buck2, d => d.dist) }
    ];
    const pad = 50;
    const size = maxRad * 2 + pad;
    return (React.createElement("div", { ref: ref, className: "overflow-auto flex-grow w-full" },
        React.createElement("div", { className: "relative ", style: { width: size, minHeight: size } },
            React.createElement(Img, { ref: focusRef, src: avatar.img.url, style: {
                    left: size / 2,
                    top: size / 2
                } }),
            React.createElement("svg", { className: "absolute overflow-visible text-gray-500 stroke-current" }, buckets.map((b, i) => (React.createElement(React.Fragment, null,
                React.createElement(Labels, { b: b, i: i, size: size }),
                React.createElement("circle", { style: { fill: 'none' }, r: b.r, cx: size / 2, cy: size / 2 }))))),
            buckets.map((b, i) => layoutCircle({
                cards: b.cards,
                radius: b.r,
                width: size,
                height: size
            }).map(d => {
                var _a;
                return (React.createElement("div", { className: "absolute", style: {
                        transform: 'translate(-50%, -50%)',
                        left: d.x,
                        top: d.y
                    } },
                    React.createElement(PreviewCard, { title: (_a = d.title) === null || _a === void 0 ? void 0 : _a.value, onClick: () => onCardClick(d.id), img: d.img.value, style: {
                            width: '3rem',
                            height: '3rem',
                            maxWidth: '3rem',
                            minWidth: '3rem'
                        } })));
            })))));
};
export default DistCircle;
