import React, { CSSProperties } from "react";
import { Map } from "mapbox-gl";
import { Card } from "~/constants/cardFields";
import { LngLat as LngLatType } from "~/constants/typeUtils";
interface CompassProps {
    className?: string;
    selectedCardId: string;
    userLocation: LngLatType;
    map: Map;
    cards: Card[];
    style?: CSSProperties;
}
declare const Compass: React.FC<CompassProps>;
export default Compass;
