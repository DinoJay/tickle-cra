import React, {useState} from 'react';
import clsx from 'clsx';
import {Card} from '~/constants/cardFields';
import BackgroundImg from '~/components/utils/BackgroundImg';
import Rating from '~/components/utils/Rating';
import usePrevious from '~/components/utils/usePrevious';
import {Timestamp} from '~/firebase/firebase';

import {BlackModal, ModalBody} from '~/components/utils/Modal';

import {doAddNotification} from '~/firebase/db/notification_db';

// import {asyncAddNotification} from '~/reducers/Notifications/async_actions';

import {Img, Match} from '~/constants/typeUtils';

// import AuthUser from '~/constants/authUserType';
import Activity from '~/constants/activityType';
import ActivitySubmission from '~/constants/activitySubmissionType';

interface ResultsType extends Match {
  // authUser: AuthUser;
  cards: Card[];
  activity: Activity;
  addActivitySubmission: Function;
  submission: ActivitySubmission;
}

const Results: React.FC<ResultsType> = props => {
  const {
    // authUser,
    cards,
    activity: {value: activityVal},
    addActivitySubmission,
    submission,
    match
  } = props;

  const {
    params: {userEnvId}
  } = match;

  const [imgId, setImgId] = useState<string | null>(null);
  // console.log('submission', submission);
  const {photos = []} = submission.response || {};
  const img = photos.find((p: Img) => p.id === imgId);
  const {feedback} = submission;
  const {comment = '', rating = 0} = feedback || {};

  const [updatedRating, setUpdatedRating] = useState(rating);
  const prevRating = usePrevious(updatedRating);
  const [updatedComment, setUpdatedComment] = useState(comment);
  const prevComment = usePrevious(updatedComment);
  const differentFeedback =
    prevComment !== updatedComment || updatedRating !== prevRating;

  const mergeFeedback = (a = {}) => {
    const fb = {comment, rating, ...a};

    return {
      ...submission,
      feedback: fb,
      succeeded: fb.rating > 2
    };
  };

  const feedBackColor = (s: ActivitySubmission) => {
    if (feedback) {
      return s.succeeded ? 'bg-green-500' : 'bg-red-500';
    }
    return 'bg-yellow-600';
  };

  const feedBackStatus = (s: ActivitySubmission) => {
    if (s.feedback) {
      return s.succeeded ? 'succeeded' : 'failed';
    }
    return 'Not yet rated';
  };

  const {id, uid} = submission;
  const onSave = () => {
    addActivitySubmission(
      mergeFeedback({
        rating: updatedRating,
        comment: updatedComment
      }),
      userEnvId
    );

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

  return (
    <div className="m-2">
      <BlackModal visible={!!imgId}>
        <ModalBody
          className="flex-grow flex flex-col"
          onClose={() => setImgId(null)}>
          <BackgroundImg
            src={img && img.url}
            className="flex-grow w-full"
          />
        </ModalBody>
      </BlackModal>
      <div className="mb-6">
        <h2>{activityVal && activityVal.title}</h2>
        <p className="text-sm">
          {activityVal && activityVal.description}
        </p>
      </div>
      <div>
        <div className="mb-6">
          <h3>Submission</h3>
          <p>
            {submission.response && submission.response.text
              ? submission.response.text
              : 'No submission'}
          </p>
        </div>
        <div className="mb-6">
          <h3>Photos</h3>
          {!photos.length && <p>No photos uploaded</p>}
          <div className="flex">
            {photos.map((p: Img) => (
              <BackgroundImg
                onClick={() => setImgId(p.id)}
                className="h-48 w-48 m-1"
                src={p.url}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3>Rating</h3>
        <Rating
          num={5}
          count={updatedRating}
          onClick={(i: number) => {
            setUpdatedRating(i);
            // addActivitySubmission(
            //   mergeFeedback({rating: i}),
            //   userEnvId
            // );
          }}
        />
      </div>
      <h3>Comment</h3>
      <textarea
        rows={4}
        className="form-input mb-2 w-full"
        value={updatedComment}
        onChange={e => setUpdatedComment(e.target.value)}
      />
      {/* <DelayedTextArea
        className="form-input mb-2 w-full"
        value={updatedComment}
        onChange={
          txt => setUpdatedComment(txt)
          // addActivitySubmission(
          //   mergeFeedback({comment: txt}),
          //   userEnvId
          // )
        }
      /> */}
      <div
        className={clsx(
          'text-center text-white p-1 w-full mb-2 font-bold uppercase',
          feedBackColor(submission)
        )}>
        {feedBackStatus(submission)}
      </div>
      <button
        disabled={!differentFeedback}
        className={clsx(
          'btn border-4 text-lg p-1 w-full mb-2',
          differentFeedback && 'bg-yellow-600 text-white',
          feedback && feedback.succeeded && 'bg-green-500 text-white',
          feedback && feedback.succeeded && 'bg-red-500 text-white',
          !differentFeedback && 'disabled'
        )}
        type="button"
        onClick={() => onSave()}>
        {feedback ? 'Update' : 'Send'} Feedback
      </button>
    </div>
  );
};
export default Results;
