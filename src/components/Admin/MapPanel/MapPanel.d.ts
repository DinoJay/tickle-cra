import React from 'react';
import { Card } from '~/constants/cardFields';
import UserEnv from '~/constants/userEnvType';
declare type Loc = {
    latitude: number;
    longitude: number;
};
declare const MapPanelWrapper: React.FC<{
    envs: UserEnv[];
    userEnvId: string;
    open: boolean;
    onClick: Function;
    className?: string;
    userLocation: Loc;
    cards: Card[];
    asyncUpdateCard: ({ cardData, userEnvId }: {
        cardData: Card;
        userEnvId: string;
    }) => any;
    routeSelectExtend: Function;
    style: React.CSSProperties;
}>;
export default MapPanelWrapper;
