import React, {useState} from 'react';
import clsx from 'clsx';
import {motion, AnimatePresence} from 'framer-motion';

type Field = {
  key: string;
  label: string | React.ReactNode;
};

const SelectField: React.FC<{
  className: string;
  selectedClassName: string;
  optionClassName: string;
  style?: React.CSSProperties;
  onChange: Function;
  values: Field[];
  selectedId: string | null;
}> = ({
  className,
  selectedClassName,
  optionClassName,
  onChange,
  values = [],
  selectedId
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const selected = values.find(v => v.key === selectedId) || null;

  return (
    <div className={`${className} relative z-10`}>
      <div
        className={`h-full cursor-pointer ${selectedClassName}`}
        onClick={() => setVisible(!visible)}
        onBlur={() => setVisible(false)}>
        {selected && selected.label}
      </div>

      <motion.div className="fixed  w-3/4">
        {visible && (
          <AnimatePresence>
            <motion.ul
              key="ul"
              initial={{opacity: 0, height: 0}}
              animate={{
                opacity: 1,
                height: 'auto',
                // transition: {
                //   staggerChildren: 0.01,
                //   delayChildren: 0.3
                // }
              }}
              exit={{opacity: 0, height: 0}}
              className="mt-2 list-reset p-2 z-10 bg-white border border-black shadow">
              {values.map((x: Field) => (
                <motion.li
                  className={clsx(
                    optionClassName,
                    x.key === selectedId && 'bg-gray-500',
                    'cursor-pointer'
                  )}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    setVisible(false);
                    onChange(x);
                  }}>
                  {x.label}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default SelectField;
