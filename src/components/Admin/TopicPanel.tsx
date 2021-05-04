import React, { useEffect } from 'react';

import ElementPanel from './ElementPanel';
import Topic from 'constants/topicType';

interface TopicPanelProps {
  topicDict: Topic[];
  fetchTopics: (a: string) => any;
  userEnvId: string;
  updateTopic: (a: Topic, b: string) => void;
  removeTopic: (a: string, b: string) => void;
  open: boolean;
  onClick: () => void;
}

const TopicPanel: React.FC<TopicPanelProps> = props => {
  const {
    topicDict,
    fetchTopics,
    userEnvId,
    updateTopic,
    removeTopic,
    open,
    onClick
  } = props;

  const onSubmitTopic = (topic: Topic) => updateTopic(topic, userEnvId);
  const onRemoveTopic = (topicId: string) =>
    removeTopic(topicId, userEnvId);

  useEffect(() => {
    fetchTopics(userEnvId);
  }, [userEnvId]);

  return (
    <ElementPanel
      {...props}
      data={topicDict}
      title="Topics"
      removable={(d: Topic) => !d.constant}
      elementTitle="Topic"
      onSubmitElement={onSubmitTopic}
      onRemoveElement={onRemoveTopic}
      open={open}
      onClick={() => onClick()}
    />
  );
};

export default TopicPanel;
