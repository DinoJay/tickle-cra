import React from 'react';
import css from './PreviewTag.scss';
const PreviewTag = props => {
    const { onClick, img, title, url, style, className, points, footer = null, selected = false
    // acquired = false
     } = props;
    const bgStyle = {
        flexGrow: 100,
        backgroundImage: `url(${img ? img.url : url}) `,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };
    return (React.createElement("div", { className: `${css.previewTag} flex flex-col shadow-md ${className}`, style: {
            ...style,
            transform: selected ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 300ms'
        }, onClick: (e) => onClick && onClick(e) },
        React.createElement("div", { className: "bg-black flex flex-col justify-between items-center text-white uppercase font-bold text-base p-1" },
            React.createElement("div", { className: "text-sm ", style: {
                // wordBreak: 'all',
                // TODO: multiline break
                // 'webkit-line-break': 1
                // height: '12rem'
                } }, title)),
        React.createElement("div", { className: "w-full flex-grow", style: bgStyle }),
        !!points && Number.isInteger(points) && points > 1 && (React.createElement("div", { className: "p-1" }, `${points}XP`)),
        footer && (React.createElement("div", { className: "absolute left-0 bottom-0" }, footer))));
};
export default PreviewTag;
