import React from 'react';
import Check from 'react-feather/dist/icons/check';
import X from 'react-feather/dist/icons/x';
import clsx from 'clsx';
import QuizAuthor from './QuizAuthor';
import { QUIZ } from '~/constants/cardFields';
import QuizView from './QuizView';
import PreviewFrame from '../../PreviewFrame';
export const type = QUIZ;
export const label = 'QUIZ';
export const ModalContent = props => {
    const { activityUserview, authUser, onClose, activity, onSubmit, id, toggleUserview, onChange, match, addActivitySubmission, activitySubmission } = props;
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
    return activityUserview ? (React.createElement(QuizView, { disabled: false, id: id, authUser: authUser, addActivitySubmission: addActivitySubmission, activitySubmission: activitySubmission, toggleUserview: toggleUserview, match: match, onClose: onClose, activity: activity, onSubmit: onSubmit })) : (React.createElement(QuizAuthor, Object.assign({}, props, { toggleUserview: toggleUserview, onChange: onChange, activity: activity, key: "1" })));
};
// import ActivityDB from '~/firebase/db/activity_db';
export const View = QuizView;
export const Preview = ({ activity, onClick }) => (React.createElement(PreviewFrame, { placeholder: "Quiz", onClick: onClick, type: label, empty: activity.value === null, content: () => activity.value.title }));
export const Results = props => {
    // console.log('quiz props', props);
    const { submission, activity: { value: activityVal } } = props;
    const { response } = submission;
    // console.log('submission', submission);
    // console.log('Activity', activityVal);
    return (React.createElement("div", null, response &&
        activityVal.questions.map((q, i) => (React.createElement("div", { className: "m-2" },
            React.createElement("div", { className: "font-bold" },
                React.createElement("span", null,
                    "Q",
                    i + 1,
                    ": "),
                " ",
                q.text),
            React.createElement("ul", { className: "ml-4" }, q.answers.map((a, j) => (React.createElement("li", { className: clsx(a.correct && response[a.id] && 'text-green-600', !a.correct && response[a.id] && 'text-red-600', 'flex') },
                React.createElement("span", { className: "font-bold" },
                    "A",
                    j + 1,
                    ": "),
                React.createElement("span", null, a.text),
                React.createElement("span", null,
                    a.correct && response[a.id] === a.correct && (React.createElement(Check, null)),
                    !a.correct && response[a.id] && React.createElement(X, null)))))))))));
};
