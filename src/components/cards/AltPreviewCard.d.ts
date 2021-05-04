import React from 'react';
import { Img } from '~/constants/typeUtils';
/**
 * PreviewCard component for CardSlide Show
 */
declare const PreviewCard: React.FC<{
    title?: string | null;
    topics?: string[];
    img?: Img | null;
    style?: React.CSSProperties;
    onClick?: Function;
    className: string;
}>;
export default PreviewCard;
