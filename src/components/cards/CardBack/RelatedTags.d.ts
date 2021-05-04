import React from 'react';
import Topic from '~/constants/topicType';
import { Card } from '~/constants/cardFields';
interface RTinterface {
    cards: Card[];
    topicDict: Topic[];
}
declare const RelatedTopics: React.FC<RTinterface>;
export default RelatedTopics;
