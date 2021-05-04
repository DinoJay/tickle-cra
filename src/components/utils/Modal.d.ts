import React from 'react';
export declare const BlackModal: React.FC<ModalInterface>;
interface ModalInterface {
    visible?: boolean;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    topMargin?: boolean;
    zIndex?: number;
    background?: boolean;
}
export declare const InlineModal: React.SFC<ModalInterface>;
export declare const Modal: any;
export interface ModalProps {
    footer?: React.ReactNode;
    style?: React.CSSProperties;
    title?: string;
    header?: JSX.Element;
    className?: string;
    onClose: Function;
    headerClassName?: string;
    footerClassName?: string;
}
export declare const ModalBody: React.SFC<ModalProps>;
export {};
