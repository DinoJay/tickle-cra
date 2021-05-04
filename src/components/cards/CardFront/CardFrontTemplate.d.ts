import React from 'react';
import { Card } from '~/constants/cardFields';
export declare const ImgOverlay: React.FC<{
    src?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: Function;
    contain?: boolean;
}>;
declare type Field = {
    key: string;
    label: string;
    node: React.ReactNode;
    required: boolean;
};
interface CardFrontTemplateType extends Card {
    style: React.CSSProperties;
    onCardUpdate: Function;
    className?: string;
    onClose: Function;
    onFlip: Function;
    bottomControls: React.ReactNode;
    onResetField: Function;
    fieldNodes: Field[];
}
declare const CardFrontTemplate: React.FC<CardFrontTemplateType>;
export default CardFrontTemplate;
