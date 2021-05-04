import {useMemo} from 'react';

import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export default function useMemoize(value: unknown): unknown {
  const getMemoized = useMemo(() => {
    let memoized: unknown;
    let tmp: unknown;
    return (current: unknown): unknown => {
      if (!isEqual(current, memoized)) {
        tmp = cloneDeep(memoized);
        memoized = current;
      }
      return tmp;
    };
  }, []);
  return getMemoized(value);
}
