import React from 'react';
import {motion} from 'framer-motion';

// Motion
const SlideDiv: React.FC<any> = props => {
  const variants = {
    enter: {opacity: 1, transition: {duration: 0.6}},
    exit: {opacity: 0, transition: {duration: 0.4}}
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      {...props}
      variants={variants}
    />
  );
};
export default SlideDiv;
