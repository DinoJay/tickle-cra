import React from 'react';
import { motion } from 'framer-motion';
import Play from 'react-feather/dist/icons/play';
import clsx from 'clsx';
// import clsx from 'clsx';
const PosedDiv = props => {
    const variants = {
        open: { height: 'auto' },
        closed: { height: 0 }
    };
    return (React.createElement(motion.div, Object.assign({ initial: "closed", animate: "open" }, props, { variants: variants })));
};
const DetailsFrame = props => {
    const { onClick, open, title, header = null, children, className, contentClassName, style, footer, overflow = false, openClassName = 'shadow border-black', closedClassName = 'shadow-gray border-gray-500' } = props;
    const detailsClass = `${open ? `${openClassName} ` : `${closedClassName} cursor-pointer`} border-2 `;
    return (React.createElement("div", { style: style, className: `${className} ${detailsClass} flex-shrink-0 flex flex-col relative` },
        React.createElement("div", { className: "flex text-2xl items-center flex-shrink-0 my-auto px-1 ", onClick: e => {
                e.stopPropagation();
                onClick();
            }, style: { minHeight: 0 } },
            React.createElement("div", { className: "mr-2 ", style: {
                    transform: `rotate(${!open ? '0deg' : '90deg'})`,
                    transition: 'transform 300ms'
                } },
                React.createElement(Play, null)),
            title,
            header),
        React.createElement(PosedDiv, { animate: open ? 'open' : 'closed', className: clsx('flex flex-grow flex-col px-1', contentClassName, open
                ? overflow
                    ? 'overflow-visible'
                    : 'overflow-y-auto'
                : 'overflow-hidden') },
            children,
            footer && (React.createElement("div", { className: "mt-auto mb-1 flex-shrink-0" },
                React.createElement(Footer, null, footer))))));
};
export const Footer = props => {
    const { children, style, className } = props;
    return (React.createElement("div", { className: `flex-shrink-0 flex pt-2 border-t-2 mt-2 bg-white items-center w-full bottom-0 left-0 z-10 w-full ${className}`, style: { ...style } }, children));
};
export default DetailsFrame;
