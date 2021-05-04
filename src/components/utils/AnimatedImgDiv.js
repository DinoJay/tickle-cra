import React from 'react';
import { motion } from 'framer-motion';
const ImgDiv = ({ src, style, className, ...rest }) => (React.createElement(motion.div, Object.assign({ className: className, style: {
        ...style,
        backgroundImage: `url("${src}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    } }, rest)));
export default ImgDiv;
