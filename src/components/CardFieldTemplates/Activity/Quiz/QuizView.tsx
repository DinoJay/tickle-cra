import React, {useState} from 'react';
import clsx from 'clsx';
import {QUIZ} from '~/constants/cardFields';

// import TabSwitcher from '~/components/utils/TabSwitcher';
import TabSlider from '~/components/utils/TabSlider';
import {Match} from '~/constants/typeUtils';
import Activity from '~/constants/activityType';
import AuthUser from '~/constants/authUserType';
import ActivitySubmissionType from '~/constants/activitySubmissionType';

import {Question, Answer} from './QuizAuthor';
// import quiz1 from '~/styles/quiz.svg';
// import quiz2 from '~/styles/quiz2.svg';
// import Flicker from '~/components/utils/Flicker';

import css from './Quiz.scss';

type QuizResponse = {[id: string]: boolean};

const QuestionFeedback: React.FC<any> = props => {
  const {correct} = props;
  const cls = 'mx-2 mb-3 p-2 text-white border-2 border-black shadow';
  if (correct)
    return (
      <div className={clsx(cls, 'bg-green-500')}>'Correct Answer'</div>
    );
  return (
    <div className={clsx(cls, 'bg-red-500 uppercase font-bold')}>
      Wrong Answer
    </div>
  );
};

const getAllAnswers = (questions: Question[]): QuizResponse =>
  questions.reduce((acc, q) => {
    const tmpAns = q.answers.reduce(
      (acc2, a) => ({...acc2, [a.id]: false}),
      {}
    );
    return {...acc, ...tmpAns};
  }, {});

const QuizResults: React.FC<{
  success: boolean;
  count: number;
  num: number;
  className?: string;
}> = props => {
  const {success, count, num, className} = props;

  return (
    <div
      className={`alert ${
        success ? 'bg-green-500' : 'bg-red-500'
      } ${className}`}>
      {success
        ? 'Goed gedaan! Je hebt alle vragen juist'
        : `Sorry, je had ${count}/${num} vragen fout!`}
    </div>
  );
};

interface QuizViewType extends Match {
  onClose: Function;
  activity: Activity;
  onSubmit: Function;
  id: string;
  authUser: AuthUser;
  activitySubmission: ActivitySubmissionType;
  addActivitySubmission: (
    sub: ActivitySubmissionType,
    userEnvId: string
  ) => any;
  toggleUserview: Function;
  disabled: boolean;
}

const QuizView: React.FC<QuizViewType> = props => {
  const {
    activity,
    match: {
      params: {userEnvId}
    },
    id,
    authUser,
    activitySubmission,
    addActivitySubmission,
    toggleUserview,
    disabled = false
  } = props;

  const {questions} = activity.value || {
    questions: []
    // description: null,
    // title: null
  };

  const {completed = false} = activitySubmission || {};

  const {uid, username} = authUser;

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [userInput, setUserInput] = useState<QuizResponse>(
    (activitySubmission && activitySubmission.response) ||
      getAllAnswers(questions)
  );

  const currentSubmission = {
    date: new Date(),
    uid,
    id,
    response: userInput,
    username,
    completed,
    type: QUIZ
  };

  const handleInputChange = (event: any, id: string) => {
    const {target} = event;
    const {checked} = target;
    setUserInput({...userInput, [id]: checked});
  };

  const getResults = () => {
    const allAnswers = questions.reduce(
      (acc: Answer[], q: Question) => [...q.answers, ...acc],
      []
    );

    const count =
      questions.length -
      questions.filter((q: Question) =>
        q.answers.every((a: Answer) => userInput[a.id] === a.correct)
      ).length;

    const success = allAnswers.every(
      (a: Answer) => userInput[a.id] === a.correct
    );

    return {
      success,
      count,
      num: questions.length
    };
  };

  const userAnswers = (a: Answer[]) => a.filter(d => userInput[d.id]);
  const btnClass = 'border-2 p-1 btn flex-grow';
  const lastQ = (i: number) => i === questions.length - 1;
  const filledInLastQ =
    questions.length > 0 &&
    !!questions[questions.length - 1].answers
      .map((a: Answer) => userInput[a.id])
      .find(Boolean);

  const curQ = questions[visibleIndex];
  const curAnswerCorrect = curQ.answers.every(
    (a: Answer) => userInput[a.id] === a.correct
  );

  return (
    <div className="flex flex-col flex-grow bg-white overflow-y-auto">
      <TabSlider
        className="flex-grow flex flex-col"
        tabClassName="flex-grow"
        draggable={false}
        visibleIndex={visibleIndex}>
        {questions.map((q: Question, i: number) => (
          <div className="flex flex-col flex-grow overflow-y-auto">
            {q.img && (
              <img
                className="mb-2 h-64"
                style={{objectFit: 'contain'}}
                src={q.img.url}
              />
            )}
            <p className="text-lg text-gray-700 text-xl border-b-2 mb-2">
              {q.text}
            </p>
            <div className="flex-grow overflow-y-auto ">
              {q.answers.map(a => (
                <div className="mb-2 ">
                  <label className="block text-gray-500 ">
                    <input
                      type="checkbox"
                      name={a.id}
                      disabled={submitted}
                      className={clsx(
                        'mr-2 leading-tight',
                        css.checkbox,
                        submitted && 'disabled'
                      )}
                      onChange={e => handleInputChange(e, a.id)}
                      checked={userInput[a.id]}
                      id={a.text}
                    />
                    <span className="text-lg">{a.text}</span>
                  </label>
                </div>
              ))}
            </div>
            {showFeedback && (
              <QuestionFeedback correct={curAnswerCorrect} />
            )}
            {lastQ(i) && submitted && (
              <QuizResults
                {...props}
                className="mt-auto mb-3 mx-2"
                {...getResults()}
              />
            )}
            <div className="mt-auto">
              <div className="flex">
                {i > 0 && (
                  <button
                    type="button"
                    disabled={submitted}
                    className={clsx(
                      btnClass,
                      'mr-1',
                      submitted && 'disabled'
                    )}
                    onClick={() => setVisibleIndex(i - 1)}>
                    Back
                  </button>
                )}
                {!lastQ(i) && !!userAnswers(q.answers).length && (
                  <button
                    type="button"
                    className={btnClass}
                    onClick={() => {
                      setShowFeedback(true);
                      setTimeout(() => {
                        setVisibleIndex(i + 1);
                        setShowFeedback(false);
                      }, 1000);
                    }}>
                    Next
                  </button>
                )}
                {lastQ(i) && filledInLastQ && (
                  <button
                    disabled={disabled}
                    className={clsx(
                      btnClass,
                      `bg-green-500 text-white`,
                      disabled && 'disabled'
                    )}
                    type="button"
                    onClick={() => {
                      !toggleUserview &&
                        addActivitySubmission(
                          {
                            ...currentSubmission,
                            completed: true,
                            succeeded: getResults().success
                          },
                          userEnvId
                        );
                      setSubmitted(true);
                    }}>
                    Submit
                  </button>
                )}
              </div>
            </div>
            {toggleUserview && (
              <button
                type="button"
                className="btn border-2 w-full mt-2 mb-2 p-1 bg-yellow-500 text-white"
                onClick={() => toggleUserview(false)}>
                Author View
              </button>
            )}
          </div>
        ))}
      </TabSlider>
    </div>
  );
};
export default QuizView;
