import React, { useState, useEffect } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import clsx from 'clsx';

import { connect } from 'react-redux';

import { motion } from 'framer-motion';
import * as screenActions from '~/reducers/Screen/actions';
import IcAk from '~/styles/alphabet_icons/ic_ak.svg';

import css from './DefaultLayout.scss';
import RouteNavigation from '../Navigation';
import UserEnv from '~/constants/userEnvType';
import AppStateType from '~/reducers/appStateType';
import AuthUser from '~/constants/authUserType';
import useClickOutside from '~/components/utils/useClickOutside';
// TODO
// import RootAction from '~/reducers/RootAction';

const Draggable: React.FC<any> = props => {
  const { dragConstraints } = props;
  const variants = {
    closed: {
      x: '-120%',
      transition: { ease: 'backInOut', duration: 0.3 }
    },
    open: {
      x: '0%',
      transition: { ease: 'backInOut', duration: 0.3 }
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={dragConstraints}
      dragElastic={0}
      initial="closed"
      animate="closed"
      {...props}
      variants={variants}
    />
  );
};

const NavBar: React.FC<{
  style?: React.CSSProperties;
  children: React.ReactNode;
  ui: React.ReactNode;
  className?: string;
}> = props => {
  const { style, children, ui, className } = props;

  const [open, setOpen] = useState(false);

  const draggableRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(draggableRef, (outside: boolean) => {
    outside && setOpen(false);
  });

  const onDragEnd = (_: any, info: any): void => {
    const dist = +info?.point?.x;

    // console.log('dist', dist);
    const threshold = 15;
    if (dist !== 0) {
      if (dist < threshold) {
        setOpen(false);
      }
    }
  };

  return (
    <div
      ref={draggableRef}
      className={`relative z-30 w-full ${className}`}
      style={{ ...style }}>
      <div
        className="navbar flex items-center relative m-2 w-full"
        style={{ minHeight: 48 }}>
        <button
          className="border-4 shadow border-black cursor-pointer p-1 z-30 flex flex-col items-center bg-white"
          onClick={(): void => {
            setOpen(!open);
          }}
          type="button">
          <img src={IcAk} alt="menu-icon" className="m-1" />
        </button>
        {ui}
      </div>
      <Draggable
        dragConstraints={{ left: -320, right: 0, top: 0, bottom: 0 }}
        className="ml-2 absolute bg-white shadow border-2 border-black"
        onDragEnd={onDragEnd}
        animate={open ? 'open' : 'closed'}
        style={{
          width: '50vw',
          // TODO change
          maxWidth: 350
        }}>
        <div className="p-3 flex flex-col">{children}</div>
      </Draggable>
    </div>
  );
};

const DefaultLayout: React.SFC<{
  children: React.ReactNode;
  // activePath,
  userEnv: UserEnv;
  menu: React.ReactNode;
  style: React.CSSProperties;
  authUser: AuthUser;
  screenResize: Function;
  navBarVisible: boolean;
  className?: string;
  height: number;
}> = props => {
  const {
    children,
    // activePath,
    className,
    userEnv,
    menu,
    style,
    authUser,
    screenResize,
    navBarVisible = true,
    height
  } = props;

  const ref = React.useRef<HTMLDivElement>({
    clientWidth: 0
  } as HTMLDivElement);

  useEffect(() => {
    const width = ref.current.clientWidth; // window.innerWidth;

    // TODO check overflow
    // TODO check overflow
    // TODO check overflow
    // TODO check overflow
    // TODO check overflow
    const innerHeight = (): number =>
      // TODO
      window.innerHeight < 700
        ? window.innerHeight
        : ref.current.clientHeight;
    // document
    //   .getElementById('body')
    //   .setAttribute('style', `height:${height}px`);
    //

    screenResize({
      // ...getBrowser(),
      width,
      height: innerHeight()
    });

    const resize = (): void => {
      const w = ref.current.clientWidth;

      const h = innerHeight();

      screenResize({
        // ...getBrowser(),
        width: w,
        height: h
      });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);

    return (): void => {
      window.removeEventListener('orientationchange', resize);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className={clsx('flex flex-col items-center flex-grow w-full h-full')}
      style={{}}>
      <div
        className={`${css.contentContainer} flex flex-col flex-grow ${className} md:w-3/4`}
        style={{ ...style }}
        ref={ref}>
        <div className="flex flex-shrink-0 w-full">
          {authUser && navBarVisible && (
            <NavBar ui={menu}>
              <div className="text-xl font-bold uppercase mb-2">
                {userEnv}
              </div>
              <RouteNavigation>
                {({ name }: { name: string }): string => name}
              </RouteNavigation>
            </NavBar>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStateType): object => ({
  ...state.Screen,
  ...state.Session
});

// TODO
// does not work with RootAction
const mapDispatchToProps = (dispatch: Dispatch<any>): any =>
  bindActionCreators(screenActions, dispatch);

const mergeProps = (
  stateProps: object,
  dispatchProps: object,
  ownProps: object
): object => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

// TODO
const ConnectedDefaultLayout: any = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DefaultLayout);

export default ConnectedDefaultLayout;
