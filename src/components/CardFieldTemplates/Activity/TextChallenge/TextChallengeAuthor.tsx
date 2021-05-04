import React from 'react';
// import uuidv1 from 'uuid/v1';
import Activity from '~/constants/activityType';

import Rating from '~/components/utils/Rating';
import {Img} from '~/constants/typeUtils';

import {PhotoPreview} from '~/components/utils/PhotoUpload';

type TextChallenge = {
  title: string;
  description: string;
  img: Img | null;
  difficulty: number;
};

const DifficultyRating: React.FC<{
  onChange: Function;
  highlighted: number;
}> = ({onChange, highlighted, ...props}) => (
  <Rating
    {...props}
    count={highlighted}
    num={6}
    onClick={(i: number) => {
      onChange(i);
    }}
  />
);

const TextChallengeAuthor: React.FC<{
  className?: string;
  toggleUserview: Function;
  style?: React.CSSProperties;
  onChange: Function;
  activity: Activity;
}> = props => {
  const {className, toggleUserview, style, onChange, activity} = props;

  const {
    title = '',
    description = '',
    img = null,
    difficulty = 0
  }: TextChallenge = activity.value || {};

  return (
    <div
      className={`${className} flex flex-col flex-grow w-full h-full`}
      style={{...style}}>
      <section className="mb-4">
        <h2 className="mb-1">Title</h2>
        <input
          className="form-control w-full border"
          placeholder="Title"
          defaultValue={title}
          onChange={e =>
            onChange({...activity.value, title: e.target.value})
          }
        />
      </section>
      <section className="mb-4">
        <h2 className="mb-1">Description</h2>
        <textarea
          className="form-control w-full border"
          placeholder="Description"
          rows={2}
          onChange={e =>
            onChange({...activity.value, description: e.target.value})
          }
          defaultValue={description}
          style={{minHeight: 200}}
        />
      </section>

      <section className="mb-4">
        <h2 className="mb-1">IMG</h2>
        <PhotoPreview
          {...img}
          edit
          className="h-48"
          onChange={(newImg: Img) => {
            console.log('newImg', newImg);
            onChange({...activity.value, img: newImg});
          }}
        />
      </section>
      <section className="hidden">
        <h2>Difficulty</h2>
        <DifficultyRating
          highlighted={difficulty}
          onChange={(df: number) =>
            onChange({...activity.value, difficulty: df})
          }
        />
      </section>
      <button
        type="button"
        className="mb-2 mt-auto btn border-2 p-1 bg-yellow-500 text-white"
        onClick={() => toggleUserview(true)}>
        UserView
      </button>
    </div>
  );
};
export default TextChallengeAuthor;
