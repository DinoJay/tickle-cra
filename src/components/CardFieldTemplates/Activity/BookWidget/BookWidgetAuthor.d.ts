import React from 'react';
import { ModalProps } from '~/components/utils/Modal';
import Activity from '~/constants/activityType';
export declare const label = "Bookwidget";
interface BookWidgetProps {
    activity: Activity;
    modalProps: ModalProps;
    onChange: Function;
}
export declare const BookWidget: React.FC<BookWidgetProps>;
export declare const ModalContent: React.FC<BookWidgetProps>;
interface PreviewProps {
    activity: any;
    onClick: Function;
}
export declare const Preview: React.FC<PreviewProps>;
export {};
