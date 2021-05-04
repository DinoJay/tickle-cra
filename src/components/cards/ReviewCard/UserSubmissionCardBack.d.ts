import React from 'react';
import ActivitySubmission from '~/constants/activitySubmissionType';
import Activity from '~/constants/activityType';
import AuthUser from '~/constants/authUserType';
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
declare const UserSubmissionsCardBack: React.FC<UserSubmissionsCardBackType>;
export default UserSubmissionsCardBack;
