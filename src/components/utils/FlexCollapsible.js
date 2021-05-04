import React from 'react';
import Play from 'react-feather/dist/icons/play';
import { motion } from 'framer-motion';
import clsx from 'clsx';
export default function FlexCollapsible(props) {
    const { onClick, open, header = null, children, className, style = {}, footer } = props;
    const flexStyle = !open ? { flex: '0 0 40px' } : { flex: '1 0 40px' };
    const detailsClass = `${open ? 'border-black' : 'border-gray-500'} text-2xl border-2 `;
    return (React.createElement(motion.div, { className: clsx(`flex-shrink-0 flex flex-col overflow-hidden relative`, className, detailsClass, !open && 'cursor-pointer'), style: {
            ...style,
            ...flexStyle,
            transition: 'flex 300ms'
            // minHeight: 0,
        } },
        React.createElement("div", { className: "flex items-center flex-shrink-0 my-auto px-1 overflow-y-hidden", onClick: () => onClick(), style: { minHeight: 0 } },
            React.createElement("button", { type: "button", className: "mr-2 ", style: {
                    transform: `rotate(${!open ? '0deg' : '90deg'})`,
                    transition: 'transform 300ms'
                } },
                React.createElement(Play, null)),
            header),
        React.createElement("div", { className: "overflow-hidden flex-grow flex flex-col" }, children),
        footer && (React.createElement("div", { className: "mt-auto flex-shrink-0" },
            React.createElement(Footer, null, footer)))));
}
export const Footer = props => {
    const { children, style, className } = props;
    return (React.createElement("div", { className: `flex-shrink-0 flex p-1 border-t-2 bg-white items-center z-10 w-full ${className}`, style: style }, children));
};
