import React from 'react';

// import CloseCorner from './CloseCorner';
// import FlipCorner from './FlipCorner';

import closeSrc from '~/styles/menu_icons/close-white.svg';
import reverseSrc from '~/styles/menu_icons/reverse_wh.svg';
import RightTriangleBtn from '~/components/utils/RightTriangleBtn';
import LeftTriangleBtn from '~/components/utils/LeftTriangleBtn';

const CardControls: React.FC<{
  onFlip: Function;
  onClose: Function;
  style?: React.CSSProperties;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}> = props => {
  const {
    onFlip,
    onClose,
    children,
    style,
    left = <img alt="close" src={closeSrc} width="28" height="28" />,
    right = <img alt="turn" src={reverseSrc} width="30" height="30" />,
    className
  } = props;

  return (
    <div
      className={`${className} flex items-end mt-auto justify-between`}
      style={style}>
      <LeftTriangleBtn onClick={onClose}>{left}</LeftTriangleBtn>
      {children}
      <RightTriangleBtn onClick={onFlip}>{right}</RightTriangleBtn>
    </div>
  );
};

// CardControls.defaultProps = {style: {}, children: null, className: ''};

export default CardControls;
