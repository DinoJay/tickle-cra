import React, {useState} from 'react';
// import uuidv1 from 'uuid/v1';
import clsx from 'clsx';
import Plus from 'react-feather/dist/icons/plus';
import hangman1 from '~/styles/hangman1.svg';
import hangman2 from '~/styles/hangman2.svg';
import hangman3 from '~/styles/hangman3.svg';
import hangman4 from '~/styles/hangman4.svg';
import hangman5 from '~/styles/hangman5.svg';
// import hangman6 from '~/styles/hangman6.svg';
// import hangman7 from '~/styles/hangman7.svg';
import hangman8 from '~/styles/hangman8.svg';

import gameOver1 from '~/styles/gameover.svg';
import gameOver2 from '~/styles/gameover2.svg';

// import useMergeState from '~/components/utils/useMergeState';
// import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import {HANGMAN} from '~/constants/cardFields';

import Activity from '~/constants/activityType';
import ActivitySubmission from '~/constants/activitySubmissionType';
// import AuthUser from '~/constants/authUserType';
import {Match} from '~/constants/typeUtils';
import Flicker from '~/components/utils/Flicker';

const hangmen = [
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman8
];

interface HangmanViewType extends Match {
  // onClose: Function;
  activity: Activity;
  // onSubmit: Function;
  // addToStorage: Function;
  // removeFromStorage: Function;
  id: string;
  // authUser: AuthUser;
  activitySubmission: ActivitySubmission;
  addActivitySubmission: (a: any, userEnvId: string) => any;
  toggleUserview: Function;
  disabled: boolean;
}

export type OneLetter = {
  name: string;
  inputLetter: string | null;
  preVisible?: boolean;
};
export type Answer = OneLetter[];

const HangmanView: React.FC<HangmanViewType> = props => {
  const {
    // onClose,
    activity,
    // onSubmit,
    // addToStorage,
    // removeFromStorage,
    match: {
      params: {userEnvId}
    },
    id,
    // authUser,
    activitySubmission,
    addActivitySubmission,
    toggleUserview
    // disabled = false,
    // match
  } = props;

  const wordArray = activity.value ? activity.value.word : [];
  // const {completed} = activitySubmission || {completed: false};
  const {description} = activity.value || {description: ''};

  const [curAnswer, setCurAnswer] = useState<Answer>(
    activitySubmission && activitySubmission.response
      ? activitySubmission.response
      : wordArray
  );

  const [focusLetter, setFocusLetter] = useState<string | null>(null);

  const [errors, setErrors] = useState<string[]>([]);

  const incrementErr = (l: string) => {
    setErrors([...errors, l]);
  };
  const succeeded =
    !!curAnswer &&
    curAnswer.every(a => a.inputLetter === a.name || !!a.preVisible);

  const disabledSubmit =
    focusLetter === '' ||
    (focusLetter && errors.includes(focusLetter)) ||
    !!curAnswer.find(a => a.inputLetter === focusLetter);

  const tooManyErrors = errors.length >= 5;

  const updateAnswer = () => {
    // e.preventDefault();
    const newAnswer = curAnswer.reduce(
      (acc: Answer, a: OneLetter) => [
        ...acc,
        {
          ...a,
          inputLetter:
            focusLetter &&
            a.name.toLowerCase() === focusLetter.toLowerCase()
              ? a.name
              : a.inputLetter || null
        }
      ],
      []
    );

    const compareInput = (n: OneLetter) => n.name === n.inputLetter;
    const newCountCorrect = newAnswer.filter(compareInput).length;
    const oldCountCorrect = curAnswer.filter(compareInput).length;
    const isErr = newCountCorrect === oldCountCorrect;

    if (isErr && focusLetter) incrementErr(focusLetter);

    setCurAnswer(newAnswer);
    setFocusLetter('');
    const currentSubmission = {
      id,
      response: newAnswer,
      errors,
      completed: (isErr && errors.length >= 4) || succeeded,
      succeeded,
      type: HANGMAN
    };
    addActivitySubmission(currentSubmission, userEnvId);
  };

  const printInputVal = (l: OneLetter) => {
    if (
      (l.inputLetter && l.name === l.inputLetter) ||
      l.preVisible ||
      l.name === ' '
    )
      return l.name;
    return '';
  };

  const isMatch = (l: OneLetter) => l.inputLetter === l.name;

  // useEffect(() => {
  //   addActivitySubmission(currentSubmission, userEnvId);
  // }, [useDeepCompareMemoize(currentSubmission)]);

  return (
    <div className="flex flex-col flex-grow bg-white">
      <p>{description}</p>
      <div>
        <div className="flex">
          <img
            className="h-40"
            src={hangmen[errors.length]}
            alt="hangman"
          />
          {tooManyErrors && (
            <Flicker
              src1={gameOver1}
              src2={gameOver2}
              interval={500}
              className="h-40"
            />
          )}
        </div>
        <h2>Errors</h2>
        <div className="flex border-b-2 m-2">
          {new Array(5).fill(5).map((_, i) => (
            <div
              className={clsx(
                'flex text-xl text-white items-center justify-center px-2 m-1 ',
                errors[i] ? 'bg-red-400 ' : 'bg-gray-300'
              )}>
              <div className="uppercase">{errors[i] && errors[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap border-b-2 mb-2 pb-2">
        {!curAnswer.length && (
          <div className="alert bg-yellow-500 m-2 w-full ">
            No Input Word
          </div>
        )}
        {curAnswer.map(l => (
          <div
            className={`uppercase w-12 h-10 p-2 border-2 border-black shadow m-2 text-center
                ${isMatch(l) && 'disabled'}`}>
            {printInputVal(l)}
          </div>
        ))}
      </div>
      {!tooManyErrors && (
        <form
          onSubmit={e => {
            e.preventDefault();
            updateAnswer();
          }}
          className="flex m-2 items-center">
          <div>
            <input
              placeholder="Type a letter"
              maxLength={1}
              className="uppercase form-input mr-1"
              onChange={e => setFocusLetter(e.target.value)}
              value={focusLetter || ''}
            />
          </div>
          <button
            disabled={disabledSubmit}
            type="submit"
            className={clsx(
              'border btn p-1 ',
              disabledSubmit && 'disabled'
            )}>
            <Plus />
          </button>
          {/* TODO} */}
        </form>
      )}
      <div className="mt-auto">
        {tooManyErrors && (
          <div className="alert bg-red-400">
            Sorry, je hebt teveel fouten gemaakt!
          </div>
        )}
        {succeeded && (
          <div className="alert bg-green-500 mr-1">
            Goed gedaan! Je hebt het woord gevonden!
          </div>
        )}
      </div>
      {toggleUserview && (
        <button
          type="button"
          className="mt-auto btn p-1 border-2 mb-2 mx-1"
          onClick={() => toggleUserview(false)}>
          Author View
        </button>
      )}
    </div>
  );
};
export default HangmanView;
