import React from 'react';

import css from './index.scss';

const ThreeDots: React.FC<{
  style?: React.CSSProperties;
  className?: string;
}> = props => {
  const {style, className} = props;
  return (
    <div
      className={`${css.spinner} ${className}`}
      style={{width: 70, ...style}}>
      <div className={css.bounce1} />
      <div className={css.bounce2} />
      <div className={css.bounce3} />
    </div>
  );
};
export default ThreeDots;
