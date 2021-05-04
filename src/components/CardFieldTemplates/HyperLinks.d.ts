import React from 'react';
import { ModalProps } from '~/components/utils/Modal';
import { Hyperlinks } from '~/constants/cardFields';
export declare const key = "hyperlinks";
export declare const label = "Links";
export declare const ModalContent: React.FC<{
    hyperlinks: Hyperlinks;
    onChange: Function;
    modalProps: ModalProps;
}>;
export declare const View: React.FC<{
    onClick: Function;
    hyperlinks: Hyperlinks;
    onClose: Function;
    modalProps: any;
}>;
export declare const Preview: React.FC<{
    onClick: Function;
    hyperlinks: Hyperlinks;
}>;
