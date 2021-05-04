import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import X from 'react-feather/dist/icons/x';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { screens } from 'Tailwind';
import css from './Modal.scss';
import useWindowSize from '~/components/utils/useWindowSize';
import stateType from '~/reducers/appStateType';
// import { CardThemeConsumer } from 'Src/styles/CardThemeContext';
//

// const ddg = new DDG('tickle');

const getBODY = (): HTMLInputElement | null =>
  document.querySelector('#modals');

const reduxConnect = (comp: any): any => {
  const mapStateToProps = (state: stateType): object => ({
    ...state.Screen
  });

  const mergeProps = (
    stateProps: object,
    // TODO
    // @ts-ignore
    dispatchProps: object,
    ownProps: object
  ): object => ({
    ...stateProps,
    ...ownProps
  });

  return connect(mapStateToProps, mergeProps)(comp);
};

const ModalCont: React.FC<any> = props => {
  const variants = {
    enter: {
      y: '0%',

      opacity: 1,
      delay: 300,
      transition: {
        y: { type: 'spring', stiffness: 400, damping: 22 },
        default: { duration: 0.3 }
      }
    },
    exit: {
      y: '100vh',
      opacity: 0,
      transition: { duration: 0.15 }
    }
  };
  return (
    <motion.div
      initial="exit"
      animate="exit"
      {...props}
      variants={variants}
    />
  );
};

export const BlackModal: React.FC<ModalInterface> = reduxConnect(
  (props: ModalInterface) => {
    const {
      visible,
      // smallScreen,
      zIndex = 100,
      style,
      topMargin,
      className,
      background = true
    } = props;
    const { width = 0, height = 0 } = useWindowSize();
    const variants = { enter: { opacity: 1 }, exit: { opacity: 0 } };

    return ReactDOM.createPortal(
      <AnimatePresence>
        <motion.div
          key="modal"
          initial="exit"
          animate={visible ? 'enter' : 'exit'}
          variants={variants}
          exit={{ opacity: 0 }}
          className={clsx(
            'fixed flex flex-col overflow-hidden',
            !visible && 'pointer-events-none'
          )}
          style={{
            zIndex,
            top: 0,
            left: 0,
            background: background ? 'rgba(0, 0, 0, 0.8)' : undefined,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s',
            width: '100vw',
            height: width > screens.md ? '100vh' : height || 0
          }}>
          {visible && (
            <ModalCont
              {...props}
              visible={visible}
              topMargin={topMargin}
              initial="exit"
              animate={visible ? 'enter' : 'exit'}
              style={{
                maxWidth: 500,
                // height: 800,
                width: '100vw',
                maxHeight: Math.min(
                  790,
                  width > screens.md ? height - 30 : height
                ),
                ...style,
                transition: 'top 0.4s'
                // marginTop: 30
              }}
              className={clsx(
                'flex flex-col flex-grow ',
                css['modal-m-auto'],
                !visible && 'pointer-events-none',
                className
              )}
            />
          )}
        </motion.div>
      </AnimatePresence>,
      getBODY() as Element
    );
  }
);

interface ModalInterface {
  visible?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  topMargin?: boolean;
  zIndex?: number;
  background?: boolean;
}

export const InlineModal: React.SFC<ModalInterface> = ({
  visible,
  children,
  style,
  className,
  topMargin
}) => (
    <ModalCont
      className={`absolute ${className}`}
      style={{
        zIndex: visible ? 1000 : -1000,
        // pointerEvents: !visible ? 'none' : null,
        opacity: visible ? 1 : 0,
        left: 0,
        top: visible ? 0 : '200vh',
        right: 0,
        bottom: 0,
        transition: 'top 0.4s'
      }}>
      <div
        className="h-full w-full"
        style={{
          maxWidth: 500,
          maxHeight: 800,
          ...style,
          margin: `${topMargin ? '2.5rem' : ''} auto`
        }}>
        {children}
      </div>
    </ModalCont>
  );

export const Modal = reduxConnect((props: ModalInterface): unknown =>
  ReactDOM.createPortal(
    <InlineModal {...props} />,
    getBODY() as Element
  )
);

export interface ModalProps {
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
  header?: JSX.Element;
  className?: string;
  onClose: Function;
  headerClassName?: string;
  footerClassName?: string;
}

// TODO: fix padding bottom
// TODO: access child state
// TODO: Remove overflow-y-auto
// TODO: Remove overflow-y-auto
// TODO: Remove overflow-y-auto
// TODO: Remove overflow-y-auto
// TODO: Remove overflow-y-auto
export const ModalBody: React.SFC<ModalProps> = ({
  children,
  footer,
  style,
  title,
  header,
  className,
  onClose,
  headerClassName = 'flex justify-between items-center p-4 flex-shrink-0',
  footerClassName
}) => (
    <div
      className={`modal-content w-full flex m-auto flex-col bg-white ${className}`}
      style={{
        transform: 'translate(0, 0)',
        boxShadow: 'black 0.2rem 0.2rem',
        maxHeight: '100%',
        ...style
      }}>
      <div className={headerClassName}>
        {title && <h1 className="capitalize">{title}</h1>}
        {header && header}
        {onClose && (
          <button
            type="button"
            className="btn p-2 thick-border"
            onClick={(): void => onClose()}>
            <X />
          </button>
        )}
      </div>
      <div
        className={clsx(
          'flex flex-col pb-4 px-4 w-full flex-grow overflow-y-auto',
          className
          // 'overflow-y-auto'
        )}>
        {children}
      </div>
      {footer && (
        <div
          className={`modal-footer flex justify-end flex-shrink-0 p-2 md:p-4  ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
