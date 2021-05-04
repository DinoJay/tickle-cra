import { useEffect } from 'react';
const useClickOutside = (draggableRef, callback) => {
    useEffect(() => {
        const clickOutside = (e) => {
            const domNode = draggableRef.current;
            if (!domNode.contains(e.target)) {
                callback(true);
            }
            else {
                callback(false);
            }
        };
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, []);
};
export default useClickOutside;
