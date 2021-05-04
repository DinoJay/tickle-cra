import React from 'react';
import { motion } from 'framer-motion';
import menuIconSrc from '~/styles/menu_icons/menuIconStolen.svg';
const SlideMenu = ({ className, style, children, visible, onClick }) => (React.createElement("div", { tabIndex: -1, className: `${className} z-10 relative`, style: { outline: 'none' }, onBlur: e => {
        e.stopPropagation();
        e.preventDefault();
        // setTimeout(() => setVisible(false), 100);
    } },
    React.createElement("div", { className: "flex-grow flex justify-end cursor-pointer" },
        React.createElement("div", { onClick: onClick, className: "flex justify-center mr-2 p-1 bg-white", style: { width: 40, height: 40 } },
            React.createElement("img", { src: menuIconSrc, alt: "nav" }))),
    React.createElement(motion.div, { positionTransition: true, className: "mt-2 absolute flex flex-col", style: {
            right: visible ? 0 : '-100vw',
            width: '30vw',
            maxWidth: 500,
            ...style
            // transition: 'right 200ms'
        } },
        React.createElement("div", { className: "flex-grow ml-2 p-2 overflow-y-auto border-2 border-black shadow bg-white" }, children))));
export default SlideMenu;
