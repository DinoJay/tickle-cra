import React from 'react';
import { AnimatePresence } from 'framer-motion';
const GridSelect = props => {
    const { selectedKey, elements } = props;
    const selected = elements.find(c => c.key === selectedKey);
    return (React.createElement(AnimatePresence, null, selectedKey ? selected.detail : elements.map(d => d.preview)));
};
export default GridSelect;
