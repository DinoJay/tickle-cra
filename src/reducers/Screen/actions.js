import { SCREEN_RESIZE } from './types';
export function screenResize(options) {
    return {
        type: SCREEN_RESIZE,
        options
    };
}
