export declare const USER_MOVE = "USER_MOVE";
export declare const SET_LOCS = "SET_LOCS";
export declare const CHANGE_MAP_VIEWPORT = "CHANGE_MAP_VIEWPORT";
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
    options: {
        latitude: number;
        longitude: number;
    };
}
export declare type MapActionTypes = UserMove | ChangeMapViewport | setDistances;
