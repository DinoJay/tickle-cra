import React from 'react';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';

const InnerBtn: React.FC<{
  children: React.ReactNode;
  className: string;
  styles: React.CSSProperties;
  left: boolean;
  type: any;
}> = ({
  children,
  className = '',
  styles = {},
  left = true,
  type,
  ...props
}) => (
  <button type={type||'button'} className={`${className}`} {...props}>
    <div className="h-full interact flex justify-center items-center">
      {left && (
        <div className="flex flex-col items-center mr-auto p-1 h-full ">
          <ChevronLeft />
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

export const PrevBtn: React.FC<any> = ({...props}) => (
  <InnerBtn {...props} left />
);

export const NextBtn: React.FC<any> = ({...props}) => (
  <InnerBtn {...props} left={false} />
);
