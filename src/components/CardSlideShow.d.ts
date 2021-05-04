import React, { CSSProperties } from 'react';
interface CardSlideShowProps {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    style: CSSProperties;
    width: number;
    visibleIndex: number;
}
declare const CardSlideShow: React.FC<CardSlideShowProps>;
export default CardSlideShow;
