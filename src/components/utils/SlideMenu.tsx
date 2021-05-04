import React, {CSSProperties} from 'react';
import {motion} from 'framer-motion';

import menuIconSrc from '~/styles/menu_icons/menuIconStolen.svg';

interface SlideMenuProps {
  className?: string;
  style?: CSSProperties;
  children?: any;
  visible: boolean;
  onClick: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({
  className,
  style,
  children,
  visible,
  onClick
}) => (
  <div
    tabIndex={-1}
    className={`${className} z-10 relative`}
    style={{outline: 'none'}}
    onBlur={e => {
      e.stopPropagation();
      e.preventDefault();
      // setTimeout(() => setVisible(false), 100);
    }}>
    <div className="flex-grow flex justify-end cursor-pointer">
      <div
        onClick={onClick}
        className="flex justify-center mr-2 p-1 bg-white"
        style={{width: 40, height: 40}}>
        <img src={menuIconSrc} alt="nav" />
      </div>
    </div>
    <motion.div
      positionTransition
      className="mt-2 absolute flex flex-col"
      style={{
        right: visible ? 0 : '-100vw',
        width: '30vw',
        maxWidth: 500,
        ...style
        // transition: 'right 200ms'
      }}>
      <div className="flex-grow ml-2 p-2 overflow-y-auto border-2 border-black shadow bg-white">
        {children}
      </div>
    </motion.div>
  </div>
);

export default SlideMenu;
