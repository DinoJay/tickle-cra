import React from 'react';
import { Img } from '~/constants/typeUtils';
export declare const ATTRACTION = "ATTRACTION";
export declare const STAR = "STAR";
export declare const ANIMAL = "ANIMAL";
export declare const DEFAULT = "DEFAULT";
export declare const wpTypes: string[];
export declare type WPtype = typeof ATTRACTION | typeof STAR | typeof ANIMAL | typeof DEFAULT;
export declare type WP = {
    text?: string;
    img?: Img;
    type: WPtype;
    loc: [number, number];
    label: string;
    id: string;
    order: number;
};
export declare const getLocName: ({ latitude, longitude, onChange }: {
    latitude: number | null;
    longitude: number | null;
    onChange: Function;
}) => void;
declare type WaypointsType = {
    waypoints: WP[];
    onClick: (a: string) => any;
    removeWayPoint: Function;
    style?: React.CSSProperties;
    className: string;
    disabled: boolean;
};
declare const WayPoints: React.FC<WaypointsType>;
export default WayPoints;
