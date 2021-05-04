import React from 'react';
import clsx from 'clsx';
import {HANGMAN} from '~/constants/cardFields';
import HangmanAuthor from './HangmanAuthor';
import HangmanView, {OneLetter} from './HangmanView';
import PreviewFrame from '../../PreviewFrame';
import Activity from '~/constants/activityType';
import ActivitySubmission from '~/constants/activitySubmissionType';
import {Match} from '~/constants/typeUtils';

export const type = HANGMAN;
export const label = 'HANGMAN';

interface ModalContentType extends Match {
  activityUserview: boolean;
  activitySubmission: ActivitySubmission;
  addActivitySubmission: (a: any, userEnvId: string) => any;
  id: string;
  disabled: boolean;
  toggleUserview: (a: boolean) => any;
  style?: React.CSSProperties;
  onChange: Function;
  activity: Activity;
}

export const ModalContent: React.FC<ModalContentType> = props => {
  const {
    activityUserview,
    toggleUserview,
    activitySubmission,
    // style,
    // onChange,
    activity
  } = props;

  return activityUserview ? (
    <HangmanView
      {...props}
      toggleUserview={toggleUserview}
      activitySubmission={activitySubmission}
      activity={activity}
    />
  ) : (
    <HangmanAuthor {...props} />
  );
};

export const View = HangmanView;

export const Results: React.FC<ModalContentType> = props => {
  console.log('results props', props);
  const {activitySubmission} = props;

  const {response} = activitySubmission;
  if(!response) return null;
  // console.log('activitySubmission', activitySubmission);

  return (
    <div className="p-2 ">
      <h2>Response:</h2>
      <div className="flex">
        {response.map((o: OneLetter) => (
          <div
            className={clsx(
              'p-3 text-lg text-white mx-1',
              !o.inputLetter ? 'bg-red-400' : 'bg-gray-400'
            )}>
            {o.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Preview: React.FC<{
  activity: Activity;
  onClick: Function;
}> = ({activity, onClick}) => (
  <PreviewFrame
    placeholder="Activity"
    onClick={onClick}
    type={label}
    empty={activity.value === null}
    content={() => activity.value.title}
  />
);
