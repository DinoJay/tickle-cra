import React from 'react';
import Activity from '~/constants/activityType';
import ActivitySubmission from '~/constants/activitySubmissionType';
import { Match } from '~/constants/typeUtils';
interface HangmanViewType extends Match {
    activity: Activity;
    id: string;
    activitySubmission: ActivitySubmission;
    addActivitySubmission: (a: any, userEnvId: string) => any;
    toggleUserview: Function;
    disabled: boolean;
}
export declare type OneLetter = {
    name: string;
    inputLetter: string | null;
    preVisible?: boolean;
};
export declare type Answer = OneLetter[];
declare const HangmanView: React.FC<HangmanViewType>;
export default HangmanView;
