import React from 'react';

const MAX_POINTS = 100;
const MIN_POINTS = 0;
const INCR = 10;

export default function PointCounter(props) {
  const {points, onChange} = props;

  const incrValid = points + INCR <= MAX_POINTS;
  const decrValid = points - INCR >= MIN_POINTS;

  const addPoints = () => (incrValid ? onChange(points + INCR) : null);
  const substractPoints = () =>
    decrValid ? onChange(points - INCR) : null;

  const btnClass = 'btn text-2xl text-grey p-2';
  const upBtnClass = `${btnClass} ${
    !incrValid ? 'opacity-50' : 'opacity-100'
  }`;
  const downBtnClass = `${btnClass} ${
    !decrValid ? 'opacity-50' : 'opacity-100'
  }`;

  return (
    <div className="flex flex-col w-full mb-3">
      <div className="flex border-2 items-center justify-between">
        <div className="px-2 text-5xl">{points}</div>
        <div className="flex flex-col justify-between">
          <button
            disabled={!incrValid}
            className={upBtnClass}
            type="button"
            onClick={addPoints}>
            △
          </button>
          <button
            disabled={!decrValid}
            className={downBtnClass}
            type="button"
            onClick={substractPoints}>
            ▽
          </button>
        </div>
      </div>
    </div>
  );
}
