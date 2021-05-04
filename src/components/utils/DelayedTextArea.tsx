import React, {useState} from 'react';
import clsx from 'clsx';
import useDebounce from './useDebounce';

const DelayedTextArea: React.FC<{
  value: string;
  onChange: Function;
  className?: string;
  style?: React.CSSProperties;
  rows?: number;
  placeholder?: string;
}> = props => {
  const {value, onChange, className, style, placeholder, rows} = props;

  const [text, setText] = useState(value);

  // Strange behaviour with the delayed text field
  useDebounce(
    () => {
      console.log('text', text);
      if (text) onChange(text);
    },
    [text],
    // Maybe it is too big this value
    2000
  );

  return (
    <textarea
      className={clsx('border-2 w-full', className)}
      style={style}
      rows={rows || 4}
      placeholder={placeholder || 'Write your response'}
      {...props}
      value={text}
      onChange={e => {
        setText(e.target.value);
      }}
    />
  );
};

export default DelayedTextArea;
