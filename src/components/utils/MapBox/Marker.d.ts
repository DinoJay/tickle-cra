import React from 'react';
import { LngLat } from '~/constants/typeUtils';
declare const Marker: React.FC<{
    longitude: number;
    latitude: number;
    className?: string;
    draggable?: boolean;
    onClick?: ({ latitude, longitude, id }: LngLat & {
        id: string;
    }) => any;
    onDragEnd?: (a: LngLat) => any;
    color?: string;
    element?: React.ReactNode;
    id?: string;
    popupEl?: JSX.Element;
}>;
export default Marker;
