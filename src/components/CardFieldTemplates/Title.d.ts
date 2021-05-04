import React from 'react';
import { ModalProps } from '~/components/utils/Modal';
import { Title } from '~/constants/cardFields';
export declare const label = "Title";
export declare const key = "title";
export declare const ModalContent: React.FC<{
    modalProps: ModalProps;
    disabled: false;
    onChange: Function;
    title: Title;
}>;
export declare const Preview: React.FC<{
    onClick: Function;
    title: Title;
}>;
