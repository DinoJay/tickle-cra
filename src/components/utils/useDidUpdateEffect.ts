import React, {useEffect} from 'react';
/**
 * utility react hook for componentDidUpdate
 */
export default function useDidUpdateEffect(fn:Function, inputs:unknown[]) {
  const didMountRef = React.useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}
