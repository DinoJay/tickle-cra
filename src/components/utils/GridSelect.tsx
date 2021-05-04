import React from 'react';
import {AnimatePresence} from 'framer-motion';

interface GridSelectProps {
  selectedKey: string;
  elements: any[];
}

const GridSelect: React.FC<GridSelectProps> = props => {
  const {selectedKey, elements} = props;
  const selected = elements.find(c => c.key === selectedKey);

  return (
    <AnimatePresence>
      {selectedKey ? selected.detail : elements.map(d => d.preview)}
    </AnimatePresence>
  );
};

export default GridSelect;
