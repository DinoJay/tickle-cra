import React, { useState, useEffect } from 'react';
// @ts-ignore
import FpsCtrl from './fpsCtrl';
/**
 * @constructor
 * @this Test
 */
const Loading = props => {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const fp = new FpsCtrl(2, () => {
            setStep(st => (st + 1) % 3);
        });
        fp.start();
        return () => fp.pause();
    }, []);
    const arr = new Array(step).fill('a');
    return (React.createElement("div", Object.assign({}, props),
        React.createElement("h1", { className: "w-64 flex" },
            React.createElement("div", null, "Loading"),
            React.createElement("span", null, arr.map(() => (React.createElement("span", null, ".")))))));
};
export default Loading;
