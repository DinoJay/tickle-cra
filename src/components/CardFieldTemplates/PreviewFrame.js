import React from 'react';
import Edit from 'react-feather/dist/icons/edit';
const EditIcon = ({ className, style, onClick }) => (React.createElement("div", { className: `text-black ${className}`, onClick: () => onClick && onClick(), style: style },
    React.createElement(Edit, { size: 30 })));
const PreviewFrame = ({ onClick, empty, placeholder = 'empty', className = '', style, type, content }) => (React.createElement("div", { style: style, className: `${className} text-2xl overflow-hidden flex-no-grow cursor-pointer items-center`, onClick: () => onClick() },
    React.createElement("div", { className: `flex items-center justify-between capitalize font-bold ${empty &&
            'text-grey'} mr-1` },
        React.createElement("div", null, type),
        React.createElement("div", { className: "ml-auto hidden" },
            React.createElement(EditIcon, null))),
    !empty && (React.createElement("div", { className: "flex-no-grow flex-shrink text-truncate" }, content())),
    empty && (React.createElement("span", { className: "text-grey capitalize" }, placeholder))));
export default PreviewFrame;
