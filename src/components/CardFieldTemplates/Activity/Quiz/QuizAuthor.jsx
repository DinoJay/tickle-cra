import React, {Component, useState} from 'react';

import uuidv1 from 'uuid/v1';

import sortBy from 'lodash/sortBy';

import X from 'react-feather/dist/icons/x';
import Plus from 'react-feather/dist/icons/plus';
import ThumbsDown from 'react-feather/dist/icons/thumbs-down';
import ThumbsUp from 'react-feather/dist/icons/thumbs-up';

import {theme} from 'Tailwind';
// import Check from 'react-feather/dist/icons/check';

import DetailsFrame from '~/components/utils/DetailsFrame';

const replaceByIdFn = arr => q =>
  arr.reduce(
    (acc, d) => (d.id === q.id ? [...acc, q] : [...acc, d]),
    []
  );

const inputClass =
  'leading-tight px-2 py-1 text-base border appearance-none';

const isValidQuestion = q => q;

const areValidAnswers = as =>
  as && as.length > 0 && as.findIndex(a => a.correct) !== -1;

const EditAnswers = props => {
  const {answers, onChange} = props;

  const initA = () => ({
    id: uuidv1(),
    order: new Date().getMilliseconds(),
    correct: false,
    text: ''
  });
  const [newAnswer, setNewAnswer] = useState(initA());
  const updateNewAnswer = a => setNewAnswer({...newAnswer, ...a});
  const disabledAnswer = !newAnswer.text;
  return (
    <div className="p-1">
      <h3 className="text-base">Answers:</h3>
      <div className="flex ">
        <input
          className={`${inputClass} flex-grow text-sm `}
          value={newAnswer.text}
          onChange={e => updateNewAnswer({text: e.target.value})}
        />
        <button
          type="button"
          disabled={disabledAnswer}
          className={`ml-2 btn border text-base p-1 ${disabledAnswer &&
            'disabled'}`}
          onClick={() => {
            onChange(sortBy([newAnswer, ...answers], 'order'));
            setNewAnswer(initA());
          }}>
          <Plus />
        </button>
      </div>
      <ul className="py-2 list-decimal text-base list-disc my-1 list-inside">
        {answers.map(d => (
          <li className="flex items-center">
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
      </ul>
    </div>
  );
};

const ErrorWarning = ({question, answers}) => {
  const notis = [];

  if (question && answers.length === 0)
    return (
      <div className="bg-yellow-500 text-white text-center m-1">
        Please Enter your answers!
      </div>
    );
  if (question === null || (question === '' && Array.isArray(answers)))
    return (
      <div className="bg-yellow-500 text-white text-center m-1">
        Please Enter your question and answers!
      </div>
    );

  if (!question)
    notis.push(
      <div className="bg-red-500 text-white text-center m-1">
        'Not valid question text'
      </div>
    );
  if (!areValidAnswers(answers))
    notis.push(
      <div className="bg-yellow-500 text-white text-center m-1">
        'at least one Answer need to be correct'
      </div>
    );

  if (notis.length === 0)
    notis.push(
      <div className="bg-green-500 text-white text-center m-1">
        'question well done!!!'
      </div>
    );

  return <>{notis.map(n => n)}</>;
};

const UpdQuestion = props => {
  const {
    className,
    onRemove,
    text,
    order,
    open,
    onClick,
    onUpdate,
    answers,
    index,
    id
  } = props;

  const update = n => {
    const nq = {text, id, order, answers, ...n};
    onUpdate({...nq, wellFormatted: text && areValidAnswers(answers)});
  };

  return (
    <DetailsFrame
      className={`${className} `}
      closedClassName={
        !answers || !text
          ? 'border-2 border-yellow-500 shadow-yellow'
          : undefined
      }
      header={
        <div className="flex justify-between w-full overflow-hidden">
          <span>#{index} </span>
          <span
            className="truncate flex-shrink "
            style={{maxWidth: null}}>
            {text || 'No Text added!'}
          </span>
          {onRemove && (
            <button
              type="button"
              className="flex-none flex-shrink-0"
              onClick={onRemove}>
              <X />
            </button>
          )}
        </div>
      }
      onClick={onClick}
      open={open}>
      <div className="flex flex-col justify-center p-1">
        <h3 className="text-base">Question:</h3>
        <input
          className={`${inputClass} flex-grow`}
          value={text}
          onChange={e => update({text: e.target.value})}
        />
      </div>
      <EditAnswers
        {...props}
        onChange={as => {
          update({answers: as});
        }}
      />
      <ErrorWarning question={text} answers={answers} />
    </DetailsFrame>
  );
};

export default function QuizAuthor(props) {
  const {className, style, toggleUserview, onChange, activity} = props;

  const {title, description, questions = []} = activity.value || {};

  const addQs = qs => onChange({...activity.value, questions: qs});
  const replaceQ = q => {
    addQs(replaceByIdFn(questions)(q));
  };

  const initQ = () => ({
    id: uuidv1(),
    text: null,
    answers: [],
    order: new Date().getMilliseconds()
  });

  const [newQ, setNewQ] = useState(initQ());

  const [openQPanel, setOpenQPanel] = useState(null);
  const toggleOpenPanel = id =>
    setOpenQPanel(openQPanel === id ? null : id);

  return (
    <div
      className={`${className} flex flex-col flex-grow w-full `}
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
            onUpdate={q => replaceQ(q)}
            onClick={() => toggleOpenPanel(d.id)}
            open={openQPanel === d.id}
            {...d}
            onRemove={() => addQs(questions.filter(e => e.id !== d.id))}
          />
        ))}
      </section>
      <form
        onSubmit={e => {
          e.preventDefault();
          addQs([...questions, newQ]);
          setNewQ(initQ());
        }}>
        <button
          className="border-2 mb-2 mt-4 btn w-full p-1"
          type="submit">
          Add Question
        </button>
      </form>

      {toggleUserview && (
        <button
          type="button"
          className="bg-yellow-500 text-white mb-2 p-1 mt-auto btn border-2"
          onClick={() => toggleUserview(true)}>
          UserView
        </button>
      )}
    </div>
  );
}
