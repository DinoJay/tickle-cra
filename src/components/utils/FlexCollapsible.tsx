import React from 'react';
import Play from 'react-feather/dist/icons/play';
import {motion, AnimatePresence} from 'framer-motion';
import clsx from 'clsx';

export default function FlexCollapsible(props: {
  onClick: Function;
  open: boolean;
  header?: React.ReactNode | string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className: string;
  footer: React.ReactNode;
}): JSX.Element {
  const {
    onClick,
    open,
    header = null,
    children,
    className,
    style = {},
    footer
  } = props;

  const flexStyle = !open ? {flex: '0 0 40px'} : {flex: '1 0 40px'};

  const detailsClass = `${
    open ? 'border-black' : 'border-gray-500'
  } text-2xl border-2 `;

  return (
    <motion.div
      className={clsx(
        `flex-shrink-0 flex flex-col overflow-hidden relative`,
        className,
        detailsClass,
        !open && 'cursor-pointer'
      )}
      style={{
        ...style,
        ...flexStyle,
        transition: 'flex 300ms'
        // minHeight: 0,
      }}>
      <div
        className="flex items-center flex-shrink-0 my-auto px-1 overflow-y-hidden"
        onClick={(): void => onClick()}
        style={{minHeight: 0}}>
        <button
          type="button"
          className="mr-2 "
          style={{
            transform: `rotate(${!open ? '0deg' : '90deg'})`,
            transition: 'transform 300ms'
          }}>
          <Play />
        </button>
        {header}
      </div>
      <div className="overflow-hidden flex-grow flex flex-col">
        {children}
      </div>
      {footer && (
        <div className="mt-auto flex-shrink-0">
          <Footer>{footer}</Footer>
        </div>
      )}
    </motion.div>
  );
}
export const Footer: React.SFC<{
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = props => {
  const {children, style, className} = props;
  return (
    <div
      className={`flex-shrink-0 flex p-1 border-t-2 bg-white items-center z-10 w-full ${className}`}
      style={style}>
      {children}
    </div>
  );
};
