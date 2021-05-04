import React, { CSSProperties } from 'react';
import { Card } from '~/constants/cardFields';
interface CardPanelProps {
    className?: string;
    cards: Card[];
    userEnvId: string;
    height: number;
    style: CSSProperties;
    routeSelectExtend: Function;
    fetchAllCardsWithSubmissions: Function;
    fetchCardTemplates: any;
    open: boolean;
    onClick: () => void;
}
declare const CardPanel: React.FC<CardPanelProps>;
export default CardPanel;
