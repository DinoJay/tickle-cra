import React  from 'react';
// import clsx from 'clsx';
// import {QUIZ} from '~/constants/cardFields';

// import TabSwitcher from '~/components/utils/TabSwitcher';
// import TabSlider from '~/components/utils/TabSlider';
import {Match} from '~/constants/typeUtils';
import Activity from '~/constants/activityType';
import AuthUser from '~/constants/authUserType';
import ActivitySubmissionType from '~/constants/activitySubmissionType';

// import {Question, Answer} from './QuizAuthor';

// import css from './Quiz.scss';

// type MemoryResponse = {[id: string]: boolean};

interface MemoryViewType extends Match {
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

const MemoryView: React.FC<MemoryViewType> = props => {
  const {
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
  } = props;

  return (
    <div className="flex flex-col flex-grow bg-white overflow-y-auto" />
  );
};
export default MemoryView;
