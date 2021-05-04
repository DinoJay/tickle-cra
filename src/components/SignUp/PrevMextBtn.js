import React from 'react';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';
const InnerBtn = ({ children, className = '', styles = {}, left = true, type = 'button', ...props }) => (React.createElement("button", Object.assign({ type: type, className: `${className}` }, props),
    React.createElement("div", { className: "h-full interact flex justify-center items-center" },
        left && (React.createElement("div", { className: "flex flex-col items-center mr-auto p-1 h-full " },
            React.createElement(ChevronLeft, null))),
        React.createElement("span", { className: !left ? 'ml-auto' : 'mr-auto' }, children),
        !left && (React.createElement("div", { className: "\n          flex flex-col justify-center ml-auto p-1 h-full " },
            React.createElement(ChevronRight, null))))));
export const PrevBtn = ({ ...props }) => (React.createElement(InnerBtn, Object.assign({}, props, { left: true })));
export const NextBtn = ({ ...props }) => (React.createElement(InnerBtn, Object.assign({}, props, { left: false })));
