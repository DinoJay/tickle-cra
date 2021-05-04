import React, {useState} from 'react';
import {timeFormat} from 'd3-time-format';
// import Check from 'react-feather/dist/icons/check';
// import X from 'react-feather/dist/icons/x';
import ThumbUp from 'react-feather/dist/icons/thumbs-up';
import ThumbDown from 'react-feather/dist/icons/thumbs-down';
import EditIcon from 'react-feather/dist/icons/edit-2';
import CardControls from '~/components/cards/CardControls';
import AlertButton from '~/components/utils/AlertButton';
// import cardDB from '~/firebase/db/card_db';
// import {BlackModal, ModalBody} from '~/components/utils/Modal';

// import BookWidgetResults from '~/components/Admin/BookWidgetsPanel/ResultsWidget';

import {activityComps} from '~/components/CardFieldTemplates/Activity';
import DetailsFrame from '~/components/utils/DetailsFrame';

import ActivitySubmission from '~/constants/activitySubmissionType';
import Activity from '~/constants/activityType';
// import {Card} from '~/constants/cardFields';
import AuthUser from '~/constants/authUserType';
// import {Match} from '~/constants/typeUtils';

const getActivityResultComp = (activityTypeId: string | null) => {
  const DefaultComp = () => <div>Nothing to show</div>;
  if (!activityTypeId) return DefaultComp;

  return activityComps[activityTypeId] &&
    activityComps[activityTypeId].Results
    ? activityComps[activityTypeId].Results
    : DefaultComp;
};

interface UserSubmissionsCardBackType {
  onFlip: Function;
  onClose: Function;
  allActivitySubs: ActivitySubmission[];
  authUser: AuthUser;
  activity: Activity;
  uid: string;
  id: string;
  userEnvId: string;
  asyncRemoveActivitySub: Function;
}

const UserSubmissionsCardBack: React.FC<UserSubmissionsCardBackType> = props => {
  const {
    onFlip,
    onClose,
    allActivitySubs,
    authUser,
    activity,
    id,
    userEnvId,
    asyncRemoveActivitySub
  } = props;

  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const formatTime = timeFormat('%B %d, %Y');

  const classOfSubmission = (
    s: ActivitySubmission,
    activityTypeId: string | null
  ) => {
    if (activityTypeId === 'textChallenge') {
      if (s.feedback) {
        return `flex justify-between border-4 p-2 mb-2 w-full shadow ${
          s.succeeded ? 'border-green-500' : 'border-red-500'
        }`;
      }
      return 'flex justify-between border-4 p-2 mb-2 w-full shadow border-yellow-600';
    }
    return `flex justify-between border-4 p-2 mb-2 w-full shadow ${
      s.succeeded ? 'border-green-500' : 'border-red-500'
    }`;
  };

  const symbolOfSubmission = (
    s: ActivitySubmission,
    activityTypeId: string | null
  ) => {
    if (activityTypeId === 'textChallenge') {
      if (s.feedback) {
        return s.succeeded ? <ThumbUp /> : <ThumbDown />;
      }
      return <EditIcon />;
    }
    return s.succeeded ? <ThumbUp /> : <ThumbDown />;
  };

  const ActivityResults = getActivityResultComp(activity.type);

  console.log('allActivitySubs', allActivitySubs);

  return (
    <div className="flex-grow flex flex-col overflow-y-auto">
      <div className="p-2 flex flex-col flex-grow overflow-y-auto">
        <h2 className="mb-2 ">Activity Submissions</h2>
        {allActivitySubs.map(s => (
          <DetailsFrame
            key={s.uid}
            onClick={() =>
              setSubmissionId(submissionId !== s.uid ? s.uid : null)
            }
            open={submissionId === s.uid}
            header={
              <div className="text-base italic flex w-full">
                <span> {`${s.username}, `} </span>
                <span>{s.date && formatTime(s.date.toDate())}</span>
                <span className="ml-auto">
                  {symbolOfSubmission(s, activity.type)}
                </span>
              </div>
            }
            className={`${!authUser.teacherId &&
              'disabled'} ${classOfSubmission(s, activity.type)}`}>
            <ActivityResults
              {...props}
              submission={s}
              activitySubmission={s}
            />
            <div className="px-2">
              <AlertButton
                msg="Do you really want to remove the activity submission?"
                className="bg-red-500 p-1 text-white font-bold w-full"
                type="button"
                onClick={() =>
                  asyncRemoveActivitySub({uid: s.uid, id, userEnvId})
                }>
                Remove
              </AlertButton>
            </div>
          </DetailsFrame>
        ))}
      </div>
      <CardControls
        className="mt-auto"
        onFlip={onFlip}
        onClose={onClose}
      />
    </div>
  );
};
export default UserSubmissionsCardBack;
