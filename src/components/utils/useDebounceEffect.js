import React, {useEffect} from 'react';

/**
 * utility react hook for componentDidUpdate
 */

export default function useDebounceEffect(fn, inputs, wait) {
  const timeRef = React.useRef(Date.now());

  useEffect(() => {
    const newMilliSecs = Date.now();
    const diff = Math.abs(newMilliSecs - timeRef.current);
    if (diff >= wait) {
      fn();
      timeRef.current = newMilliSecs;
    }
  }, inputs);
}
