import {
  USER_MOVE,
  CHANGE_MAP_VIEWPORT,
  SET_LOCS,
  MapActionTypes
} from './types';

interface LngLat {
  latitude: number;
  longitude: number;
}

export function userMove(options: LngLat): MapActionTypes {
  return {type: USER_MOVE, options};
}
export function setLocs(options: any[]): MapActionTypes {
  return {type: SET_LOCS, options};
}

export function changeMapViewport(options: LngLat): MapActionTypes {
  return {type: CHANGE_MAP_VIEWPORT, options};
}
