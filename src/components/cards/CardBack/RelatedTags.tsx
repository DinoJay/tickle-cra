import React from 'react';

import PreviewCard from '~/components/cards/PreviewCard';
import Topic from '~/constants/topicType';
import { Card } from '~/constants/cardFields';

interface RTinterface {
  cards: Card[];
  topicDict: Topic[];
}

const RelatedTopics: React.FC<RTinterface> = props => {
  const { cards } = props;

  // const [id, setSelectedTagId] = useState(null);
  //~ TOPIX TODO
  return (
    <div className="flex-grow flex flex-col">
      <div className="flex flex-shrink-0 mb-2">
        <h2 className="tag-label bg-black">Related Cards</h2>
      </div>
      <div className="flex flex-wrap overflow-y-auto">
        {cards.length === 0 && (
          <div className="text-2xl w-full">No Cards</div>
        )}
        {cards.map(d => (
          <PreviewCard
            detail={false}
            className="mb-1 mr-1"
            title={(d.title && d.title.value) || undefined}
            img={d.img && d.img.value ? d.img.value : undefined}
            onClick={(): void => {
              // setSelectedTagId(d.tagId);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedTopics;
