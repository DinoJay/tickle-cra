import React from 'react';
import css from './Triangle.scss';

export const RightTriangleBtn: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  onClick?: Function;
}> = props => {
  const {className = '', children, onClick, style} = props;

  const triangleClass = `${
    css['triangle-top-right']
  } border-right-black`;

  return (
    <button
      type="button"
      onClick={(): void => onClick && onClick()}
      className={`cursor-pointer ${className}`}
      style={style}>
      <div className="relative">
        <div className="z-50 absolute right-0 ">{children}</div>
        <div className={`${triangleClass}`} />
      </div>
    </button>
  );
};
export default RightTriangleBtn;
