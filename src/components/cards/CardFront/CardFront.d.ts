import React from 'react';
import { Card } from '~/constants/cardFields';
import { RouterTypes } from '~/constants/typeUtils';
export declare const ImgOverlay: React.FC<{
    src: string | null;
    className: string;
    style: React.CSSProperties;
    onClick?: Function;
    onLeftClick?: Function;
    onRightClick?: Function;
    contain: boolean;
}>;
export declare const TextField: React.FC<{
    onClick: Function;
    extended: boolean;
    className?: string;
    style?: React.CSSProperties;
    value: string;
}>;
export declare const TitleField: React.FC<{
    onClick: Function;
    className?: string;
    value: string;
    style?: React.CSSProperties;
}>;
interface CardFrontInterface extends Card, RouterTypes {
    style: React.CSSProperties;
    onClose: Function;
    onTitleClick?: Function;
    onFlip: Function;
    className?: string;
    setDialogKey: Function;
    onHelpClick?: Function;
    addActivitySubmission: Function;
    toggleUserview: Function;
}
declare const CardFront: React.FC<CardFrontInterface>;
export default CardFront;
