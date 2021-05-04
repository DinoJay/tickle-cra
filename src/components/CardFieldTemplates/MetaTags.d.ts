import React from 'react';
import Topic from '~/constants/topicType';
export declare const EditMetaTags: React.FC<{
    allTags: Topic[];
    onChange: Function;
    selectedTags: Topic[];
}>;
export declare const MetaTags: React.FC<{
    selectedTags: Topic[];
}>;
