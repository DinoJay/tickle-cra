import React, {useState, useEffect} from 'react';
// import clsx from 'clsx';

import ConnectedCard from '~/components/cards/ConnectedCard';
import useRouteParams from '~/Routes/useRouteParams';

import Topic from '~/constants/topicType';
import {Card} from '~/constants/cardFields';
import {BlackModal, ModalBody} from '~/components/utils/Modal';
import abcLetters from '~/styles/abc_letters';
import {Img} from '~/constants/typeUtils';
import PreviewCard from '~/components/cards/PreviewCard';

import DefaultLayout from '~/components/DefaultLayout';
// These two are just helpers, they curate spring data, values that are later being interpolated into css
// const to = ( i:number) => ({
//   x: i * 2,
//   y: i * 4,
//   scale: 1,
//   delay: i * 100
// });

const TopicPreview: React.FC<{
  img?: Img;
  style: React.CSSProperties;
  title: string;
  onClick: Function;
  cards: Card[];
  points: number;
}> = props => {
  const {img, style, title, onClick, points} = props;
  const letter = title.charAt(0);

  return (
    <div
      className="h-full shadow-md flex flex-col"
      onClick={() => onClick()}
      style={{
        ...style,
        backgroundImage: `url(${(img && img.url) ||
          abcLetters[letter.toLowerCase()]}) `,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
      <div className="bg-black flex flex-col justify-between items-center text-white uppercase font-bold text-base p-1">
        {title}
      </div>
      <div className="mt-auto mb-3 mx-auto text-2xl">{points}XP</div>
    </div>
  );
};

const extendTopics = (topicDict: Topic[], cards: Card[]) => {
  type ExtTopic = Topic & {cards: Card[]; points: number};

  return topicDict
    .map((d: Topic) => ({
      ...d,
      cards: cards.filter(
        (c: Card) =>
          c.topics &&
          c.topics.value &&
          !!c.topics.value.find((e: Topic) => e.id === d.id)
      )
    }))
    .map((d: Topic & {cards: Card[]}) => ({
      ...d,
      points: d.cards.reduce((acc: number, e: Card) => {
        const incr =
          e.topics && e.topics.value
            ? e.topics.value.reduce(
              (ac: number, t: Topic) => ac + (t.points || 0),
              0
            )
            : 0;
        return acc + incr;
      }, 0)
    }))
    .sort((a: ExtTopic, b: ExtTopic) => b.points - a.points);
};

const CardStack: React.FC<any> = props => {
  const {cards} = props;

  const {
    setQuery,
    query: {id, extended}
  } = useRouteParams();

  const selectedCard = cards.find((c: Card) => c.id === id) || {};

  return (
    <div className="flex flex-wrap">
      {cards.map((d: Card) => (
        <PreviewCard
          title={(d.title && d.title.value) || ''}
          img={d.img ? d.img.value : undefined}
          className="m-1"
          onClick={() => setQuery({id: d.id, extended: true})}
        />
      ))}
      <BlackModal visible={extended}>
        <ConnectedCard {...selectedCard} />
      </BlackModal>
    </div>
  );
};

const TopicViewPage: React.FC<any> = props => {
  const {
    topicDict,
    fetchCollectibleCards,
    fetchTopics,
    userEnvId,
    authUser,
    width,
    cards
  } = props;

  const {uid} = authUser;
  const extTopicDict = extendTopics(topicDict, cards).filter(
    c => c.cards.length > 0
  );

  const [id, setId] = useState<string | null>(null);

  // console.log('extTopicDict', extTopicDict, 'cards', cards);

  useEffect(() => {
    fetchCollectibleCards({userEnvId, uid});
    fetchTopics(userEnvId);
  }, [userEnvId]);

  const selectedTopic = id ? extTopicDict.find(d => d.id === id) : null;

  const selectedCards = selectedTopic ? selectedTopic.cards : [];

  console.log('selectedTopic', selectedTopic);
  return (
    <DefaultLayout
      className="relative overflow-hidden"
      menu={
        <div className="flex-grow flex justify-end items-center" />
      }>
      <BlackModal
        visible={id !== null}
    >
    <ModalBody

    title={selectedTopic ? selectedTopic.title : ''}
      onClose={() => setId(null)} className="flex-grow">
          <CardStack cards={selectedCards} />
        </ModalBody>
      </BlackModal>
      <div
        className="flex-grow p-2 overflow-y-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${width > 500 ? 5 : 3}, 1fr)`,
          gridGap: '1rem',
          gridTemplateRows: `repeat(${topicDict.length * 3}, 1rem)`
        }}>
        {extTopicDict.map((d: Topic, i: number) => (
          <TopicPreview
            onClick={() => setId(d.id)}
            cards={d.cards!}
            {...d}
            style={{
              gridRow: i % 2 === 0 ? 'span 10' : 'span 8',
              gridColumn: 'span 1'
            }}
          />
        ))}
      </div>
    </DefaultLayout>
  );
};
export default TopicViewPage;
