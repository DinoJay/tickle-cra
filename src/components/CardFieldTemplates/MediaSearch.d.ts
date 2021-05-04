import React from 'react';
import { Video } from './Videos';
export declare const MediaSearch: React.FC<{
    searchFn: Function;
    defaultQuery?: string;
    onChange: Function;
    Element: any;
    selectedData: Video[];
}>;
export declare const MediaOverview: React.FC<{
    data: Video[];
    className?: string;
    Element: any;
}>;
export declare const EditMediaOverview: React.FC<{
    className?: string;
    data: Video[];
    videoIdFn: Function;
    onChange: Function;
    Element: any;
}>;
