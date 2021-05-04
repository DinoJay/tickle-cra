import {useState, useEffect} from 'react';

interface Dim {
  width?: number;
  height?: number;
}

export default function useWindowSize(): Dim {
  const isClient = typeof window === 'object';

  function getSize(): Dim {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState<Dim>(getSize());

  useEffect(() => {
    if (!isClient) {
      return (): boolean => false;
    }

    function handleResize(): void {
      setWindowSize(getSize());
    }
    window.addEventListener('resize', handleResize);
    return (): void =>
      window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return windowSize;
}
