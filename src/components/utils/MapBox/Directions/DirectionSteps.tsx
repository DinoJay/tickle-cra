import React from 'react';

import X from 'react-feather/dist/icons/x';

const DirectionSteps: React.FC<{
  summary: string;
  className?: string;
  duration: number;
  onClose: () => any;
  style?:React.CSSProperties
}> = ({summary, duration, style, className, onClose}) => (
  <div
    className={`${className} border-2 shadow border-black bg-white flex flex-col`}
    style={style}>
    <div className="p-2 font-bold lex-shrink-0 flex items-center">
      <div className="">
        <div>{summary}</div>
        <div>{Math.floor(duration / 60)} min</div>
      </div>
      <button type="button" className="ml-auto" onClick={onClose}>
        <X />
      </button>
    </div>
  </div>
);
export default DirectionSteps;
