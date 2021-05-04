import React from 'react';
// import PropTypes from 'prop-types';

import Star from 'react-feather/dist/icons/star';
import {range} from 'd3-array';
import {theme} from 'Tailwind';

const {colors} = theme;

const Rating: React.FC<{
  num: number;
  count: number;
  onClick?: Function;
  disabled?: boolean;
}> = ({num = 5, count = 0, onClick, disabled}) => {
  const fill = (i: number) => {
    if (num === 1 && count === 1 && i === 1) return colors.black;

    if (i <= count) return 'gold';

    return colors.white;
  };

  return (
    <div style={{display: 'flex'}}>
      {range(1, num + 1).map(i => (
        <button
          className="cursor-pointer flex items-center"
          type="button"
          disabled={disabled}
          onClick={() => onClick && onClick(i + 1)}>
          <Star size={30} fill={fill(i + 1)} />
        </button>
      ))}
    </div>
  );
};

export default Rating;
