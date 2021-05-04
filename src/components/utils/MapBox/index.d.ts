import React from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Marker from './Marker';
import Directions from './Directions';
import Feature from './Feature';
import Circle from './Circle';
export interface MapContextInterface {
    map: Map | null;
    updateMap: Function;
    layers: any;
}
export declare const MapContext: React.Context<MapContextInterface>;
export declare const getViewport: (m: mapboxgl.Map) => {
    zoom: number;
    longitude: number;
    latitude: number;
    width: number;
    height: number;
};
export declare const shiftCenterMap: ({ map, latitude: oldLat, longitude: oldLong }: {
    map: mapboxgl.Map;
    latitude: number;
    longitude: number;
}) => {
    longitude: number;
    latitude: number;
};
export { Marker, Directions, Feature, Circle };
declare const _default: React.ForwardRefExoticComponent<{
    style?: React.CSSProperties | undefined;
    className?: string | undefined;
    zoom: number;
    longitude: number;
    latitude: number;
    children: React.ReactNode;
    cursor?: any;
    onClick?: Function | undefined;
    width?: number | undefined;
    height?: number | undefined;
    open?: boolean | undefined;
} & React.RefAttributes<unknown>>;
export default _default;
