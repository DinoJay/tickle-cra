import React from 'react';
import cx from './Flipper.scss';
const Flipper = ({ flipped, front, back, className, frontClassName, backClassName, style = {}, onClick }) => (React.createElement("div", { style: style, onClick: () => onClick && onClick(), className: `${cx.flipContainer} ${flipped &&
        cx.flip} ${className}` },
    React.createElement("div", { className: `flex flex-col flex-grow ${cx.flipper} ${flipped &&
            cx.flip}` },
        React.createElement("div", { className: `${cx.front} ${frontClassName}`, style: { pointerEvents: flipped ? 'none' : undefined } }, front),
        React.createElement("div", { className: `${cx.back} ${backClassName}`, style: {
                pointerEvents: !flipped ? 'none' : undefined
            } }, back))));
export default Flipper;
