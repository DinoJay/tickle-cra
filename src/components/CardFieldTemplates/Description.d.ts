import React from 'react';
import { ModalProps } from '~/components/utils/Modal';
import { Description } from '~/constants/cardFields';
export declare const key = "description";
export declare const label = "Description";
export declare const ModalContent: React.FC<{
    onChange: Function;
    modalProps: ModalProps;
    disabled: boolean;
    description: Description;
}>;
export declare const Preview: React.FC<{
    description: Description;
    onClick: Function;
}>;
export declare const View: React.FC<{
    description: Description;
    onClick: Function;
    onClose: Function;
}>;
