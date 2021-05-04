import React from 'react';
import uuidv1 from 'uuid/v1';
import clsx from 'clsx';
const RadioBtn = ({ children, className, checked, onChange }) => {
    const uid = uuidv1();
    return (React.createElement("div", { className: clsx('flex items-center ', className) },
        React.createElement("input", { id: uid, type: "radio", name: "radio", className: "hidden", checked: checked, onChange: onChange }),
        React.createElement("label", { htmlFor: uid, className: "flex flex-grow items-center cursor-pointer " },
            React.createElement("span", { className: "w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" }),
            children)));
};
export default RadioBtn;
