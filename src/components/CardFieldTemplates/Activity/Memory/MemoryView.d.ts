import React from 'react';
import { Match } from '~/constants/typeUtils';
import Activity from '~/constants/activityType';
import AuthUser from '~/constants/authUserType';
import ActivitySubmissionType from '~/constants/activitySubmissionType';
interface MemoryViewType extends Match {
    onClose: Function;
    activity: Activity;
    onSubmit: Function;
    id: string;
    authUser: AuthUser;
    activitySubmission: ActivitySubmissionType;
    addActivitySubmission: (sub: ActivitySubmissionType, userEnvId: string) => any;
    toggleUserview: Function;
    disabled: boolean;
}
declare const MemoryView: React.FC<MemoryViewType>;
export default MemoryView;
