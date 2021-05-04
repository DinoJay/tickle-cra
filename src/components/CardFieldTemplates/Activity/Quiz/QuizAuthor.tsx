import React, {useState} from 'react';

import uuidv1 from 'uuid/v1';

import sortBy from 'lodash/sortBy';

import X from 'react-feather/dist/icons/x';
import Plus from 'react-feather/dist/icons/plus';
import ThumbsDown from 'react-feather/dist/icons/thumbs-down';
import ThumbsUp from 'react-feather/dist/icons/thumbs-up';

import {theme} from 'Tailwind';
import clsx from 'clsx';
import Activity from '~/constants/activityType';
import {PhotoPreview} from '~/components/utils/PhotoUpload';
import {Img} from '~/constants/typeUtils';
// import Check from 'react-feather/dist/icons/check';

import DetailsFrame from '~/components/utils/DetailsFrame';

export type Answer = {
  id: string;
  order: number;
  correct: boolean;
  text: string;
};

export type Question = {
  text: string;
  id: string;
  order: number;
  wellFormatted: boolean;
  img?: Img;
  answers: Answer[];
};

const replaceByIdFn = (arr: any[]) => (q: any) =>
  arr.reduce(
    (acc: any[], d: any) => (d.id === q.id ? [...acc, q] : [...acc, d]),
    []
  );

const inputClass =
  'leading-tight px-2 py-1 text-base border appearance-none';

const areValidAnswers = (aa: Answer[]) =>
  aa.length > 0 && aa.findIndex(a => a.correct) !== -1;

const EditAnswers: React.FC<{
  answers: Answer[];
  onChange: Function;
}> = props => {
  const {answers, onChange} = props;

  const initA = (): Answer => ({
    id: uuidv1(),
    order: new Date().getMilliseconds(),
    correct: false,
    text: ''
  });
  const [newAnswer, setNewAnswer] = useState<Answer>(initA());
  const updateNewAnswer = (a: object) =>
    setNewAnswer({...newAnswer, ...a});

  const disabledAnswer = !newAnswer.text;

  return (
    <div className="p-1">
      <h3 className="text-base">Answers:</h3>
      <div className="flex ">
        <textarea
          className={clsx(inputClass, 'flex-grow text-sm')}
          value={newAnswer.text}
          onChange={e => updateNewAnswer({text: e.target.value})}
        />
        <button
          type="button"
          disabled={disabledAnswer}
          className={clsx(
            'ml-2 btn border-2 text-base p-1',
            disabledAnswer && 'disabled'
          )}
          onClick={() => {
            onChange(sortBy([newAnswer, ...answers], 'order'));
            setNewAnswer(initA());
          }}>
          <Plus className="text-gray-600" />
        </button>
      </div>
      <ol className="py-2 my-1 list-decimal">
        {answers.map(d => (
          <li className="flex items-center border-b mb-1">
            <button
              type="button"
              className="btn"
              onClick={() => {
                onChange(answers.filter(e => e.id !== d.id));
              }}>
              <X />
            </button>
            <span>{d.text}</span>
            <button
              type="button"
              className="ml-auto btn"
              onClick={() => {
                const newAnswers = replaceByIdFn(answers)({
                  ...d,
                  correct: !d.correct
                });
                onChange(newAnswers);
              }}>
              {d.correct ? (
                <ThumbsUp color={theme.colors.green[500]} />
              ) : (
                <ThumbsDown color={theme.colors.red[500]} />
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

const ErrorWarning = ({
  question,
  answers
}: {
  question: string;
  answers: Answer[];
}) => {
  const notis = [];

  const cls = 'text-white text-center m-2 p-1 font-bold';
  if (question && answers.length === 0)
    return (
      <div className={clsx('bg-yellow-500 ', cls)}>
        Please Enter your answers!
      </div>
    );
  if (question === null || (question === '' && Array.isArray(answers)))
    return (
      <div className={clsx('bg-yellow-500 ', cls)}>
        Please Enter your question and answers!
      </div>
    );

  if (!question)
    notis.push(
      <div className={clsx('bg-red-500 ', cls)}>
        Not valid question text
      </div>
    );
  if (!areValidAnswers(answers))
    notis.push(
      <div className={clsx('bg-yellow-500', cls)}>
        At least one Answer need to be correct
      </div>
    );

  if (notis.length === 0)
    notis.push(
      <div className={clsx('bg-green-500 ', cls)}>
        Question well done!!!
      </div>
    );

  return <>{notis.map(n => n)}</>;
};

const UpdQuestion: React.FC<{
  className?: string;
  onRemove: Function;
  text: string;
  order: number;
  open: boolean;
  img?: Img;
  onClick: Function;
  onUpdate: Function;
  answers: Answer[];
  index: number;
  id: string;
}> = props => {
  const {
    className,
    onRemove,
    text,
    img,
    order,
    open,
    onClick,
    onUpdate,
    answers,
    index,
    id
  } = props;

  const update = (n: object) => {
    const nq: Question = {
      text,
      id,
      order,
      answers,
      wellFormatted: !!text && areValidAnswers(answers),
      ...n
    };
    onUpdate({...nq});
  };

  const disabled = !answers || !text;

  return (
    <DetailsFrame
      className={`${className} `}
      closedClassName={
        disabled
          ? 'border-2 border-yellow-500 shadow-yellow'
          : undefined
      }
      header={
        <div className="flex justify-between w-full overflow-hidden">
          <span>#{index} </span>
          <span className="truncate flex-shrink ">
            {text || 'No Text added!'}
          </span>
          {onRemove && (
            <button
              type="button"
              className="flex-none flex-shrink-0"
              onClick={() => onRemove()}>
              <X />
            </button>
          )}
        </div>
      }
      onClick={onClick}
      open={open}>
      <div className="flex flex-col justify-center p-1">
        <PhotoPreview
          shrinkable={false}
          className="h-32 mb-3"
          contain
          url={img ? img.url : undefined}
          edit
          onChange={m => update({img: m})}
        />
        <h3 className="text-base">Question:</h3>
        <input
          className={`${inputClass} flex-grow`}
          value={text}
          onChange={e => update({text: e.target.value})}
        />
      </div>
      <EditAnswers
        {...props}
        onChange={(as: Answer[]) => {
          update({answers: as});
        }}
      />
      <ErrorWarning question={text} answers={answers} />
    </DetailsFrame>
  );
};

const QuizAuthor: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  toggleUserview: Function;
  onChange: Function;
  activity: Activity;
}> = props => {
  const {className, style, toggleUserview, onChange, activity} = props;

  const {title = '', questions = []} = activity.value || {};

  const addQs = (qs: Question[]) =>
    onChange({...activity.value, questions: qs});
  const replaceQ = (q: Question) => {
    addQs(replaceByIdFn(questions)(q));
  };

  const initQ = () => ({
    id: uuidv1(),
    text: null,
    answers: [],
    order: new Date().getMilliseconds()
  });

  const [newQ, setNewQ] = useState(initQ());

  const [openQPanel, setOpenQPanel] = useState<string | null>(null);
  const toggleOpenPanel = (id: string) =>
    setOpenQPanel(openQPanel === id ? null : id);

  const disabledUserview =
    questions.length === 0 ||
    !!questions.find(
      (q: Question) =>
        q.answers.length === 0 ||
        !q.answers.find(a => a.correct) ||
        !q.text
    );

  // console.log('disabledUserview', disabledUserview);
  return (
    <div
      className={`${className} flex flex-col flex-grow w-full p-1`}
      style={{...style, maxHeight: '100%'}}>
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
      <h2>Questions</h2>
      <section className="flex flex-col overflow-y-auto pr-1">
        {sortBy(questions, 'order').map((d, i) => (
          <UpdQuestion
            index={i + 1}
            className="mb-2"
            order={i + 1}
            onUpdate={(q: Question) => replaceQ(q)}
            onClick={() => toggleOpenPanel(d.id)}
            open={openQPanel === d.id}
            text={d.text}
            answers={d.answers}
            {...d}
            onRemove={() =>
              addQs(questions.filter((e: Question) => e.id !== d.id))
            }
          />
        ))}
      </section>
      <button
        onClick={() => {
          addQs([newQ, ...questions]);
          setNewQ(initQ());
        }}
        className="border-2 mb-2 mt-4 btn w-full p-1"
        type="submit">
        Add Question
      </button>

      {toggleUserview && (
        <button
          disabled={disabledUserview}
          type="button"
          className={clsx(
            'bg-yellow-500 text-white mb-2 p-1 mt-auto btn border-2',
            disabledUserview && 'disabled'
          )}
          onClick={() => toggleUserview(true)}>
          UserView
        </button>
      )}
    </div>
  );
};
export default QuizAuthor;
