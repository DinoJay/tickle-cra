import { useEffect } from 'react';
// import useDeepCompareMemoize from './useDeepCompareMemoize';
export default function useDebounce(fn, arr, delay) {
    useEffect(() => {
        const handler = setTimeout(() => {
            fn();
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, arr);
}
