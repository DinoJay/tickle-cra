import React from 'react';
import useDidUpdateEffect from './useDidUpdateEffect';

export default function useResetUpdate(fn, arr, wait) {
  const timeoutRef = React.useRef();
  useDidUpdateEffect(() => {
    const id = timeoutRef.current;
    clearTimeout(id);
    const newId = setTimeout(() => fn(), wait);
    timeoutRef.current = newId;
    return () => clearTimeout(id);
  }, arr);
}
