import React from 'react';
import { motion } from 'framer-motion';
const Draggable = props => {
    const { dragConstraints, closedX, openX } = props;
    const variants = {
        closed: {
            x: (closedX !== null && closedX !== void 0 ? closedX : '-120%'),
            transition: { ease: 'backInOut', duration: 0.3 }
        },
        open: {
            x: (openX !== null && openX !== void 0 ? openX : '0%'),
            transition: { ease: 'backInOut', duration: 0.3 }
        }
    };
    return (React.createElement(motion.div, Object.assign({ drag: "x", dragConstraints: dragConstraints, dragElastic: 0, initial: "closed", animate: "closed" }, props, { variants: variants })));
};
export default Draggable;
