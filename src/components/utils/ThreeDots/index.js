import React from 'react';
import css from './index.scss';
const ThreeDots = props => {
    const { style, className } = props;
    return (React.createElement("div", { className: `${css.spinner} ${className}`, style: { width: 70, ...style } },
        React.createElement("div", { className: css.bounce1 }),
        React.createElement("div", { className: css.bounce2 }),
        React.createElement("div", { className: css.bounce3 })));
};
export default ThreeDots;
