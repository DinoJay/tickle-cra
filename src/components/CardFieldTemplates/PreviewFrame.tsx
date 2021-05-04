import React from 'react';

import Edit from 'react-feather/dist/icons/edit';

const EditIcon: React.FC<{
  // edit: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: Function;
}> = ({className, style, onClick}) => (
  <div
    className={`text-black ${className}`}
    onClick={() => onClick && onClick()}
    style={style}>
    <Edit size={30} />
  </div>
);

const PreviewFrame: React.FC<{
  onClick: Function;
  empty: boolean;
  placeholder: string;
  className?: string;
  style?: React.CSSProperties;
  type: string;
  content: Function;
}> = ({
  onClick,
  empty,
  placeholder = 'empty',
  className = '',
  style,
  type,
  content
}) => (
  <div
    style={style}
    className={`${className} text-2xl overflow-hidden flex-no-grow cursor-pointer items-center`}
    onClick={(): void => onClick()}>
    <div
      className={`flex items-center justify-between capitalize font-bold ${empty &&
        'text-grey'} mr-1`}>
      <div>{type}</div>
      <div className="ml-auto hidden">
        <EditIcon />
      </div>
    </div>

    {!empty && (
      <div className="flex-no-grow flex-shrink text-truncate">
        {content()}
      </div>
    )}
    {empty && (
      <span className="text-grey capitalize">{placeholder}</span>
    )}
  </div>
);

export default PreviewFrame;
