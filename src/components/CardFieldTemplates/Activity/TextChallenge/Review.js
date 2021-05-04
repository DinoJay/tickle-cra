import React, { useState } from 'react';
import clsx from 'clsx';
import BackgroundImg from '~/components/utils/BackgroundImg';
import Rating from '~/components/utils/Rating';
import usePrevious from '~/components/utils/usePrevious';
import { Timestamp } from '~/firebase/firebase';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import { doAddNotification } from '~/firebase/db/notification_db';
const Results = props => {
    const { 
    // authUser,
    cards, activity: { value: activityVal }, addActivitySubmission, submission, match } = props;
    const { params: { userEnvId } } = match;
    const [imgId, setImgId] = useState(null);
    // console.log('submission', submission);
    const { photos = [] } = submission.response || {};
    const img = photos.find((p) => p.id === imgId);
    const { feedback } = submission;
    const { comment = '', rating = 0 } = feedback || {};
    const [updatedRating, setUpdatedRating] = useState(rating);
    const prevRating = usePrevious(updatedRating);
    const [updatedComment, setUpdatedComment] = useState(comment);
    const prevComment = usePrevious(updatedComment);
    const differentFeedback = prevComment !== updatedComment || updatedRating !== prevRating;
    const mergeFeedback = (a = {}) => {
        const fb = { comment, rating, ...a };
        return {
            ...submission,
            feedback: fb,
            succeeded: fb.rating > 2
        };
    };
    const feedBackColor = (s) => {
        if (feedback) {
            return s.succeeded ? 'bg-green-500' : 'bg-red-500';
        }
        return 'bg-yellow-600';
    };
    const feedBackStatus = (s) => {
        if (s.feedback) {
            return s.succeeded ? 'succeeded' : 'failed';
        }
        return 'Not yet rated';
    };
    const { id, uid } = submission;
    const onSave = () => {
        addActivitySubmission(mergeFeedback({
            rating: updatedRating,
            comment: updatedComment
        }), userEnvId);
        const card = cards.find(c => c.id === id);
        doAddNotification(uid, {
            id: `${id}_feedback`,
            cardId: id,
            refId: id,
            created: Timestamp.now(),
            refCollection: 'cards',
            title: `Nieuwe feedback op de ${card &&
                card.title &&
                card.title.value} kaart`,
            meta: updatedRating > 2 ? 'Gelukt' : 'Niet gelukt',
            message: updatedComment,
            shown: false,
            read: false,
            env: userEnvId
        });
    };
    return (React.createElement("div", { className: "m-2" },
        React.createElement(BlackModal, { visible: !!imgId },
            React.createElement(ModalBody, { className: "flex-grow flex flex-col", onClose: () => setImgId(null) },
                React.createElement(BackgroundImg, { src: img && img.url, className: "flex-grow w-full" }))),
        React.createElement("div", { className: "mb-6" },
            React.createElement("h2", null, activityVal && activityVal.title),
            React.createElement("p", { className: "text-sm" }, activityVal && activityVal.description)),
        React.createElement("div", null,
            React.createElement("div", { className: "mb-6" },
                React.createElement("h3", null, "Submission"),
                React.createElement("p", null, submission.response && submission.response.text
                    ? submission.response.text
                    : 'No submission')),
            React.createElement("div", { className: "mb-6" },
                React.createElement("h3", null, "Photos"),
                !photos.length && React.createElement("p", null, "No photos uploaded"),
                React.createElement("div", { className: "flex" }, photos.map((p) => (React.createElement(BackgroundImg, { onClick: () => setImgId(p.id), className: "h-48 w-48 m-1", src: p.url })))))),
        React.createElement("div", { className: "mb-6" },
            React.createElement("h3", null, "Rating"),
            React.createElement(Rating, { num: 5, count: updatedRating, onClick: (i) => {
                    setUpdatedRating(i);
                    // addActivitySubmission(
                    //   mergeFeedback({rating: i}),
                    //   userEnvId
                    // );
                } })),
        React.createElement("h3", null, "Comment"),
        React.createElement("textarea", { rows: 4, className: "form-input mb-2 w-full", value: updatedComment, onChange: e => setUpdatedComment(e.target.value) }),
        React.createElement("div", { className: clsx('text-center text-white p-1 w-full mb-2 font-bold uppercase', feedBackColor(submission)) }, feedBackStatus(submission)),
        React.createElement("button", { disabled: !differentFeedback, className: clsx('btn border-4 text-lg p-1 w-full mb-2', differentFeedback && 'bg-yellow-600 text-white', feedback && feedback.succeeded && 'bg-green-500 text-white', feedback && feedback.succeeded && 'bg-red-500 text-white', !differentFeedback && 'disabled'), type: "button", onClick: () => onSave() },
            feedback ? 'Update' : 'Send',
            " Feedback")));
};
export default Results;
