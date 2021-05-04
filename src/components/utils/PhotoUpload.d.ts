import React from 'react';
import { Img } from '~/constants/typeUtils';
export declare const PhotoUpload: React.FC<{
    className?: string;
    style?: React.CSSProperties;
    onChange: Function;
    id?: string | null;
    onLoadChange?: Function;
    uploadBtn?: React.ReactNode;
    sizeBtn?: React.ReactNode;
    folder?: string;
}>;
export declare const PhotoPreview: React.FC<{
    url?: string | null;
    style?: React.CSSProperties;
    onChange: (a: Img) => any;
    className?: string;
    name?: string;
    edit?: boolean;
    shrinkable?: boolean;
    uploadBtn?: React.ReactNode;
    contain?: boolean;
}>;
export default PhotoPreview;
