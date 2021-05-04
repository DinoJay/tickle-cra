export const SCREEN_RESIZE = 'SCREEN_RESIZE';

export interface ScreenResizeType {
  type: typeof SCREEN_RESIZE;
  options: {width?: number | null; height?: number | null};
}

export type ScreenActionTypes = ScreenResizeType;
