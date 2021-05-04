import {group} from 'd3-array';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import {Card} from '~/constants/cardFields';
import Topic from '~/constants/topicType';
import {Img} from '~/constants/typeUtils';

import DataElem from '~/constants/dataElemType';

export default function setify(data: Card[]): DataElem[] {
  const spreadData = flatten(
    data.map((d: Card) => {
      const spreadCards =
        d.topics && Array.isArray(d.topics.value) ? d.topics.value : [];

      return spreadCards.map(t => ({
        ...d,
        topicId: t.id,
        cards: spreadCards
      }));
    })
  );

  const nested = [
    ...group(spreadData, (d: Card | {topicId: string}) => d.topicId)
  ]
    .map(d => ({id: d[0], cards: d[1]}))
    // TODO: fix later, really confusing
    // TODO: fix later, really confusing
    .map((d: {id: string; cards: Card[]}) => {
      const relatedTopics: Topic[] = uniq(
        flatten(
          Array.isArray(d.cards)
            ? d.cards.map((e: Card) =>
              e.topics && Array.isArray(e.topics.value)
                ? e.topics.value
                : []
            )
            : []
        )
      );

      const {
        description = 'example',
        img = {url: 'example', name: 'example', id: 'example'},
        title = 'example'
      }: {
        description?: string;
        img?: Img;
        title?: string;
      } = relatedTopics.find((e: Topic) => e.id === d.id) || {};

      const points = relatedTopics.reduce(
        (acc, t) => (t && t.points ? acc + t.points : acc),
        0
      );

      return {
        description,
        img,
        title,
        count: d.cards.length,
        points,
        relatedTopics,
        ...d
      };
    })
    .sort(
      (a: Topic, b: Topic) =>
        (b.cards || []).length - (a.cards || []).length
    );

  return nested;
}
