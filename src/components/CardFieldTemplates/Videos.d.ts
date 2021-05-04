import React from 'react';
import { VideoField } from '~/constants/cardFields';
import { ModalProps } from '~/components/utils/Modal';
export declare type Video = {
    id: string;
    thumbnail: string;
    title: string;
    descr: string;
    url: string;
    onClick: Function;
};
export declare const VideoPreview: React.FC<Video>;
export declare const key = "videos";
export declare const label = "Videos";
export declare const ModalContent: React.FC<{
    modalProps: ModalProps;
    disabled: boolean;
    videos: VideoField;
    onChange: Function;
}>;
export declare const Preview: React.FC<{
    onClick: Function;
    videos: VideoField;
}>;
export declare const View: React.FC<{
    onClose: Function;
    videos: VideoField;
}>;
