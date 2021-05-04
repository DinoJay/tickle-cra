import React from 'react';
import { ModalProps } from '~/components/utils/Modal';
import { Loc, Card } from '~/constants/cardFields';
export declare const label = "Location";
export declare const key = "loc";
export declare const required = true;
declare type EditLocationMapType = {
    modalProps: ModalProps;
    onChange: Function;
    disabled: boolean;
};
export declare const ModalContent: React.FC<EditLocationMapType & Card>;
declare type ViewType = {
    modalProps: ModalProps;
    onClose: Function;
};
export declare const View: React.FC<Card & ViewType>;
export declare const Preview: React.FC<{
    onClick: Function;
    loc: Loc;
}>;
export {};
