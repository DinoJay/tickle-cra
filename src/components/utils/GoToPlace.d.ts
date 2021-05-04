import React from 'react';
import { LngLat } from '~/constants/cardFields';
declare const GoToPlace: React.FC<{
    onSelect: Function;
    className?: string;
    location: LngLat;
    onLabelChange: Function;
    label: string;
    locField: string;
    input: boolean;
    style: React.CSSProperties;
}>;
export default GoToPlace;
