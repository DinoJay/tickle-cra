import React from 'react';
import css from './PreviewTag.scss';
import {Img} from '~/constants/typeUtils';

const PreviewTag: React.FC<{
  onClick?: Function;
  img?: Img;
  title: string;
  url?: string;
  style?: React.CSSProperties;
  className?: string;
  points?: number;
  footer?: JSX.Element;
  selected?: boolean;
  // acquired: boolean;
}> = props => {
  const {
    onClick,
    img,
    title,
    url,
    style,
    className,
    points,
    footer = null,
    selected = false
    // acquired = false
  } = props;

  const bgStyle = {
    flexGrow: 100,
    backgroundImage: `url(${img ? img.url : url}) `,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  return (
    <div
      className={`${
        css.previewTag
      } flex flex-col shadow-md ${className}`}
      style={{
        ...style,
        transform: selected ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 300ms'
      }}
      onClick={(e): void => onClick && onClick(e)}>
      <div className="bg-black flex flex-col justify-between items-center text-white uppercase font-bold text-base p-1">
        <div
          className="text-sm "
          style={
            {
              // wordBreak: 'all',
              // TODO: multiline break
              // 'webkit-line-break': 1
              // height: '12rem'
            }
          }>
          {title}
        </div>
      </div>
      <div className="w-full flex-grow" style={bgStyle} />
      {!!points && Number.isInteger(points) && points > 1 && (
        <div className="p-1">{`${points}XP`}</div>
      )}
      {footer && (
        <div className="absolute left-0 bottom-0">{footer}</div>
      )}
    </div>
  );
};

export default PreviewTag;
