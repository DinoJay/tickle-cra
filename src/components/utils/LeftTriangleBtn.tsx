import React from 'react';
import css from './Triangle.scss';

const LeftTriangleBtn: React.FC<{
  className?: string;
  children: React.ReactNode;
  onClick: Function;
  style?: React.CSSProperties;
}> = props => {
  const {className = '', style = {}, children, onClick} = props;

  const triangleClass = `${css['triangle-left']} border-left-black`;
  return (
    <button
      type="button"
      onClick={() => onClick()}
      style={style}
      className={`cursor-pointer ${className}`}>
      <div className="relative">
        <div className="z-50 absolute left-0 bottom-0 ml-1 mb-1">
          {children}
        </div>
        <div className={`${triangleClass}`} />
      </div>
    </button>
  );
};

export const LeftTriangleUpBtn: React.FC<{
  className?: string;
  children: React.ReactNode;
  onClick: Function;
  style?: React.CSSProperties;
}> = props => {
  const {className = '', style = {}, children, onClick} = props;

  const triangleClass = `${css['triangle-left']} border-left-black`;
  return (
    <button
      type="button"
      onClick={() => onClick()}
      style={style}
      className={`cursor-pointer ${className}`}>
      <div className="relative">
        <div className="z-50 absolute left-0 top-0 ml-1 ">
          {children}
        </div>
        <div
          className={`${triangleClass}`}
          style={{transform: 'rotate(90deg)'}}
        />
      </div>
    </button>
  );
};

export default LeftTriangleBtn;
