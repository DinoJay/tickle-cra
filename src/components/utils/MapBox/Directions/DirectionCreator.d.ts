import React from 'react';
import { WP } from './Waypoints';
export declare type Route = {
    id: string;
    waypoints: WP[];
    geometry: null | string;
    loading: boolean;
};
declare type MapBoxDirectionsType = {
    waypoints: WP[];
    addWayPoint?: (a: WP) => any;
    updateWayPoint?: (a: WP) => any;
    route: Route;
    setRoute?: Function;
    onWaypointClick: (id: string) => any;
    draggable?: boolean;
};
declare const MapBoxDirections: React.FC<MapBoxDirectionsType>;
export default MapBoxDirections;
