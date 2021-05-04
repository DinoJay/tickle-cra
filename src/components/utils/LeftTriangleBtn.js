import React from 'react';
import css from './Triangle.scss';
const LeftTriangleBtn = props => {
    const { className = '', style = {}, children, onClick } = props;
    const triangleClass = `${css['triangle-left']} border-left-black`;
    return (React.createElement("button", { type: "button", onClick: () => onClick(), style: style, className: `cursor-pointer ${className}` },
        React.createElement("div", { className: "relative" },
            React.createElement("div", { className: "z-50 absolute left-0 bottom-0 ml-1 mb-1" }, children),
            React.createElement("div", { className: `${triangleClass}` }))));
};
export const LeftTriangleUpBtn = props => {
    const { className = '', style = {}, children, onClick } = props;
    const triangleClass = `${css['triangle-left']} border-left-black`;
    return (React.createElement("button", { type: "button", onClick: () => onClick(), style: style, className: `cursor-pointer ${className}` },
        React.createElement("div", { className: "relative" },
            React.createElement("div", { className: "z-50 absolute left-0 top-0 ml-1 " }, children),
            React.createElement("div", { className: `${triangleClass}`, style: { transform: 'rotate(90deg)' } }))));
};
export default LeftTriangleBtn;
