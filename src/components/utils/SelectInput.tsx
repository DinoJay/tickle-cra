import React, {useState} from 'react';
import clsx from 'clsx';

import {motion, AnimatePresence} from 'framer-motion';

const SelectInput: React.FC<{
  className?: string;
  inputClassName?: string;
  liClassName?: string;
  style?: React.CSSProperties;
  onSelect: Function;
  values: any[];
  valueAcc: Function;
  idAcc: Function;
  placeholder: string;
  onFocus?: Function;
  onBlur?: Function;
  value: string;
  onInputChange: Function;
  orientation?: string;
  type?: string;
  ulClassName?: string;
  filterFn?: Function;
}> = props => {
  const {
    className,
    inputClassName,
    liClassName,
    style,
    onSelect,
    values,
    valueAcc,
    idAcc,
    placeholder,
    onFocus,
    onBlur,
    value,
    onInputChange,
    orientation = 'down',
    type,
    ulClassName,
    filterFn = (d: any, val: string): boolean =>
      valueAcc(d)
        .toLowerCase()
        .includes(val.toLowerCase())
  } = props;

  const [focus, setFocus] = useState(false);

  const filteredValues = values.filter(
    d => value === '' || value === null || filterFn(d, value)
  );

  const visible = focus && filteredValues.length > 0;

  const list = (
    <motion.ul
      className={clsx(
        ' bg-white  list-reset z-10 w-full overflow-y-auto ',
        ulClassName,
        visible && 'p-2 bg-white w-full border-l border-r border-b'
      )}
      animate={{height: visible ? 'auto' : 0}}
      style={{
        pointerEvents: !visible ? 'none' : undefined
      }}>
      {filteredValues.map((x, i) => (
        <motion.li
          key={idAcc(x)}
          exit={{opacity: 0}}
          className={clsx(liClassName, 'cursor-pointer ', i < filteredValues.length -1 && 'border-b')}
          onMouseDown={(e): void => e.preventDefault()}
          onClick={(): void => {
            setTimeout(() => setFocus(false), 50);
            onSelect(x);
          }}>
          {valueAcc(x)}
        </motion.li>
      ))}
    </motion.ul>
  );

  return (
    <div className={`${className} relative`} style={style}>
      <div
        className="flex flex-grow cursor-pointer"
        tabIndex={-1}
        onFocus={(): void => {
          setFocus(true);
          onFocus?.();
        }}
        onBlur={(): void => {
          setFocus(false);
          onBlur?.();
        }}>
        <input
          className={inputClassName}
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={(e): void => {
            onInputChange && onInputChange(e.target.value);
          }}
        />
      </div>
      {orientation === 'down' && list}
    </div>
  );
};

export default SelectInput;
