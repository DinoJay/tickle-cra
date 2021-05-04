import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';
import sortBy from 'lodash/sortBy';
import X from 'react-feather/dist/icons/x';
import Plus from 'react-feather/dist/icons/plus';
import ThumbsDown from 'react-feather/dist/icons/thumbs-down';
import ThumbsUp from 'react-feather/dist/icons/thumbs-up';
import { theme } from 'Tailwind';
import clsx from 'clsx';
import { PhotoPreview } from '~/components/utils/PhotoUpload';
// import Check from 'react-feather/dist/icons/check';
import DetailsFrame from '~/components/utils/DetailsFrame';
const replaceByIdFn = (arr) => (q) => arr.reduce((acc, d) => (d.id === q.id ? [...acc, q] : [...acc, d]), []);
const inputClass = 'leading-tight px-2 py-1 text-base border appearance-none';
const areValidAnswers = (aa) => aa.length > 0 && aa.findIndex(a => a.correct) !== -1;
const EditAnswers = props => {
    const { answers, onChange } = props;
    const initA = () => ({
        id: uuidv1(),
        order: new Date().getMilliseconds(),
        correct: false,
        text: ''
    });
    const [newAnswer, setNewAnswer] = useState(initA());
    const updateNewAnswer = (a) => setNewAnswer({ ...newAnswer, ...a });
    const disabledAnswer = !newAnswer.text;
    return (React.createElement("div", { className: "p-1" },
        React.createElement("h3", { className: "text-base" }, "Answers:"),
        React.createElement("div", { className: "flex " },
            React.createElement("textarea", { className: clsx(inputClass, 'flex-grow text-sm'), value: newAnswer.text, onChange: e => updateNewAnswer({ text: e.target.value }) }),
            React.createElement("button", { type: "button", disabled: disabledAnswer, className: clsx('ml-2 btn border-2 text-base p-1', disabledAnswer && 'disabled'), onClick: () => {
                    onChange(sortBy([newAnswer, ...answers], 'order'));
                    setNewAnswer(initA());
                } },
                React.createElement(Plus, { className: "text-gray-600" }))),
        React.createElement("ol", { className: "py-2 my-1 list-decimal" }, answers.map(d => (React.createElement("li", { className: "flex items-center border-b mb-1" },
            React.createElement("button", { type: "button", className: "btn", onClick: () => {
                    onChange(answers.filter(e => e.id !== d.id));
                } },
                React.createElement(X, null)),
            React.createElement("span", null, d.text),
            React.createElement("button", { type: "button", className: "ml-auto btn", onClick: () => {
                    const newAnswers = replaceByIdFn(answers)({
                        ...d,
                        correct: !d.correct
                    });
                    onChange(newAnswers);
                } }, d.correct ? (React.createElement(ThumbsUp, { color: theme.colors.green[500] })) : (React.createElement(ThumbsDown, { color: theme.colors.red[500] })))))))));
};
const ErrorWarning = ({ question, answers }) => {
    const notis = [];
    const cls = 'text-white text-center m-2 p-1 font-bold';
    if (question && answers.length === 0)
        return (React.createElement("div", { className: clsx('bg-yellow-500 ', cls) }, "Please Enter your answers!"));
    if (question === null || (question === '' && Array.isArray(answers)))
        return (React.createElement("div", { className: clsx('bg-yellow-500 ', cls) }, "Please Enter your question and answers!"));
    if (!question)
        notis.push(React.createElement("div", { className: clsx('bg-red-500 ', cls) }, "Not valid question text"));
    if (!areValidAnswers(answers))
        notis.push(React.createElement("div", { className: clsx('bg-yellow-500', cls) }, "At least one Answer need to be correct"));
    if (notis.length === 0)
        notis.push(React.createElement("div", { className: clsx('bg-green-500 ', cls) }, "Question well done!!!"));
    return React.createElement(React.Fragment, null, notis.map(n => n));
};
const UpdQuestion = props => {
    const { className, onRemove, text, img, order, open, onClick, onUpdate, answers, index, id } = props;
    const update = (n) => {
        const nq = {
            text,
            id,
            order,
            answers,
            wellFormatted: !!text && areValidAnswers(answers),
            ...n
        };
        onUpdate({ ...nq });
    };
    const disabled = !answers || !text;
    return (React.createElement(DetailsFrame, { className: `${className} `, closedClassName: disabled
            ? 'border-2 border-yellow-500 shadow-yellow'
            : undefined, header: React.createElement("div", { className: "flex justify-between w-full overflow-hidden" },
            React.createElement("span", null,
                "#",
                index,
                " "),
            React.createElement("span", { className: "truncate flex-shrink " }, text || 'No Text added!'),
            onRemove && (React.createElement("button", { type: "button", className: "flex-none flex-shrink-0", onClick: () => onRemove() },
                React.createElement(X, null)))), onClick: onClick, open: open },
        React.createElement("div", { className: "flex flex-col justify-center p-1" },
            React.createElement(PhotoPreview, { shrinkable: false, className: "h-32 mb-3", contain: true, url: img ? img.url : undefined, edit: true, onChange: m => update({ img: m }) }),
            React.createElement("h3", { className: "text-base" }, "Question:"),
            React.createElement("input", { className: `${inputClass} flex-grow`, value: text, onChange: e => update({ text: e.target.value }) })),
        React.createElement(EditAnswers, Object.assign({}, props, { onChange: (as) => {
                update({ answers: as });
            } })),
        React.createElement(ErrorWarning, { question: text, answers: answers })));
};
const QuizAuthor = props => {
    const { className, style, toggleUserview, onChange, activity } = props;
    const { title = '', questions = [] } = activity.value || {};
    const addQs = (qs) => onChange({ ...activity.value, questions: qs });
    const replaceQ = (q) => {
        addQs(replaceByIdFn(questions)(q));
    };
    const initQ = () => ({
        id: uuidv1(),
        text: null,
        answers: [],
        order: new Date().getMilliseconds()
    });
    const [newQ, setNewQ] = useState(initQ());
    const [openQPanel, setOpenQPanel] = useState(null);
    const toggleOpenPanel = (id) => setOpenQPanel(openQPanel === id ? null : id);
    const disabledUserview = questions.length === 0 ||
        !!questions.find((q) => q.answers.length === 0 ||
            !q.answers.find(a => a.correct) ||
            !q.text);
    // console.log('disabledUserview', disabledUserview);
    return (React.createElement("div", { className: `${className} flex flex-col flex-grow w-full p-1`, style: { ...style, maxHeight: '100%' } },
        React.createElement("section", { className: "mb-4" },
            React.createElement("h2", { className: "mb-1" }, "Title"),
            React.createElement("input", { className: "form-control w-full border", placeholder: "Title", defaultValue: title, onChange: e => onChange({ ...activity.value, title: e.target.value }) })),
        React.createElement("h2", null, "Questions"),
        React.createElement("section", { className: "flex flex-col overflow-y-auto pr-1" }, sortBy(questions, 'order').map((d, i) => (React.createElement(UpdQuestion, Object.assign({ index: i + 1, className: "mb-2", order: i + 1, onUpdate: (q) => replaceQ(q), onClick: () => toggleOpenPanel(d.id), open: openQPanel === d.id, text: d.text, answers: d.answers }, d, { onRemove: () => addQs(questions.filter((e) => e.id !== d.id)) }))))),
        React.createElement("button", { onClick: () => {
                addQs([newQ, ...questions]);
                setNewQ(initQ());
            }, className: "border-2 mb-2 mt-4 btn w-full p-1", type: "submit" }, "Add Question"),
        toggleUserview && (React.createElement("button", { disabled: disabledUserview, type: "button", className: clsx('bg-yellow-500 text-white mb-2 p-1 mt-auto btn border-2', disabledUserview && 'disabled'), onClick: () => toggleUserview(true) }, "UserView"))));
};
export default QuizAuthor;
