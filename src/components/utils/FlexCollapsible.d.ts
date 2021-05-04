import React from 'react';
export default function FlexCollapsible(props: {
    onClick: Function;
    open: boolean;
    header?: React.ReactNode | string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className: string;
    footer: React.ReactNode;
}): JSX.Element;
export declare const Footer: React.SFC<{
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}>;
