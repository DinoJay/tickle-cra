import React from 'react';
// import clsx from 'clsx';
import {TEXT_CHALLENGE} from '~/constants/cardFields';
import TextChallengeAuthor from './TextChallengeAuthor';
import TextChallengeView from './TextChallengeView';
import PreviewFrame from '../../PreviewFrame';

import {Match} from '~/constants/typeUtils';
import AuthUser from '~/constants/authUserType';
import Activity from '~/constants/activityType';
import ActivitySubmission from '~/constants/activitySubmissionType';
import Review from './Review';

export const type = TEXT_CHALLENGE;
export const label = 'Geo-Caching';

interface ModalContentType extends Match {
  activityUserview: boolean;
  onChange: Function;
  onClose: Function;
  activity: Activity;
  addToStorage: Function;
  removeFromStorage: Function;
  id: string;
  authUser: AuthUser;
  activitySubmission: ActivitySubmission;
  addActivitySubmission: Function;
  toggleUserview: Function;
}

export const ModalContent: React.FC<ModalContentType> = props => {
  const {
    activityUserview,
    activity,
    onChange,
    onClose,
    removeFromStorage,
    addToStorage,
    id,
    match
  } = props;

  return activityUserview ? (
    <TextChallengeView {...props} />
  ) : (
    <TextChallengeAuthor
      match={match}
      onClose={onClose}
      addToStorage={addToStorage}
      removeFromStorage={removeFromStorage}
      id={id}
      onChange={onChange}
      activity={activity}
      {...props}
    />
  );
};

export const View = TextChallengeView;

export const Preview: React.FC<{
  activity: Activity;
  onClick: Function;
}> = ({activity, onClick}) => (
  <PreviewFrame
    placeholder="text challenge"
    onClick={onClick}
    type={label}
    empty={activity.value === null}
    content={() => activity.value.title}
  />
);

export const Results = Review;
