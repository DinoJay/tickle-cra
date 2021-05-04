import React, {useState, useEffect} from 'react';

const Flicker: React.FC<{
  interval: number;
  src1: string;
  src2: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
}> = props => {
  const {interval, src1, src2, alt = 'img', style, className} = props;
  const [src, setSrc] = useState(src1);

  useEffect(() => {
    const id = setInterval(() => {
      setSrc(s => (s === src1 ? src2 : src1));
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return (
    <img src={src} alt={alt} style={style} className={className} />
  );
};
export default Flicker;
