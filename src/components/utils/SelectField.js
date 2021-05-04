import React, { useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
const SelectField = ({ className, selectedClassName, optionClassName, onChange, values = [], selectedId }) => {
    const [visible, setVisible] = useState(false);
    const selected = values.find(v => v.key === selectedId) || null;
    return (React.createElement("div", { className: `${className} relative z-10` },
        React.createElement("div", { className: `h-full cursor-pointer ${selectedClassName}`, onClick: () => setVisible(!visible), onBlur: () => setVisible(false) }, selected && selected.label),
        React.createElement(motion.div, { className: "fixed  w-3/4" }, visible && (React.createElement(AnimatePresence, null,
            React.createElement(motion.ul, { key: "ul", initial: { opacity: 0, height: 0 }, animate: {
                    opacity: 1,
                    height: 'auto',
                }, exit: { opacity: 0, height: 0 }, className: "mt-2 list-reset p-2 z-10 bg-white border border-black shadow" }, values.map((x) => (React.createElement(motion.li, { className: clsx(optionClassName, x.key === selectedId && 'bg-gray-500', 'cursor-pointer'), onMouseDown: e => e.preventDefault(), onClick: () => {
                    setVisible(false);
                    onChange(x);
                } }, x.label)))))))));
};
export default SelectField;
