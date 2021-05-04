import React from 'react';
import uuidv1 from 'uuid/v1';
import clsx from 'clsx';

const RadioBtn: React.FC<any> = ({children, className, checked, onChange}) => {
  const uid = uuidv1();
  return (
    <div className={clsx('flex items-center ', className)}>
      <input
        id={uid}
        type="radio"
        name="radio"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={uid}
        className="flex flex-grow items-center cursor-pointer ">
        <span className="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
        {children}
      </label>
    </div>
  );
};
export default RadioBtn;
