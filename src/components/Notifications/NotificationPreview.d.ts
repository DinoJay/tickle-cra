import React from 'react';
import { Img } from '~/constants/typeUtils';
declare type NotificationPreviewProps = {
    cardId: string;
    preview: Img;
    msg: string;
    caption: string;
    title: string;
    onClose: (id: string) => any;
    onSelect: (id: string) => any;
    id: string;
};
declare const NotificationPreview: React.FC<NotificationPreviewProps>;
export default NotificationPreview;
