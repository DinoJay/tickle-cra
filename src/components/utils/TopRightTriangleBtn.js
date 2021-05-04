import React from 'react';
import css from './Triangle.scss';
export const RightTriangleBtn = props => {
    const { className = '', children, onClick, style } = props;
    const triangleClass = `${css['triangle-top-right']} border-right-black`;
    return (React.createElement("button", { type: "button", onClick: () => onClick && onClick(), className: `cursor-pointer ${className}`, style: style },
        React.createElement("div", { className: "relative" },
            React.createElement("div", { className: "z-50 absolute right-0 " }, children),
            React.createElement("div", { className: `${triangleClass}` }))));
};
export default RightTriangleBtn;
