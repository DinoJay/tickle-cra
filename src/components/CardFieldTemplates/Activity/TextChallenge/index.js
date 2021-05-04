import React from 'react';
// import clsx from 'clsx';
import { TEXT_CHALLENGE } from '~/constants/cardFields';
import TextChallengeAuthor from './TextChallengeAuthor';
import TextChallengeView from './TextChallengeView';
import PreviewFrame from '../../PreviewFrame';
import Review from './Review';
export const type = TEXT_CHALLENGE;
export const label = 'Geo-Caching';
export const ModalContent = props => {
    const { activityUserview, activity, onChange, onClose, removeFromStorage, addToStorage, id, match } = props;
    return activityUserview ? (React.createElement(TextChallengeView, Object.assign({}, props))) : (React.createElement(TextChallengeAuthor, Object.assign({ match: match, onClose: onClose, addToStorage: addToStorage, removeFromStorage: removeFromStorage, id: id, onChange: onChange, activity: activity }, props)));
};
export const View = TextChallengeView;
export const Preview = ({ activity, onClick }) => (React.createElement(PreviewFrame, { placeholder: "text challenge", onClick: onClick, type: label, empty: activity.value === null, content: () => activity.value.title }));
export const Results = Review;
