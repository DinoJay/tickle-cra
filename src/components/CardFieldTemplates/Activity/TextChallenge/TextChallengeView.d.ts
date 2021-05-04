import React from 'react';
import { Match } from '~/constants/typeUtils';
import ActivitySubmission from '~/constants/activitySubmissionType';
import AuthUser from '~/constants/authUserType';
import Activity from '~/constants/activityType';
interface TextChallengeType extends Match {
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
declare const TextChallenge: React.FC<TextChallengeType>;
export default TextChallenge;
