import React, {useState, useEffect} from 'react';

export default function useSize(ref: React.RefObject<HTMLElement>) {
  function getBoundingClientRect() {
    if (ref.current) {
      return {
        ...ref.current.getBoundingClientRect(),
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      };
    }
    return {width: 0, height: 0};
  }

  // TODO: more
  const [value, setValue] = useState({width: 0, height: 0});

  function update() {
    setValue(getBoundingClientRect());
  }

  useEffect(() => {
    update();
  }, [ref.current]);

  // useMutationObserver(ref, update);

  return value;
}

// export default useBoundingclientRect;
