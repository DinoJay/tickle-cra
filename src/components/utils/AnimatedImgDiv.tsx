import React from 'react';

import {motion} from 'framer-motion';


const ImgDiv: React.FC<{
  src: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({src, style, className, ...rest}) => (
  <motion.div
    className={className}
    style={{
      ...style,
      backgroundImage: `url("${src}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}
    {...rest}
  />
);
export default ImgDiv;
