import React from 'react';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';

const InnerBtn = ({
  children,
  className = '',
  styles = {},
  left = true,
  type = 'button',
  ...props
}) => (
  <button type={type} className={`${className}`} {...props}>
    <div className="h-full interact flex justify-center items-center">
      {left && (
        <div className="flex flex-col items-center mr-auto p-1 h-full ">
          <ChevronLeft  />
        </div>
      )}
      <span className={!left ? 'ml-auto' : 'mr-auto'}>{children}</span>
      {!left && (
        <div
          className="
          flex flex-col justify-center ml-auto p-1 h-full ">
          <ChevronRight />
        </div>
      )}
    </div>
  </button>
);

export function PrevBtn({...props}) {
  return <InnerBtn {...props} left />;
}

export function NextBtn({...props}) {
  return <InnerBtn {...props} left={false} />;
}
