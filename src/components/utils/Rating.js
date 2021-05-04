import React from 'react';
// import PropTypes from 'prop-types';
import Star from 'react-feather/dist/icons/star';
import { range } from 'd3-array';
import { theme } from 'Tailwind';
const { colors } = theme;
const Rating = ({ num = 5, count = 0, onClick, disabled }) => {
    const fill = (i) => {
        if (num === 1 && count === 1 && i === 1)
            return colors.black;
        if (i <= count)
            return 'gold';
        return colors.white;
    };
    return (React.createElement("div", { style: { display: 'flex' } }, range(1, num + 1).map(i => (React.createElement("button", { className: "cursor-pointer flex items-center", type: "button", disabled: disabled, onClick: () => onClick && onClick(i + 1) },
        React.createElement(Star, { size: 30, fill: fill(i + 1) }))))));
};
export default Rating;
