import { USER_MOVE, CHANGE_MAP_VIEWPORT, SET_LOCS } from './types';
export function userMove(options) {
    return { type: USER_MOVE, options };
}
export function setLocs(options) {
    return { type: SET_LOCS, options };
}
export function changeMapViewport(options) {
    return { type: CHANGE_MAP_VIEWPORT, options };
}
