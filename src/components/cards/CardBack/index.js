import React, { useState } from 'react';
import Minimize from 'react-feather/dist/icons/minimize';
import Maximize from 'react-feather/dist/icons/maximize';
import CardControls from '~/components/cards/CardControls';
import Comments from './Comments';
import RelatedTags from './RelatedTags';
import BackAuthor from './BackAuthor';
const BackField = ({ onClick, style, className, children, extended }) => (React.createElement("div", { className: `overflow-hidden relative flex flex-col ${className}`, style: {
        ...style
    } },
    React.createElement("div", { className: "mb-1 z-10 absolute flex-grow flex justify-end items-center", style: { right: 0 } },
        React.createElement("button", { type: "button", className: "btn bg-white m-2 p-1", onClick: () => onClick() }, extended ? React.createElement(Minimize, null) : React.createElement(Maximize, null))),
    children));
const CardBack = props => {
    const { onFlip, id: cardId, uid, onClose, className, addComment, authUser, controls, cards, topicDict, userEnvId } = props;
    const [extended, setExtended] = useState(null);
    const selectField = (field) => {
        setExtended(prevExtended => prevExtended !== field ? field : null);
    };
    const isExtended = (field) => extended === field && extended !== null;
    const displayStyle = (field) => {
        const flexStyle = () => {
            if (extended === null)
                return '0 10 33%';
            return extended === field ? '1 0 0%' : '0 10 0%';
        };
        return {
            transition: 'flex 300ms',
            flex: flexStyle()
            // overflow: fieldExtended ? 'scroll' : 'hidden'
        };
    };
    return (React.createElement("div", { className: `flex flex-col flex-grow ${className}` },
        React.createElement("div", { className: "flex-grow m-2 relative" },
            React.createElement("div", { className: "absolute h-full w-full flex flex-col  " },
                React.createElement(BackField, { className: "mb-2", style: displayStyle('author'), extended: isExtended('author'), onClick: () => selectField('author') },
                    React.createElement(BackAuthor, Object.assign({ uid: uid }, props, { extended: extended === 'author' }))),
                React.createElement(BackField, { className: "mb-2", extended: isExtended('tags'), style: displayStyle('tags'), onClick: () => selectField('tags') },
                    React.createElement(RelatedTags, { cards: cards, topicDict: topicDict })),
                React.createElement(BackField, { className: "relative", extended: isExtended('comments'), onClick: () => selectField('comments'), style: displayStyle('comments') },
                    React.createElement(Comments, { userEnvId: userEnvId, author: authUser, cardId: cardId, extended: isExtended('comments'), addComment: addComment })))),
        React.createElement(CardControls, { onFlip: onFlip, onClose: onClose, style: { width: '100%', flexShrink: 0 } }, controls ? controls : null)));
};
export default CardBack;
