import React, { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
const SelectInput = props => {
    const { className, inputClassName, liClassName, style, onSelect, values, valueAcc, idAcc, placeholder, onFocus, onBlur, value, onInputChange, orientation = 'down', type, ulClassName, filterFn = (d, val) => valueAcc(d)
        .toLowerCase()
        .includes(val.toLowerCase()) } = props;
    const [focus, setFocus] = useState(false);
    const filteredValues = values.filter(d => value === '' || value === null || filterFn(d, value));
    const visible = focus && filteredValues.length > 0;
    const list = (React.createElement(motion.ul, { className: clsx(' bg-white  list-reset z-10 w-full overflow-y-auto ', ulClassName, visible && 'p-2 bg-white w-full border-l border-r border-b'), animate: { height: visible ? 'auto' : 0 }, style: {
            pointerEvents: !visible ? 'none' : undefined
        } }, filteredValues.map((x, i) => (React.createElement(motion.li, { key: idAcc(x), exit: { opacity: 0 }, className: clsx(liClassName, 'cursor-pointer ', i < filteredValues.length - 1 && 'border-b'), onMouseDown: (e) => e.preventDefault(), onClick: () => {
            setTimeout(() => setFocus(false), 50);
            onSelect(x);
        } }, valueAcc(x))))));
    return (React.createElement("div", { className: `${className} relative`, style: style },
        React.createElement("div", { className: "flex flex-grow cursor-pointer", tabIndex: -1, onFocus: () => {
                var _a;
                setFocus(true);
                (_a = onFocus) === null || _a === void 0 ? void 0 : _a();
            }, onBlur: () => {
                var _a;
                setFocus(false);
                (_a = onBlur) === null || _a === void 0 ? void 0 : _a();
            } },
            React.createElement("input", { className: inputClassName, autoComplete: "off", value: value, placeholder: placeholder, type: type, onChange: (e) => {
                    onInputChange && onInputChange(e.target.value);
                } })),
        orientation === 'down' && list));
};
export default SelectInput;
