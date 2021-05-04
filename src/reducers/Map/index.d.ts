import { MapActionTypes } from './types';
declare type Loc = {
    latitude: number;
    longitude: number;
};
export interface MapViewStateType {
    mapSettings: any;
    userLocation: Loc;
    locs: any[];
}
declare function reducer(state: MapViewStateType | undefined, action: MapActionTypes): MapViewStateType;
export default reducer;
