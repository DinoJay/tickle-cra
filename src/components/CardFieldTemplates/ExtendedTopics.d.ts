import React from 'react';
import { ModalProps } from '~/components/utils/Modal';
import { TopicField } from '~/constants/cardFields';
import Topic from '~/constants/topicType';
export declare const key = "topics";
export declare const label = "Topics";
export declare const ModalContent: React.FC<{
    topics: TopicField;
    onChange: Function;
    topicDict: Topic[];
    disabled: boolean;
    modalProps: ModalProps;
}>;
export declare const Preview: React.FC<{
    onClick: Function;
    topics: TopicField;
}>;
