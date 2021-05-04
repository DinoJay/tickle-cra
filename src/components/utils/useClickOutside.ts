import {useEffect} from 'react';

const useClickOutside = (draggableRef: any, callback: Function) => {
  useEffect(() => {
    const clickOutside = (e: any): void => {
      const domNode = draggableRef.current;
      if (!domNode.contains(e.target as any)) {
        callback(true);
      } else {
        callback(false);
      }
    };

    window.addEventListener('click', clickOutside);

    return (): void =>
      window.removeEventListener('click', clickOutside);
  }, []);
};

export default useClickOutside;
