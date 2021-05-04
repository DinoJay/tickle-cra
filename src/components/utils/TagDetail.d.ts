import React from 'react';
import { Img } from '~/constants/typeUtils';
declare const TagDetail: React.SFC<{
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    onClick?: Function;
    img?: Img;
    url?: string;
    description?: string;
}>;
export default TagDetail;
