import React from 'react';
import Check from 'react-feather/dist/icons/check';
import X from 'react-feather/dist/icons/x';
import clsx from 'clsx';
import QuizAuthor, {Answer, Question} from './QuizAuthor';
import {QUIZ} from '~/constants/cardFields';

import QuizView from './QuizView';
import PreviewFrame from '../../PreviewFrame';
import Activity from '~/constants/activityType';
import ActivitySubmissionType from '~/constants/activitySubmissionType';
import AuthUser from '~/constants/authUserType';
import {Match} from '~/constants/typeUtils';

export const type = QUIZ;
export const label = 'QUIZ';

interface ModalContentType extends Match {
  onClose: Function;
  activityUserview: boolean;
  onChange: Function;
  onSubmit: Function;
  id: string;
  activity: Activity;
  authUser: AuthUser;
  activitySubmission: ActivitySubmissionType;
  addActivitySubmission: (sub: any, userEnvId: string) => any;
  toggleUserview: Function;
  disabled: boolean;
}

export const ModalContent: React.FC<ModalContentType> = props => {
  const {
    activityUserview,
    toggleUserview,
    onChange,
    onSubmit,
    onClose,
    activity,
    authUser,
    id,
    activitySubmission,
    addActivitySubmission
  } = props;

  return activityUserview ? (
    <QuizView
      key="1"
      disabled
      onClose={onClose}
      activity={activity}
      onSubmit={onSubmit}
      id={id}
      authUser={authUser}
      activitySubmission={activitySubmission}
      addActivitySubmission={addActivitySubmission}
      toggleUserview={toggleUserview}
      {...props}
    />
  ) : (
    <QuizAuthor
      {...props}
      toggleUserview={toggleUserview}
      onChange={onChange}
      activity={activity}
    />
  );
};

// import ActivityDB from '~/firebase/db/activity_db';

export const View = QuizView;

export const Preview: React.FC<{
  activity: Activity;
  onClick: Function;
}> = ({activity, onClick}) => (
  <PreviewFrame
    placeholder="Quiz"
    onClick={onClick}
    type={label}
    empty={activity.value === null}
    content={() => activity.value.title}
  />
);

export const Results: React.FC<{
  // TODO
  // TODO
  // TODO
  // TODO
  // TODO
  submission: any;
  activity: Activity;
}> = props => {
  const {
    submission,
    activity: {value: activityVal}
  } = props;
  const {response} = submission;

  return (
    <div>
      {response &&
        activityVal.questions.map((q: Question, i: number) => (
          <div className="m-2">
            <div className="font-bold">
              <span>Q{i + 1}: </span> {q.text}
            </div>
            <ul className="ml-4">
              {q.answers.map((a: Answer, j: number) => (
                <li
                  className={clsx(
                    a.correct && response[a.id] && 'text-green-600',
                    !a.correct && response[a.id] && 'text-red-600',
                    'flex'
                  )}>
                  <span className="font-bold">A{j + 1}: </span>
                  <span>{a.text}</span>
                  <span>
                    {a.correct && response[a.id] === a.correct && (
                      <Check />
                    )}
                    {!a.correct && response[a.id] && <X />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};
