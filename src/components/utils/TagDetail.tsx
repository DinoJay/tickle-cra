import React from 'react';
import {Img} from '~/constants/typeUtils';

const TagDetail: React.SFC<{
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  onClick?: Function;
  img?: Img;
  url?: string;
  description?: string;
  // points?: number;
  // available?: boolean;
}> = props => {
  const {
    className,
    style,
    title,
    onClick,
    img,
    description,
    // points,
    // available,
    url
  } = props;

  const bgStyle = {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${img ? img.url : url})`
  };

  return (
    <div
      className={`shadow-md cursor-pointer flex bg-white flex-col ${className}`}
      style={{...style}}
      onClick={(): void => onClick && onClick()}>
      <div className="bg-black flex justify-center w-full uppercase font-bold">
        <h1 className="m-1 truncate text-white">{title}</h1>
      </div>
      <div style={{flex: '0 0 40%', ...bgStyle}} />
      <div className="flex-grow w-full flex flex-col overflow-y-auto">
        <p className="p-4">{description || 'No Description'}</p>
      </div>
    </div>
  );
};
export default TagDetail;
