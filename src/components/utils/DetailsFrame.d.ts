import React from 'react';
declare const DetailsFrame: React.FC<{
    onClick: Function;
    open: boolean;
    title?: string | React.ReactNode;
    header?: React.ReactNode;
    className?: string;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    footer?: React.ReactNode;
    openClassName?: string;
    closedClassName?: string;
    overflow?: boolean;
}>;
export declare const Footer: React.FC<{
    style?: React.CSSProperties;
    className?: string;
}>;
export default DetailsFrame;
