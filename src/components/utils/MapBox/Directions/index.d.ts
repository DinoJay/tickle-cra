import React from 'react';
import { LngLat } from '~/constants/cardFields';
declare const Directions: React.FC<{
    origin: LngLat;
    destination: LngLat;
    onChange: Function;
    bboxPadding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    fitBounds: boolean;
}>;
export default Directions;
