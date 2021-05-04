import React, { useState, useEffect } from 'react';
import uuidv1 from 'uuid/v1';
import Eye from 'react-feather/dist/icons/eye';
import EyeOff from 'react-feather/dist/icons/eye-off';
import X from 'react-feather/dist/icons/x';
import Plus from 'react-feather/dist/icons/plus';
import clsx from 'clsx';
import Activity from '~/constants/activityType';
import abc from '~/components/utils/abc';

type OneLetter = {
  id: string;
  name: string;
  inputLetter: string;
  preVisible?: boolean;
};
type Word = OneLetter[];

const SelectLetter: React.FC<{
  value: string;
  onChange: Function;
  onClick: Function;
  className: string;
}> = props => {
  const { value, onChange, onClick, className } = props;
  const [open, setOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => {
      setTimeout(() => setOpen(false), 200);
    };
    if (ref.current) ref.current.addEventListener('focusout', fn);
    return () =>
      ref.current && ref.current.removeEventListener('focusout', fn);
  });

  return (
    <div ref={ref}>
      <button
        type="button"
        className={clsx(
          'px-3 py-1 border-2 mx-1',
          open && 'bg-gray-500',
          className
        )}
        onClick={() => {
          setOpen(!open);
          onClick();
        }}>
        {value === ' ' ? '__' : value}
      </button>
      <div
        className={clsx(
          !open && 'hidden',
          open &&
          'border border-black bg-white fixed left-0 mt-8 mx-2 shadow'
        )}>
        {abc.map(d => (
          <button
            className="p-2"
            onClick={() => {
              onChange(d);
              // setOpen(false);
            }}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
};

const HangmanAuthor: React.FC<{
  className?: string;
  toggleUserview: (a: boolean) => any;
  style?: React.CSSProperties;
  onChange: Function;
  activity: Activity;
}> = props => {
  const { className, toggleUserview, style, onChange, activity } = props;

  const [focus, setFocus] = useState<number>(0);

  const {
    word: wordArray = [],
    description = '',
    title = ''
  }: { word: Word; description: string; title: string } =
    activity.value || {};

  const addLetter = () => {
    if (wordArray.length && wordArray[wordArray.length - 1].name === '')
      return;

    onChange({
      ...activity.value,
      word: [
        ...wordArray,
        {
          id: uuidv1(),
          name: ' ',
          preVisible: false
        }
      ]
    });
  };

  const changeLetter = (l: OneLetter) => {
    const newWordArray = wordArray.reduce(
      (acc: Word, a: OneLetter) =>
        a.id === l.id ? [...acc, { ...a, ...l }] : [...acc, a],
      []
    );
    onChange({ ...activity.value, word: newWordArray });
  };
  const removeLetter = (l: OneLetter, i: number) => {
    const newWordArray = wordArray.filter(w => w.id !== l.id);
    onChange({ ...activity.value, word: newWordArray });
    setFocus(i - 1 > 0 ? i - 1 : i + 1);
  };

  return (
    <div
      className={`${className} flex flex-col flex-grow w-full `}
      style={{ ...style, maxHeight: '100%' }}>
      <section className="mb-4 p-1">
        <h1 className="mb-1">Title</h1>
        <input
          value={title}
          className="form-input w-full mb-2 "
          onChange={e => {
            onChange({
              ...activity.value,
              title: e.target.value
            });
          }}
        />
        <h2 className="mb-1">Description</h2>
        <textarea
          className="form-input w-full "
          value={description}
          onChange={e =>
            onChange({
              ...activity.value,
              description: e.target.value
            })
          }
        />
        <h2 className="mb-1">Word</h2>
        <div className="relative flex items-center flex-wrap mb-2 h-24 mx-1">
          {wordArray.map((l: OneLetter, i) => (
            <div className="flex items-center ">
              <SelectLetter
                key={l.id}
                onClick={() => {
                  setFocus(i);
                }}
                className={clsx(
                  `uppercase form-input w-12 m-2 text-center`,
                  l.preVisible && 'border-2 border-black shadow',
                  l.name === ' ' && 'underline'
                )}
                onChange={(name: string) => {
                  changeLetter({ ...l, name });
                }}
                value={
                  wordArray.find((p: OneLetter) => p.id === l.id)!.name
                }
              />
              {focus === i && (
                <div>
                  <button
                    type="button"
                    className="btn text-sm border rounded-full p-2 m-1"
                    onClick={() =>
                      changeLetter({ ...l, preVisible: !l.preVisible })
                    }>
                    {l.preVisible ? <Eye /> : <EyeOff />}
                  </button>
                  <button
                    type="button"
                    className="btn bg-red-500 text-sm border rounded-full p-2 m-1"
                    onClick={() => removeLetter(l, i)}>
                    <X className="text-white" />
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            className="btn p-1 border rounded-full"
            type="button"
            onClick={addLetter}>
            <Plus />
          </button>
        </div>
      </section>
      <button
        type="button"
        className="mb-2 mt-auto btn border-2 p-1 mx-1"
        onClick={() => toggleUserview(true)}>
        User View
      </button>
    </div>
  );
};
export default HangmanAuthor;
