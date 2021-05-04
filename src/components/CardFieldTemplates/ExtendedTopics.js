import React from 'react';
import { ModalBody } from '~/components/utils/Modal';
import { TOPICS } from '~/constants/cardFields';
import PreviewFrame from './PreviewFrame';
import { EditMetaTags, MetaTags } from './MetaTags';
export const key = TOPICS;
export const label = 'Topics';
export const ModalContent = props => {
    const { topics, onChange, topicDict, disabled, modalProps } = props;
    const change = (selectedData) => {
        onChange({
            key,
            label,
            value: selectedData
        });
    };
    return (React.createElement(ModalBody, Object.assign({}, modalProps, { className: "flex-grow" }), disabled ? (React.createElement(MetaTags, { selectedTags: topics.value || [] })) : (React.createElement(EditMetaTags, { selectedTags: topics.value || [], allTags: topicDict, onChange: change }))));
};
export const Preview = props => {
    const { onClick, topics } = props;
    return (React.createElement(PreviewFrame, { onClick: onClick, type: label, placeholder: "Topics", empty: topics.value === null, content: () => (React.createElement("div", { className: "flex flex-wrap" }, topics.value &&
            topics.value.map(d => React.createElement("div", { className: "m-1" }, d.title)))) }));
};
