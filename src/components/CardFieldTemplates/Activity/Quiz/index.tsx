import React from 'react';
import Check from 'react-feather/dist/icons/check';
import X from 'react-feather/dist/icons/x';
import clsx from 'clsx';
import QuizAuthor, {Answer, Question} from './QuizAuthor';
import {QUIZ} from '~/constants/cardFields';
import Activity from '~/constants/activityType';
import ActivitySubmission from '~/constants/activitySubmissionType';
import AuthUser from '~/constants/authUserType';
import {Match} from '~/constants/typeUtils';

import QuizView from './QuizView';
import PreviewFrame from '../../PreviewFrame';

export const type = QUIZ;
export const label = 'QUIZ';

interface ModalContentType extends Match {
  activityUserview: boolean;
  onClose: Function;
  activity: Activity;
  onSubmit: Function;
  id: string;
  toggleUserview: Function;
  onChange: Function;
  authUser: AuthUser;
  activitySubmission: ActivitySubmission;
  addActivitySubmission: (sub: any, userEnvId: string) => any;
}

export const ModalContent: React.FC<ModalContentType> = props => {
  const {
    activityUserview,
    authUser,
    onClose,
    activity,
    onSubmit,
    id,
    toggleUserview,
    onChange,
    match,
    addActivitySubmission,
    activitySubmission
  } = props;

  // activity,
  // match: {
  //   params: {userEnvId}
  // },
  // id,
  // authUser,
  // activitySubmission,
  // addActivitySubmission,
  // toggleUserview,
  // disabled = false

  return activityUserview ? (
    <QuizView
      disabled={false}
      id={id}
      authUser={authUser}
      addActivitySubmission={addActivitySubmission}
      activitySubmission={activitySubmission}
      toggleUserview={toggleUserview}
      match={match}
      onClose={onClose}
      activity={activity}
      onSubmit={onSubmit}
    />
  ) : (
    <QuizAuthor
      {...props}
      toggleUserview={toggleUserview}
      onChange={onChange}
      activity={activity}
      key="1"
    />
  );
};

// import ActivityDB from '~/firebase/db/activity_db';

export const View = QuizView;

export const Preview = ({
  activity,
  onClick
}: {
  activity: Activity;
  onClick: Function;
}) => (
  <PreviewFrame
    placeholder="Quiz"
    onClick={onClick}
    type={label}
    empty={activity.value === null}
    content={() => activity.value.title}
  />
);

export const Results: React.FC<{
  submission: ActivitySubmission;
  activity: Activity;
}> = props => {
  // console.log('quiz props', props);
  const {
    submission,
    activity: {value: activityVal}
  } = props;
  const {response} = submission;
  // console.log('submission', submission);
  // console.log('Activity', activityVal);

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
