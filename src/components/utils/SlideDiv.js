import React from 'react';
import { motion } from 'framer-motion';
// Motion
const SlideDiv = props => {
    const variants = {
        enter: { opacity: 1, transition: { duration: 0.6 } },
        exit: { opacity: 0, transition: { duration: 0.4 } }
    };
    return (React.createElement(motion.div, Object.assign({ initial: "hidden", animate: "visible" }, props, { variants: variants })));
};
export default SlideDiv;
