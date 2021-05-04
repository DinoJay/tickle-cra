import React from 'react';
declare const PreviewFrame: React.FC<{
    onClick: Function;
    empty: boolean;
    placeholder: string;
    className?: string;
    style?: React.CSSProperties;
    type: string;
    content: Function;
}>;
export default PreviewFrame;
