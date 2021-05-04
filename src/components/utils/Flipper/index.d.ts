import React from 'react';
declare const Flipper: React.FC<{
    flipped: boolean;
    front: React.ReactNode;
    back: React.ReactNode;
    className?: string;
    frontClassName?: string;
    backClassName?: string;
    style?: React.CSSProperties;
    onClick?: Function;
}>;
export default Flipper;
