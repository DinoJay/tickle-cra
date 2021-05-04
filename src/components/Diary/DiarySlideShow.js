import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';
import PreviewCard from '~/components/cards/PreviewCard';
import usePrevious from '~/components/utils/usePrevious';
const useScrollTo = (index, ref) => {
    const prev = usePrevious(index);
    useEffect(() => {
        var _a;
        const parentEl = (_a = ref) === null || _a === void 0 ? void 0 : _a.current;
        // console.log('parentEl', parentEl);
        if (parentEl) {
            const elements = parentEl.children;
            const el = elements[index];
            if (el) {
                const offset = (index > prev ? 1 : -1) * el.clientWidth;
                parentEl.scrollBy({ left: offset, behavior: 'smooth' });
            }
        }
    }, [index]);
    return { ref };
};
const SlideShow = ({ cards = [], size = 0, onCardClick = d => d }) => {
    const [index, setIndex] = useState(0);
    const ref = React.useRef();
    useScrollTo(index, ref);
    const disabledRight = index === cards.length - 1;
    const disabledLeft = index === 0;
    const btnClass = 'btn bg-black rounded-full flex items-center justify-center p-1';
    return (React.createElement("div", { className: "bg-gray-300 flex justify-center items-center w-full border-2" },
        React.createElement("button", { type: "button", onClick: () => setIndex(index - 1), className: clsx(btnClass, 'mr-1 md:m-1', disabledLeft && 'disabled'), disabled: disabledLeft },
            React.createElement(ChevronLeft, { className: "flex-shrink-0 text-white" })),
        React.createElement("div", { className: "p-4 w-full justify-center items-center flex overflow-y-auto ", ref: ref, style: { maxWidth: '100%' } }, cards.map(c => {
            var _a, _b;
            return (React.createElement(PreviewCard, { onClick: () => onCardClick(c.id), className: "m-1", style: {
                    minWidth: `${size}rem`,
                    width: `${size}rem`,
                    height: `${size}rem`,
                }, title: (_a = c.title) === null || _a === void 0 ? void 0 : _a.value, img: (_b = c.img) === null || _b === void 0 ? void 0 : _b.value }));
        })),
        React.createElement("button", { type: "button", className: clsx(btnClass, 'ml-1 md:m-1', disabledRight && 'disabled'), disabled: disabledRight, onClick: () => setIndex(index + 1) },
            React.createElement(ChevronRight, { className: "flex-shrink-0 text-white" }))));
};
export default SlideShow;
