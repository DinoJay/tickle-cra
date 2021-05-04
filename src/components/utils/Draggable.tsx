import React from 'react';
import {motion} from 'framer-motion';

const Draggable: React.FC<any> = props => {
  const {dragConstraints, closedX, openX} = props;
  const variants = {
    closed: {
      x: closedX ?? '-120%',
      transition: {ease: 'backInOut', duration: 0.3}
    },
    open: {
      x: openX ?? '0%',
      transition: {ease: 'backInOut', duration: 0.3}
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

export default Draggable;
