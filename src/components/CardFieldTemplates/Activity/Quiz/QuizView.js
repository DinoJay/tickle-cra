import React, { useState } from 'react';
import clsx from 'clsx';
import { QUIZ } from '~/constants/cardFields';
// import TabSwitcher from '~/components/utils/TabSwitcher';
import TabSlider from '~/components/utils/TabSlider';
// import quiz1 from '~/styles/quiz.svg';
// import quiz2 from '~/styles/quiz2.svg';
// import Flicker from '~/components/utils/Flicker';
import css from './Quiz.scss';
const QuestionFeedback = props => {
    const { correct } = props;
    const cls = 'mx-2 mb-3 p-2 text-white border-2 border-black shadow';
    if (correct)
        return (React.createElement("div", { className: clsx(cls, 'bg-green-500') }, "'Correct Answer'"));
    return (React.createElement("div", { className: clsx(cls, 'bg-red-500 uppercase font-bold') }, "Wrong Answer"));
};
const getAllAnswers = (questions) => questions.reduce((acc, q) => {
    const tmpAns = q.answers.reduce((acc2, a) => ({ ...acc2, [a.id]: false }), {});
    return { ...acc, ...tmpAns };
}, {});
const QuizResults = props => {
    const { success, count, num, className } = props;
    return (React.createElement("div", { className: `alert ${success ? 'bg-green-500' : 'bg-red-500'} ${className}` }, success
        ? 'Goed gedaan! Je hebt alle vragen juist'
        : `Sorry, je had ${count}/${num} vragen fout!`));
};
const QuizView = props => {
    const { activity, match: { params: { userEnvId } }, id, authUser, activitySubmission, addActivitySubmission, toggleUserview, disabled = false } = props;
    const { questions } = activity.value || {
        questions: []
        // description: null,
        // title: null
    };
    const { completed = false } = activitySubmission || {};
    const { uid, username } = authUser;
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [userInput, setUserInput] = useState((activitySubmission && activitySubmission.response) ||
        getAllAnswers(questions));
    const currentSubmission = {
        date: new Date(),
        uid,
        id,
        response: userInput,
        username,
        completed,
        type: QUIZ
    };
    const handleInputChange = (event, id) => {
        const { target } = event;
        const { checked } = target;
        setUserInput({ ...userInput, [id]: checked });
    };
    const getResults = () => {
        const allAnswers = questions.reduce((acc, q) => [...q.answers, ...acc], []);
        const count = questions.length -
            questions.filter((q) => q.answers.every((a) => userInput[a.id] === a.correct)).length;
        const success = allAnswers.every((a) => userInput[a.id] === a.correct);
        return {
            success,
            count,
            num: questions.length
        };
    };
    const userAnswers = (a) => a.filter(d => userInput[d.id]);
    const btnClass = 'border-2 p-1 btn flex-grow';
    const lastQ = (i) => i === questions.length - 1;
    const filledInLastQ = questions.length > 0 &&
        !!questions[questions.length - 1].answers
            .map((a) => userInput[a.id])
            .find(Boolean);
    const curQ = questions[visibleIndex];
    const curAnswerCorrect = curQ.answers.every((a) => userInput[a.id] === a.correct);
    return (React.createElement("div", { className: "flex flex-col flex-grow bg-white overflow-y-auto" },
        React.createElement(TabSlider, { className: "flex-grow flex flex-col", tabClassName: "flex-grow", draggable: false, visibleIndex: visibleIndex }, questions.map((q, i) => (React.createElement("div", { className: "flex flex-col flex-grow overflow-y-auto" },
            q.img && (React.createElement("img", { className: "mb-2 h-64", style: { objectFit: 'contain' }, src: q.img.url })),
            React.createElement("p", { className: "text-lg text-gray-700 text-xl border-b-2 mb-2" }, q.text),
            React.createElement("div", { className: "flex-grow overflow-y-auto " }, q.answers.map(a => (React.createElement("div", { className: "mb-2 " },
                React.createElement("label", { className: "block text-gray-500 " },
                    React.createElement("input", { type: "checkbox", name: a.id, disabled: submitted, className: clsx('mr-2 leading-tight', css.checkbox, submitted && 'disabled'), onChange: e => handleInputChange(e, a.id), checked: userInput[a.id], id: a.text }),
                    React.createElement("span", { className: "text-lg" }, a.text)))))),
            showFeedback && (React.createElement(QuestionFeedback, { correct: curAnswerCorrect })),
            lastQ(i) && submitted && (React.createElement(QuizResults, Object.assign({}, props, { className: "mt-auto mb-3 mx-2" }, getResults()))),
            React.createElement("div", { className: "mt-auto" },
                React.createElement("div", { className: "flex" },
                    i > 0 && (React.createElement("button", { type: "button", disabled: submitted, className: clsx(btnClass, 'mr-1', submitted && 'disabled'), onClick: () => setVisibleIndex(i - 1) }, "Back")),
                    !lastQ(i) && !!userAnswers(q.answers).length && (React.createElement("button", { type: "button", className: btnClass, onClick: () => {
                            setShowFeedback(true);
                            setTimeout(() => {
                                setVisibleIndex(i + 1);
                                setShowFeedback(false);
                            }, 1000);
                        } }, "Next")),
                    lastQ(i) && filledInLastQ && (React.createElement("button", { disabled: disabled, className: clsx(btnClass, `bg-green-500 text-white`, disabled && 'disabled'), type: "button", onClick: () => {
                            !toggleUserview &&
                                addActivitySubmission({
                                    ...currentSubmission,
                                    completed: true,
                                    succeeded: getResults().success
                                }, userEnvId);
                            setSubmitted(true);
                        } }, "Submit")))),
            toggleUserview && (React.createElement("button", { type: "button", className: "btn border-2 w-full mt-2 mb-2 p-1 bg-yellow-500 text-white", onClick: () => toggleUserview(false) }, "Author View"))))))));
};
export default QuizView;
