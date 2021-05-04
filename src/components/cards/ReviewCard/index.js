import React from 'react';
import CardFrame from '../CardFrame';
import EditCardFront from '~/components/cards/CardFront/EditCardFront';
import UserSubmissionsCardBack from './UserSubmissionCardBack';
const ReviewCard = props => {
    const { flipped, id, onClose, onFlip, authUser, allActivitySubs, activity, routeToggleExtend, removeCard, createCard, onCardUpdate, toggleUserview } = props;
    if (!activity)
        return React.createElement("div", null, "Error no activity");
    return (React.createElement(CardFrame, { key: id, flipped: flipped, className: "flex flex-col flex-grow", front: React.createElement(EditCardFront, Object.assign({ removable: false }, props, { toggleUserview: toggleUserview, onClose: () => {
                routeToggleExtend();
            }, onFlip: onFlip, onRemove: () => {
                routeToggleExtend();
                removeCard(props.id);
            }, onCreate: (d) => {
                routeToggleExtend();
                createCard({ ...d });
            }, onUpdate: (d) => {
                onCardUpdate({ ...d });
            } })), back: React.createElement(UserSubmissionsCardBack, Object.assign({ onFlip: onFlip, onClose: onClose, allActivitySubs: allActivitySubs || [], authUser: authUser, activity: activity }, props)) }));
};
export default ReviewCard;
