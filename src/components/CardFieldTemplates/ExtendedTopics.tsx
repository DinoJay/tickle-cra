import React  from 'react';
import {ModalBody, ModalProps} from '~/components/utils/Modal';

import {TOPICS, TopicField} from '~/constants/cardFields';

import PreviewFrame from './PreviewFrame';
import Topic from '~/constants/topicType';

import {EditMetaTags, MetaTags} from './MetaTags';

export const key = TOPICS;

export const label = 'Topics';

export const ModalContent: React.FC<{
  topics: TopicField;
  onChange: Function;
  topicDict: Topic[];
  disabled: boolean;
  modalProps: ModalProps;
}> = props => {
  const {topics, onChange, topicDict, disabled, modalProps} = props;

  const change = (selectedData: Topic[]): void => {
    onChange({
      key,
      label,
      value: selectedData
    });
  };

  return (
    <ModalBody {...modalProps} className="flex-grow">
      {disabled ? (
        <MetaTags selectedTags={topics.value || []}  />
      ) : (
        <EditMetaTags
          selectedTags={topics.value || []}
          allTags={topicDict}
          onChange={change}
        />
      )}
    </ModalBody>
  );
};

export const Preview: React.FC<{
  onClick: Function;
  topics: TopicField;
}> = props => {
  const {onClick, topics} = props;

  return (
    <PreviewFrame
      onClick={onClick}
      type={label}
      placeholder="Topics"
      empty={topics.value === null}
      content={(): React.ReactNode => (
        <div className="flex flex-wrap">
          {topics.value &&
            topics.value.map(d => <div className="m-1">{d.title}</div>)}
        </div>
      )}
    />
  );
};
