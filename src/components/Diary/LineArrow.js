import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
export const Line = ({ height = 30, width = 12, className = '' }) => (React.createElement(motion.svg, { layoutTransition: true, width: width * 4, height: height, viewBox: `0 0 ${width * 2} ${height + 5}`, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", className: clsx(className, 'text-gray-500') },
    React.createElement(motion.line, { x1: "12", y1: "5", x2: "12", y2: height, strokeWidth: 6 })));
export const ArrowDown = ({ height = 30, width = 12, className = '' }) => (React.createElement(motion.svg, { layoutTransition: true, width: width * 4, height: height, viewBox: `0 0 ${width * 2} ${height + 5}`, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", className: clsx(className, 'text-gray-500') },
    React.createElement(motion.line, { x1: "12", y1: "5", x2: "12", y2: height, strokeWidth: 6 }),
    React.createElement(motion.polyline, { strokeWidth: 6, points: `${width + width} ${height -
            20} 12 ${height} ${0} ${height - 20}` })));
