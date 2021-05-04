import React from 'react';
import cx from './Flipper.scss';

const Flipper: React.FC<{
  flipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  frontClassName?: string;
  backClassName?: string;
  style?: React.CSSProperties;
  onClick?: Function;
}> = ({
  flipped,
  front,
  back,
  className,
  frontClassName,
  backClassName,
  style = {},
  onClick
}) => (
  <div
    style={style}
    onClick={(): void => onClick && onClick()}
    className={`${cx.flipContainer} ${flipped &&
      cx.flip} ${className}`}>
    <div
      className={`flex flex-col flex-grow ${cx.flipper} ${flipped &&
        cx.flip}`}>
      <div
        className={`${cx.front} ${frontClassName}`}
        style={{pointerEvents: flipped ? 'none' : undefined}}>
        {front}
      </div>
      <div
        className={`${cx.back} ${backClassName}`}
        style={{
          pointerEvents: !flipped ? 'none' : undefined
        }}>
        {back}
      </div>
    </div>
  </div>
);

export default Flipper;
