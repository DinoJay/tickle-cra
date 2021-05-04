import React from 'react';

import css from './Triangle.scss';

const RightTriangleBtn: React.FC<{
  className?: string;
  children: React.ReactNode;
  onClick: Function;
  style?: React.CSSProperties;
}> = props => {
  const {className = '', children, onClick, style} = props;

  const triangleClass = `${css['triangle-right']} border-right-black`;
  return (
    <button
      type="button"
      onClick={(): void => onClick()}
      className={`cursor-pointer ${className}`}
      style={style}>
      <div className="relative">
        <div className="z-50 absolute right-0 bottom-0 mr-1 mb-1">
          {children}
        </div>
        <div className={`${triangleClass}`} />
      </div>
    </button>
  );
};

export const RightTriangleUpBtn: React.FC<{
  className?: string;
  children: React.ReactNode;
  onClick: Function;
  style?: React.CSSProperties;
}> = props => {
  const {className = '', children, onClick, style} = props;

  const triangleClass = `${css['triangle-right']} border-right-black`;
  return (
    <button
      type="button"
      onClick={(): void => onClick()}
      className={`cursor-pointer ${className}`}
      style={style}>
      <div className="relative">
        <div className="z-50 absolute right-0 top-0 mr-1 ">
          {children}
        </div>
        <div
          className={`${triangleClass}`}
          style={{transform: 'rotate(-90deg)'}}
        />
      </div>
    </button>
  );
};

export default RightTriangleBtn;
