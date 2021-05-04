import React, {useState} from 'react';
// import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';

import X from 'react-feather/dist/icons/x';
import Plus from 'react-feather/dist/icons/plus';
import Minus from 'react-feather/dist/icons/minus';

import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';

import PreviewTag from '~/components/utils/PreviewTag';
import {Img} from '~/constants/typeUtils';
import Topic from '~/constants/topicType';

const AnimatedPreviewTopic: React.FC<{
  onClick?: Function;
  id: string;
  selected: boolean;
  className?: string;
  img?: Img;
  points: number;
  title: string;
  onUpdatePoints?: Function;
  onRemove?: Function;
}> = props => {
  const {
    onClick,
    id,
    selected,
    className,
    img,
    points,

    title,
    onUpdatePoints,
    onRemove
  } = props;

  return (
    <div
      onClick={(): void => onClick && onClick()}
      key={id}
      className={`cursor-pointer m-2 flex relative justify-center items-center ${className}`}>
      {selected && (
        <button
          type="button"
          className="z-10 absolute btn right-0 top-0 bg-red-500 shadow ml-2"
          onClick={(): void => onRemove && onRemove()}>
          <X color="white" />
        </button>
      )}
      <div className={`${!selected ? '' : 'h-24 w-24'}  `}>
        <PreviewTag
          points={points}
          className="w-full h-full"
          img={img}
          title={title}
        />
      </div>
      {selected && (
        <div className="w-full absolute bottom-0 flex justify-center">
          <button
            type="button"
            className="btn bg-yellow-500 shadow mr-2"
            onClick={(): void =>
              onUpdatePoints &&
              onUpdatePoints(Math.max(10, points - 10))
            }>
            <Minus color="white" />
          </button>
          <button
            type="button"
            className="btn bg-green-500 shadow"
            onClick={(): void =>
              onUpdatePoints &&
              onUpdatePoints(Math.min(100, points + 10))
            }>
            <Plus color="white " />
          </button>
        </div>
      )}
    </div>
  );
};

// function isObject(obj) {
//   return obj === Object(obj);
// }

// const defaultTags = ts =>
//   Array.isArray(ts) ? (ts.every(isObject) ? ts : []) : [];

export const EditMetaTags: React.FC<{
  allTags: Topic[];
  onChange: Function;
  selectedTags: Topic[];
}> = props => {
  const {allTags, onChange, selectedTags} = props;

  // eslint-disable-next-line
  const [tags, setTags] = useState<Topic[]>(selectedTags);

  const tagIds = tags.map(d => d.id);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addDatum = (d: Topic): void =>
    setTags((sks: Topic[]) => uniqBy([...sks, d], 'id'));

  const updateDatum = (d: Topic): void => {
    const ts = tags.reduce(
      (acc: Topic[], e: Topic) =>
        e.id === d.id ? [...acc, {...e, ...d}] : [...acc, e],
      []
    );
    setTags(ts);
  };

  const removeDatum = (skId: string): void =>
    setTags(tags.filter((d: Topic) => d.id !== skId));

  useDidUpdateEffect(() => {
    onChange(tags);
  }, [useDeepCompareMemoize(tags)]);

  const availableTags = allTags.filter(sk => !tagIds.includes(sk.id));

  const addedTagDivs = (
    <>
      {tags.map(s => (
        <AnimatedPreviewTopic
          points={s.points || 10}
          {...s}
          selected={selectedId === s.id}
          onClick={(): void => {
            setSelectedId(s.id);
          }}
          onRemove={(): void => removeDatum(s.id)}
          onUpdatePoints={(ps: number): void => {
            updateDatum({...s, points: ps});
          }}
          key={s.id}
        />
      ))}
    </>
  );

  const availableTagDivs = (
    <>
      {availableTags.map(s => (
        <AnimatedPreviewTopic
          {...s}
          selected={false}
          onUpdatePoints={() => null}
          onRemove={() => null}
          points={0}
          onClick={(): void => {
            addDatum(s);
          }}
          key={s.id}
        />
      ))}
    </>
  );

  return (
    <>
      <h2>Available</h2>
      <div className="flex my-3 flex-base-0-grow flex-wrap overflow-y-auto border-2">
        {availableTags.length > 0 ? (
          availableTagDivs
        ) : (
          <div className="m-auto text-grey uppercase text-xl">
            Nothing available
          </div>
        )}
      </div>
      <h2>Selected</h2>
      <div className="flex mt-3 flex-base-0-grow flex-wrap overflow-y-auto border-2">
        {tags.length > 0 ? (
          addedTagDivs
        ) : (
          <div className="m-auto text-grey uppercase text-xl">
            Nothing selected
          </div>
        )}
      </div>
    </>
  );
};

export const MetaTags: React.FC<{
  selectedTags: Topic[];
}> = props => {
  const {selectedTags} = props;

  // TODO tags more than ids?
  const tags = selectedTags;

  const addedTagDivs = (
    <>
      {tags.map(s => (
        <AnimatedPreviewTopic key={s.id} {...s} selected={false} />
      ))}
    </>
  );

  return (
    <div className="flex-grow flex flex-col">
      <div className="flex mt-3 flex-wrap flex-grow overflow-y-auto">
        {addedTagDivs}
      </div>
    </div>
  );
};
