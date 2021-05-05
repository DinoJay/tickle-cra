import React, { useState, useEffect } from 'react';
import { max, group } from 'd3-array';
import uuid from 'uuid';
import { timeParse } from 'd3-time-format';
import { scaleLinear } from 'd3-scale';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import shuffle from 'lodash/shuffle';
import Plus from 'react-feather/dist/icons/plus';
import Minus from 'react-feather/dist/icons/minus';
import PreviewCard from '~/components/cards/PreviewCard';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import SelectTags from '~/components/utils/SelectTags';
import { formatDay } from '~/components/utils/time';
import distanceLoc from '~/components/utils/distanceLoc';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import setify from '~/components/utils/setify';

import { BlackModal, ModalBody } from '~/components/utils/Modal';

import PreviewTag from '~/components/utils/PreviewTag';

import TagDetail from '~/components/utils/TagDetail';
import {
  BubbleSet,
  ShapeSimplifier,
  BSplineShapeGenerator,
  PointPath
} from './bubblesets';

const colors = [
  'green',
  'yellow',
  'red',
  'blue',
  'gray',
  'lightgreen',
  'brown',
  'coral',
  'cyan',
  'pink'
];

const sort = cards =>
  uniqBy(
    sortBy(setify(cards), d => d.count)
      .reverse()
      .map(d => d.cards)
      .flat(),
    d => d.id
  );

const Grid = props => {
  const { cards, onRendered, size, onClick } = props;

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const children = ref?.current?.children ?? [];
    onRendered(
      [...children].map((c, i) => ({
        height: c.offsetHeight,
        width: c.offsetWidth,
        x: c.offsetLeft,
        y: c.offsetTop,
        ...cards[i]
      }))
    );
  }, [useDeepCompareMemoize(cards.map(d => d.id)), size]);

  return (
    <div
      ref={ref}
      className="relative flex flex-wrap justify-center items-start">
      {cards.map((d, i) => (
        <PreviewCard
          detail={false}
          key={d.id}
          onClick={() => onClick(d.id)}
          className="m-6"
          style={{
            // transition: 'all 400ms',
            maxWidth: `${size}rem`,
            minWidth: `${size}rem`,
            height: `${size}rem`
          }}
          title={(d.title && d.title.value) || undefined}
          img={(d.img && d.img.value) || undefined}
        />
      ))}
    </div>
  );
};

const OneBubbleSet: React.FC<any> = props => {
  const { coords, color, opacity, altCards } = props;
  const pad = 0;
  const bubbles = new BubbleSet();
  const list = bubbles.createOutline(
    BubbleSet.addPadding(coords, pad),
    BubbleSet.addPadding(altCards, pad),
    null
  );
  const outline = new PointPath(list).transform([
    new ShapeSimplifier(0.0),
    new BSplineShapeGenerator(),
    new ShapeSimplifier(0.0)
  ]);

  return (
    <svg className="pointer-events-none absolute z-20 w-full overflow-visible">
      <path fill={color} opacity={opacity} d={outline.toString()} />
    </svg>
  );
};

const BubbleSets: any = props => {
  const { nodes, size, colorMap } = props;

  const nestedSet = setify(nodes)
    .map((d, i) => ({ ...d, color: colors[i] }))
    .filter(d => d.count > 1);

  return nestedSet.map((d, i) => (
    <OneBubbleSet
      opacity={0.2}
      coords={d.cards}
      color={colorMap[d.id]}
      altCards={[]}
    />
  ));
};

const BubbleSetsWrapper: React.FC<any> = props => {
  const {
    open,
    onClick,
    style,
    authUser: { uid },
    locs,
    cards,
    onCardClick
  } = props;

  const [filteredCards, setFilteredCards] = useState(sort(cards));
  const [domNodes, setDomNodes] = useState([]);
  const [size, setSize] = useState(3);

  const nested = setify(sort(cards) as any)
    .map((d, i) => ({ ...d, color: colors[i] }))
    .filter(d => d.count > 1);

  const colorMap = nested.reduce((acc, d) => {
    acc[d.id] = d.color;
    return acc;
  }, {});

  return (
    <div className="mx-1 overflow-y-auto relative ">
      <div className="text-base mb-6 flex">
        <div className="flex mr-2 text-lg mt-1 ml-1">
          <button
            className="flex flex-col justify-start"
            type="button"
            onClick={() => setSize(size - 1)}>
            <Minus className="mt-2" />
          </button>
          <button
            className="flex flex-col justify-start"
            type="button"
            onClick={() => setSize(size + 1)}>
            <Plus className="mt-2" />
          </button>
        </div>
        <SelectTags
          className="bg-white flex-grow mt-1 mx-1"
          values={[
            { id: 'all', title: 'All', cards: sort(cards) },
            ...nested
          ]}
          idAcc={d => d.id}
          onChange={a => {
            setFilteredCards(a.cards);
          }}
          valueAcc={d => (
            <div className="flex justify-between">
              <div>{d.title}</div>
              <div
                className="w-6 h-6"
                style={{ background: d.color, opacity: 0.4 }}
              />
            </div>
          )}
        />
      </div>
      <BubbleSets nodes={domNodes} size={size} colorMap={colorMap} />
      <Grid
        onClick={onCardClick}
        cards={filteredCards}
        onRendered={setDomNodes}
        size={size}
      />
    </div>
  );
};
export default BubbleSetsWrapper;
