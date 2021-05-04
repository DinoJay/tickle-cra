export const USER_MOVE = 'USER_MOVE';
export const SET_LOCS = 'SET_LOCS';
export const CHANGE_MAP_VIEWPORT = 'CHANGE_MAP_VIEWPORT';

// TODO: not used

export interface UserMove {
  type: typeof USER_MOVE;
  options: any;
}

export interface setDistances {
  type: typeof SET_LOCS;
  options: any;
}

export interface ChangeMapViewport {
  type: typeof CHANGE_MAP_VIEWPORT;
  options: {latitude: number; longitude: number};
}

export type MapActionTypes =
  | UserMove
  | ChangeMapViewport
  | setDistances;
