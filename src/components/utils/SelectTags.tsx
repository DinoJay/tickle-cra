import React, { useState, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import ArrowDown from 'react-feather/dist/icons/arrow-down';

const SelectElement: React.FC<{
  className?: string;
  inputClassName?: string;
  liClassName?: string;
  style?: React.CSSProperties;
  onSelect: Function;
  values: any[];
  valueAcc: Function;
  idAcc: Function;
  placeholder?: string;
  onFocus?: Function;
  onBlur?: Function;
  value: string;
  onInputChange: Function;
  orientation?: string;
  type?: string;
  ulClassName?: string;
  filterFn?: Function;
  defaultValue?: string;
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
    value,
    onInputChange,
    orientation = 'down',
    ulClassName,
    defaultValue = 'Select Topic'
  } = props;

  const [focus, setFocus] = useState(false);

  const list = (
    <motion.ul
      className={clsx(
        ' bg-white px-2 list-reset z-10 w-full overflow-y-auto ',
        ulClassName,
        focus && 'bg-white w-full border-l-2 border-r-2 border-b-2'
      )}
      animate={{ height: focus ? 'auto' : 0 }}>
      {values.map((x, i) => (
        <motion.li
          key={idAcc(x)}
          exit={{ opacity: 0 }}
          className={clsx(
            liClassName,
            'cursor-pointer ',
            i < values.length - 1 ? 'border-b ' : 'mb-1'
          )}
          onMouseDown={(e): void => e.preventDefault()}
          onClick={(): void => {
            setFocus(false);
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
        onClick={(): void => {
          setFocus(!focus);
          onFocus?.();
        }}>
        <div
          role="button"
          className={clsx(
            inputClassName,
            'flex justify-between items-center'
          )}>
          <div>{value || defaultValue}</div>
          <ArrowDown />
        </div>
      </div>
      {orientation === 'down' && list}
    </div>
  );
};

interface SelectTagsProps {
  values: any[];
  className?: string;
  ulClassName?: string;
  idAcc: Function;
  placeholder: string;
  btnContent?: any;
  onChange?: Function;
  inputClassName?: string;
  liClassName?: string;
  valueAcc: Function;
  style?: CSSProperties | undefined;
  onSelect?: Function;
  orientation?: string;
  defaultValue?: string;
  placeholder?: string
  // onChange?: Function;
}

const SelectTags: React.FC<SelectTagsProps> = props => {
  const {
    className,
    placeholder,
    btnContent,
    style,
    onSelect,
    valueAcc,
    idAcc,
    values,
    liClassName,
    onChange
  } = props;

  const [inputValue, setInputValue] = useState<string | null>(null);
  const [tag, setTag] = useState<{ id: string } | null>(null);

  return (
    <div className={`flex ${className} items-start`} style={style}>
      <SelectElement
        idAcc={idAcc}
        values={values}
        key="tags"
        {...props}
        liClassName={liClassName}
        className="flex-grow bg-white"
        inputClassName="p-2 w-full border-2 bg-white"
        value={inputValue || ''}
        placeholder={placeholder}
        onInputChange={setInputValue}
        onSelect={(val: any) => {
          setTag(val);
          setInputValue(valueAcc(val));
          onChange?.(val);
        }}
      />

      {btnContent && (
        <button
          type="button"
          className="ml-2 bg-white btn p-2 border-2 h-11"
          onClick={() => {
            if (tag) {
              onSelect && onSelect(tag);
              setInputValue('');
            }
          }}>
          {btnContent}
        </button>
      )}
    </div>
  );
};

export default SelectTags;
