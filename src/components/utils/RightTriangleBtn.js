import React from 'react';
import css from './Triangle.scss';
const RightTriangleBtn = props => {
    const { className = '', children, onClick, style } = props;
    const triangleClass = `${css['triangle-right']} border-right-black`;
    return (React.createElement("button", { type: "button", onClick: () => onClick(), className: `cursor-pointer ${className}`, style: style },
        React.createElement("div", { className: "relative" },
            React.createElement("div", { className: "z-50 absolute right-0 bottom-0 mr-1 mb-1" }, children),
            React.createElement("div", { className: `${triangleClass}` }))));
};
export const RightTriangleUpBtn = props => {
    const { className = '', children, onClick, style } = props;
    const triangleClass = `${css['triangle-right']} border-right-black`;
    return (React.createElement("button", { type: "button", onClick: () => onClick(), className: `cursor-pointer ${className}`, style: style },
        React.createElement("div", { className: "relative" },
            React.createElement("div", { className: "z-50 absolute right-0 top-0 mr-1 " }, children),
            React.createElement("div", { className: `${triangleClass}`, style: { transform: 'rotate(-90deg)' } }))));
};
export default RightTriangleBtn;
