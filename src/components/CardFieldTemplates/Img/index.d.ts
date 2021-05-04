import React from 'react';
import { ImgField } from '~/constants/cardFields';
import { ModalProps } from '~/components/utils/Modal';
export declare const key = "img";
export declare const label = "Image";
declare type ModalContentType = {
    img: ImgField;
    id: string;
    onChange: Function;
    disabled: boolean;
    modalProps: ModalProps;
};
export declare const ModalContent: React.FC<ModalContentType>;
export declare const Preview: React.FC<{
    onClick: Function;
    img: ImgField;
}>;
export declare const View: React.FC<{
    img: ImgField;
    onClose: Function;
}>;
export {};
