import {ScreenActionTypes, SCREEN_RESIZE} from './types';

export function screenResize(options: {
  width: number | null;
  height: number | null;
}): ScreenActionTypes {
  return {
    type: SCREEN_RESIZE,
    options
  };
}
