import React from 'react';
import Chevrons from 'react-feather/dist/icons/chevrons-right';
import clsx from 'clsx';
import { useQueryParams, StringParam, BooleanParam } from 'use-query-params';
import { ModalBody } from '~/components/utils/Modal';
import { ACTIVITY } from '~/constants/cardFields';
import PreviewFrame from '../PreviewFrame';
import * as BookWidget from './BookWidget';
import * as TextChallenge from './TextChallenge';
import * as Quiz from './Quiz';
import * as Hangman from './Hangman';
export const activityComps = {
    [BookWidget.type]: BookWidget,
    [TextChallenge.type]: TextChallenge,
    [Quiz.type]: Quiz,
    [Hangman.type]: Hangman
};
export const getActivityCompView = k => {
    const Comp = activityComps[k];
    if (!Comp)
        return () => React.createElement("div", null, "Loading");
    return Comp.View;
};
const GridSelect = props => {
    const { selectedKey, children, style } = props;
    const selected = children.find((c) => c.key === selectedKey);
    const { detail } = selected || { detail: null };
    return (React.createElement("div", { style: style, className: clsx('w-full flex flex-grow flex-col overflow-hidden', !selectedKey && 'items-center') }, selectedKey
        ? [detail]
        : children.map((d) => d.preview)));
};
export const key = ACTIVITY;
export const label = 'Activity';
const ActivityAuthor = props => {
    const { activity, modalProps, onChange, 
    // style,
    addToStorage, removeFromStorage, onSubmit, disabled } = props;
    const [query = null, setQuery] = useQueryParams({
        selectedKey: StringParam,
        dialogKey: StringParam,
        activityUserview: BooleanParam
    });
    /* TODO dialog key is external, it comes from editcardfront */
    const { selectedKey, activityUserview, dialogKey } = query || {};
    const updateQuery = (newSt) => setQuery({ dialogKey, selectedKey, activityUserview, ...newSt });
    const activityType = activity ? activity.type : undefined;
    const allActivities = [TextChallenge, Quiz, Hangman];
    return (React.createElement(ModalBody, Object.assign({}, modalProps, { onClose: () => {
            modalProps.onClose();
            setQuery({
                selectedKey: undefined,
                dialogKey: undefined
            });
            // if (!query) setQuery({dialogKey: null, selectedKey: null});
        }, title: undefined, header: React.createElement("div", { className: "flex mt-3 items-center" },
            React.createElement("button", { type: "button", className: "btn-invisible", disabled: !query, onClick: () => updateQuery({ selectedKey: undefined }) },
                React.createElement("h1", null, "Activities")),
            selectedKey && (React.createElement("div", { key: "chevrons" },
                React.createElement(Chevrons, null))),
            selectedKey && (React.createElement("div", { key: "query", className: "btn-invisible" },
                React.createElement("h2", null, selectedKey)))), className: "flex-grow" }),
        React.createElement("div", { className: "flex flex-col flex-grow " },
            React.createElement(GridSelect, { selectedKey: selectedKey, style: { minHeight: 0 } }, allActivities.map(d => ({
                key: d.type,
                preview: (React.createElement("div", { key: d.type, className: `btn w-48 h-48 border-2 p-2 my-1 mr-3 ${activityType === d.type ? 'bg-yellow-400' : 'bg-white'}`, onClick: () => {
                        updateQuery({ selectedKey: d.type });
                    } }, d.label)),
                detail: (React.createElement(d.ModalContent, Object.assign({}, props, { onSubmit: onSubmit, disabled: disabled, addToStorage: addToStorage, removeFromStorage: removeFromStorage, key: d.type, activityUserview: !!activityUserview, toggleUserview: (us) => {
                        updateQuery({ activityUserview: us });
                    }, activity: activity, onChange: (value) => {
                        onChange({ key, label, value, type: d.type });
                    } })))
            })))),
        selectedKey && (React.createElement("div", { className: "flex w-full mt-auto" },
            React.createElement("button", { type: "button", className: "btn p-2 flex-grow border-2", onClick: () => setQuery({
                    selectedKey: undefined,
                    activityUserview: false
                }) }, "Back"),
            React.createElement("button", { type: "button", className: "btn p-2 bg-green-500 border-2 text-white flex-grow", onClick: () => modalProps.onClose() }, activityType === selectedKey
                ? 'Update Activity'
                : 'Add Activity')))));
};
// const BookWidgetNonAuth = props => {
//   const {activity} = props;
//   const nonAuthUrl = activity.value.url.replace('lti/', '');
//   return (
//     <iframe
//       title="nonAuthBookwidgetIframe"
//       src={nonAuthUrl}
//       className="flex-grow"
//     />
//   );
// };
const PureView = props => {
    const { activity } = props;
    if (!activity.value)
        return React.createElement("div", null, "err");
    const t = activity.type;
    if (!t)
        return null;
    const ActivityComp = activityComps[t].View;
    return React.createElement(ActivityComp, Object.assign({}, props));
};
export const View = props => {
    const { activity, modalProps } = props;
    return (React.createElement(ModalBody, Object.assign({ title: activity.value && activity.value.title }, modalProps, { className: "flex-grow overflow-y-auto" }),
        React.createElement(PureView, Object.assign({}, props))));
};
export const ModalContent = props => {
    const { disabled, onChange, onClose, authUser, id, addActivitySubmission, activitySubmission, addToStorage, removeFromStorage, match, onSubmit } = props;
    return disabled ? (React.createElement(View, Object.assign({}, props))) : (React.createElement(ActivityAuthor, Object.assign({}, props, { match: match, onSubmit: onSubmit, addToStorage: addToStorage, removeFromStorage: removeFromStorage, activitySubmission: activitySubmission, addActivitySubmission: addActivitySubmission, id: id, onChange: onChange, authUser: authUser, onClose: onClose })));
};
export const Preview = ({ activity, onClick }) => (React.createElement(PreviewFrame, { placeholder: "Activity", onClick: () => onClick(), type: label, empty: activity.value === null, content: () => activity.value.title || React.createElement("span", { className: "italic" }, "No Title") }));
