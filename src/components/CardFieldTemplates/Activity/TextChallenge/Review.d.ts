import React from 'react';
import { Card } from '~/constants/cardFields';
import { Match } from '~/constants/typeUtils';
import Activity from '~/constants/activityType';
import ActivitySubmission from '~/constants/activitySubmissionType';
interface ResultsType extends Match {
    cards: Card[];
    activity: Activity;
    addActivitySubmission: Function;
    submission: ActivitySubmission;
}
declare const Results: React.FC<ResultsType>;
export default Results;
