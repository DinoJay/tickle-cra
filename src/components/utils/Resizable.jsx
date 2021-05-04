import React, {useState, useEffect} from 'react';

import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';

export default React.forwardRef(function Resizable(props, extRef) {
  const {
    children = () => null,
    onChange,
    control,
    className,
    style,
    height
  } = props;

  const ref = extRef || React.useRef();

  const [startHeight, setStartHeight] = useState(0);

  useEffect(() => {
    setStartHeight(ref.current.offsetHeight);
  }, []);

  const calcStyle = height !== null ? {...style, height} : style;

  const onMouseDown = event => {
    event.persist();
    const resize = e => {
      const h = startHeight + e.pageY - event.pageY;
      onChange(h);
    };

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', () => {
      setStartHeight(ref.current.offsetHeight);
      window.removeEventListener('mousemove', resize);
    });
  };

  const onTouchStart = event => {
    event.persist();
    const resize = e => {
      const h =
        startHeight + e.touches[0].pageY - event.touches[0].pageY;
      onChange(h);
    };
    window.addEventListener('touchmove', resize);
    window.addEventListener('touchend', () => {
      setStartHeight(ref.current.offsetHeight);
      window.removeEventListener('touchmove', resize);
    });
  };

  return (
    <div className={className} ref={ref} style={{...calcStyle}}>
      {children}
      {React.cloneElement(control, {onMouseDown, onTouchStart})}
    </div>
  );
});
