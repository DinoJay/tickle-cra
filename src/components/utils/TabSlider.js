import React, { useEffect } from 'react';
const TabSlider = (props, externalRef) => {
    const { children, visibleIndex, className, tabClassName = '', style } = props;
    const ref = React.useRef(null);
    useEffect(() => {
        const root = ref.current;
        const rootChildren = root && root.children;
        if (root !== null &&
            root.scrollTo &&
            rootChildren &&
            rootChildren.length > 0) {
            const el = rootChildren[visibleIndex];
            root.scrollTo({
                left: el.offsetLeft,
                behavior: 'smooth'
                // inline: 'start'
                // block: 'end'
            });
            const resize = () => {
                root.scrollTo({
                    left: el.offsetLeft
                    // inline: 'start'
                });
            };
            window.addEventListener('resize', resize);
            return () => window.removeEventListener('resize', resize);
        }
        return () => null;
    }, [visibleIndex]);
    // TODO scrolling
    // TODO scrolling
    // TODO scrolling
    // TODO scrolling
    // TODO scrolling
    // TODO scrolling
    return (React.createElement("div", { className: `${className} overflow-hidden relative flex flex-col`, style: style, ref: externalRef },
        React.createElement("div", { className: "overflow-x-hidden flex w-full flex-grow", ref: ref }, React.Children.map(children, d => (React.createElement("div", { className: `flex-none flex flex-col w-full overflow-y-auto ${tabClassName}` }, d))))));
};
export default React.forwardRef(TabSlider);
