import React from 'react';
import { Img } from '~/constants/typeUtils';
declare const PreviewTag: React.FC<{
    onClick?: Function;
    img?: Img;
    title: string;
    url?: string;
    style?: React.CSSProperties;
    className?: string;
    points?: number;
    footer?: JSX.Element;
    selected?: boolean;
}>;
export default PreviewTag;
