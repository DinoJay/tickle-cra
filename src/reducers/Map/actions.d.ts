import { MapActionTypes } from './types';
interface LngLat {
    latitude: number;
    longitude: number;
}
export declare function userMove(options: LngLat): MapActionTypes;
export declare function setLocs(options: any[]): MapActionTypes;
export declare function changeMapViewport(options: LngLat): MapActionTypes;
export {};
