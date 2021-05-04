import React from 'react';
import Topic from '~/constants/topicType';
interface TopicPanelProps {
    topicDict: Topic[];
    fetchTopics: (a: string) => any;
    userEnvId: string;
    updateTopic: (a: Topic, b: string) => void;
    removeTopic: (a: string, b: string) => void;
    open: boolean;
    onClick: () => void;
}
declare const TopicPanel: React.FC<TopicPanelProps>;
export default TopicPanel;
