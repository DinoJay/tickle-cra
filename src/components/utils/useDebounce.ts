import  {useEffect} from 'react';
// import useDeepCompareMemoize from './useDeepCompareMemoize';

export default function useDebounce(
  fn: Function,
  arr: any[],
  delay: number
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      fn();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, arr);
}
