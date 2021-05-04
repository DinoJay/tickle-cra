import {useMemo} from 'react';
import isEqual from 'lodash/isEqual';

export default function useDeepCompareMemoize(value: unknown): unknown {
  const getMemoized = useMemo(() => {
    let memoized: unknown;
    return ( current:unknown ):unknown => {
      if (!isEqual(current, memoized)) {
        memoized = current;
      }
      return memoized;
    };
  }, []);
  return getMemoized(value);
}
