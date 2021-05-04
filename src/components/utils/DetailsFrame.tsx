import React from 'react';
import {motion} from 'framer-motion';
import Play from 'react-feather/dist/icons/play';
import clsx from 'clsx';
// import clsx from 'clsx';

const PosedDiv: React.FC<any> = props => {
  const variants = {
    open: {height: 'auto'},
    closed: {height: 0}
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      {...props}
      variants={variants}
    />
  );
};

const DetailsFrame: React.FC<{
  onClick: Function;
  open: boolean;
  title?: string | React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  footer?: React.ReactNode;
  openClassName?: string;
  closedClassName?: string;
  overflow?: boolean;
}> = props => {
  const {
    onClick,
    open,
    title,
    header = null,
    children,
    className,
    contentClassName,
    style,
    footer,
    overflow = false,
    openClassName = 'shadow border-black',
    closedClassName = 'shadow-gray border-gray-500'
  } = props;

  const detailsClass = `${
    open ? `${openClassName} ` : `${closedClassName} cursor-pointer`
  } border-2 `;

  return (
    <div
      style={style}
      className={`${className} ${detailsClass} flex-shrink-0 flex flex-col relative`}>
      <div
        className="flex text-2xl items-center flex-shrink-0 my-auto px-1 "
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
        style={{minHeight: 0}}>
        <div
          className="mr-2 "
          style={{
            transform: `rotate(${!open ? '0deg' : '90deg'})`,
            transition: 'transform 300ms'
          }}>
          <Play />
        </div>
        {title}
        {header}
      </div>
      <PosedDiv
        animate={open ? 'open' : 'closed'}
        className={clsx(
          'flex flex-grow flex-col px-1',
          contentClassName,
          open
            ? overflow
              ? 'overflow-visible'
              : 'overflow-y-auto'
            : 'overflow-hidden'
        )}>
        {children}

        {footer && (
          <div className="mt-auto mb-1 flex-shrink-0">
            <Footer>{footer}</Footer>
          </div>
        )}
      </PosedDiv>
    </div>
  );
};

export const Footer: React.FC<{
  style?: React.CSSProperties;
  className?: string;
}> = props => {
  const {children, style, className} = props;
  return (
    <div
      className={`flex-shrink-0 flex pt-2 border-t-2 mt-2 bg-white items-center w-full bottom-0 left-0 z-10 w-full ${className}`}
      style={{...style}}>
      {children}
    </div>
  );
};
export default DetailsFrame;
