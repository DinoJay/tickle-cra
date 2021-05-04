import React from 'react';
import { ModalProps } from '~/components/utils/Modal';
import { DateTime } from '~/constants/cardFields';
export declare const key = "dateTime";
export declare const label = "dateTime";
export declare const ModalContent: React.FC<{
    onChange: Function;
    modalProps: ModalProps;
    dateTime: DateTime;
}>;
export declare const Preview: React.FC<{
    dateTime: DateTime;
    onClick: Function;
}>;
export declare const View: React.FC<{
    dateTime: DateTime;
    onClose: Function;
}>;
