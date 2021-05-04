import React, { useState } from 'react';
import { timeFormat } from 'd3-time-format';
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
import { activityComps } from '~/components/CardFieldTemplates/Activity';
import DetailsFrame from '~/components/utils/DetailsFrame';
// import {Match} from '~/constants/typeUtils';
const getActivityResultComp = (activityTypeId) => {
    const DefaultComp = () => React.createElement("div", null, "Nothing to show");
    if (!activityTypeId)
        return DefaultComp;
    return activityComps[activityTypeId] &&
        activityComps[activityTypeId].Results
        ? activityComps[activityTypeId].Results
        : DefaultComp;
};
const UserSubmissionsCardBack = props => {
    const { onFlip, onClose, allActivitySubs, authUser, activity, id, userEnvId, asyncRemoveActivitySub } = props;
    const [submissionId, setSubmissionId] = useState(null);
    const formatTime = timeFormat('%B %d, %Y');
    const classOfSubmission = (s, activityTypeId) => {
        if (activityTypeId === 'textChallenge') {
            if (s.feedback) {
                return `flex justify-between border-4 p-2 mb-2 w-full shadow ${s.succeeded ? 'border-green-500' : 'border-red-500'}`;
            }
            return 'flex justify-between border-4 p-2 mb-2 w-full shadow border-yellow-600';
        }
        return `flex justify-between border-4 p-2 mb-2 w-full shadow ${s.succeeded ? 'border-green-500' : 'border-red-500'}`;
    };
    const symbolOfSubmission = (s, activityTypeId) => {
        if (activityTypeId === 'textChallenge') {
            if (s.feedback) {
                return s.succeeded ? React.createElement(ThumbUp, null) : React.createElement(ThumbDown, null);
            }
            return React.createElement(EditIcon, null);
        }
        return s.succeeded ? React.createElement(ThumbUp, null) : React.createElement(ThumbDown, null);
    };
    const ActivityResults = getActivityResultComp(activity.type);
    console.log('allActivitySubs', allActivitySubs);
    return (React.createElement("div", { className: "flex-grow flex flex-col overflow-y-auto" },
        React.createElement("div", { className: "p-2 flex flex-col flex-grow overflow-y-auto" },
            React.createElement("h2", { className: "mb-2 " }, "Activity Submissions"),
            allActivitySubs.map(s => (React.createElement(DetailsFrame, { key: s.uid, onClick: () => setSubmissionId(submissionId !== s.uid ? s.uid : null), open: submissionId === s.uid, header: React.createElement("div", { className: "text-base italic flex w-full" },
                    React.createElement("span", null,
                        " ",
                        `${s.username}, `,
                        " "),
                    React.createElement("span", null, s.date && formatTime(s.date.toDate())),
                    React.createElement("span", { className: "ml-auto" }, symbolOfSubmission(s, activity.type))), className: `${!authUser.teacherId &&
                    'disabled'} ${classOfSubmission(s, activity.type)}` },
                React.createElement(ActivityResults, Object.assign({}, props, { submission: s, activitySubmission: s })),
                React.createElement("div", { className: "px-2" },
                    React.createElement(AlertButton, { msg: "Do you really want to remove the activity submission?", className: "bg-red-500 p-1 text-white font-bold w-full", type: "button", onClick: () => asyncRemoveActivitySub({ uid: s.uid, id, userEnvId }) }, "Remove")))))),
        React.createElement(CardControls, { className: "mt-auto", onFlip: onFlip, onClose: onClose })));
};
export default UserSubmissionsCardBack;
