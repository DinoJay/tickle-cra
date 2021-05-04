import React from 'react';

const BackgroundImg: React.FC<{
  onClick?: Function;
  style?: React.CSSProperties;
  src: string;
  contain?: boolean;
  className?: string;
}> = ({style, src, contain, onClick, ...restProps}) => (
  <div
    onClick={() => onClick && onClick()}
    style={{
      backgroundImage: `url(${src}) `,
      backgroundSize: contain ? 'contain' : 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      ...style
    }}
    {...restProps}
  />
);
export default BackgroundImg;
