import React, {useState} from 'react';
import clsx from 'clsx';

// import PropTypes from 'prop-types';
// import debounce from 'lodash/debounce';
import {TEXT_CHALLENGE} from '~/constants/cardFields';
import {PhotoPreview} from '~/components/utils/PhotoUpload';
import BackgroundImg from '~/components/utils/BackgroundImg';

import IcAk from '~/styles/alphabet_icons/ic_ak.svg';

import {BlackModal, ModalBody} from '~/components/utils/Modal';
import AnimatedImgDiv from '~/components/utils/AnimatedImgDiv';
import DelayedTextArea from '~/components/utils/DelayedTextArea';

import {Img, Match} from '~/constants/typeUtils';
import ActivitySubmission from '~/constants/activitySubmissionType';
import AuthUser from '~/constants/authUserType';
import Activity from '~/constants/activityType';

const PhotoPreviewDialog: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  onAdd: Function;
  media: Img[];
  onRemove: Function;
  btnText: string;
  onChange: Function;
}> = props => {
  const {onChange, className, style, ...restProps} = props;

  const [photo, setPhoto] = useState<Img | null>(null);

  return (
    <div className="flex-grow flex flex-col">
      <PhotoPreview
        className="flex-grow"
        {...restProps}
        {...photo || {}}
        onChange={(ph: Img) => {
          setPhoto(ph);
        }}
      />
      <button
        type="button"
        disabled={!photo}
        className={clsx('btn p-2 border-4 mt-3', !photo && 'disabled')}
        onClick={() => onChange(photo)}>
        Add
      </button>
    </div>
  );
};

interface TextChallengeType extends Match {
  onClose: Function;
  activity: Activity;
  addToStorage: Function;
  removeFromStorage: Function;
  id: string;
  authUser: AuthUser;
  activitySubmission: ActivitySubmission;
  addActivitySubmission: Function;
  toggleUserview: Function;
}

const TextChallenge: React.FC<TextChallengeType> = props => {
  const {
    onClose,
    activity,
    addToStorage,
    removeFromStorage,
    id,
    authUser,
    activitySubmission,
    addActivitySubmission,
    toggleUserview,
    match
  } = props;

  const {
    params: {userEnvId}
  } = match;
  const {uid, username} = authUser;

  const [modal, setModal] = useState(false);

  const {
    description,
    img = {url: null, contain: false}
  } = activity.value || {description: ''};

  const {response = {text: '', photos: []}, completed = false} =
    activitySubmission || {};

  const currentSubmission: ActivitySubmission = {
    completed,
    uid,
    id,
    type: TEXT_CHALLENGE,
    response,
    succeeded: false,
    // TODO or timestamp
    date: new Date(),
    username
  };

  const onChangeResp = (q: object) =>
    addActivitySubmission(
      {
        ...currentSubmission,
        response: {...currentSubmission.response, ...q}
      },
      userEnvId
    );

  const disabled =
    currentSubmission.succeeded || currentSubmission.completed;

  console.log('photos response', response);

  return (
    <div className="flex-grow flex flex-col overflow-y-auto">
      <div className="flex flex-grow flex-col justify-center items-center">
        {!img.url && (
          <div className="text-2xl text-gray-700 italic">No Image</div>
        )}
        <BackgroundImg
          className="flex-grow w-48"
          src={(img && img.url) || IcAk}
          contain={img.contain || !img.url}
        />
      </div>
      <div className="mb-5 ">
        <h2 className="mb-2">Description</h2>
        <p
          style={{whiteSpace: 'pre-line'}}
          className="h-max-48 w-full text-lg overflow-y-auto">
          {description || (
            <span className="italic text-gray-700">
              'No Description'
            </span>
          )}
        </p>
      </div>
      <div className="">
        <h2 className="mb-2">Response</h2>
        <DelayedTextArea
          key={response.text}
          className="border-2 w-full"
          rows={4}
          placeholder="Write your response"
          value={response.text}
          onChange={(t: string) => {
            onChangeResp({
              text: t
            });
          }}
        />
      </div>
      <div className="my-2 flex">
        {response.photos && !response.photos.length && (
          <div className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed">
            <div className="text-grey-darkest">No Photo</div>
          </div>
        )}
        {response.photos &&
          response.photos.map((m: Img) => (
            <AnimatedImgDiv
              className="w-24 h-24 mx-1"
              key={m.url}
              src={m.url}
            />
          ))}
        <button
          type="button"
          disabled={disabled}
          className={clsx(
            'btn tex-gray-800 border-2 text-grey-darkest w-24 h-24 mx-1',
            disabled && 'disabled'
          )}
          onClick={() => setModal(true)}>
          Add Photo
        </button>
      </div>

      <div className="mt-auto flex-no-shrink">
        <button
          type="button"
          disabled={currentSubmission.completed}
          className={clsx(
            'btn w-full p-2 border-4 text-gray-700 flex-no-shrink',
            disabled && 'disabled'
          )}
          onClick={() => {
            addActivitySubmission(
              {
                ...currentSubmission,
                completed: true
                // succeeded: true,
              },
              userEnvId
            );
            onClose();
          }}>
          {currentSubmission.completed
            ? 'Already submitted!!!'
            : 'Submit'}
        </button>

        {toggleUserview && (
          <button
            type="button"
            className="mt-2 w-full btn border-2 p-1 bg-yellow-500 text-white"
            onClick={() => toggleUserview(false)}>
            AuthorView
          </button>
        )}
      </div>

      <BlackModal visible={modal}>
        <ModalBody
          onClose={() => setModal(false)}
          className="flex-grow">
          <PhotoPreviewDialog
            className="flex-grow"
            media={response.photos}
            onAdd={addToStorage}
            onRemove={removeFromStorage}
            btnText="Upload Media"
            onChange={(photo: Img) => {
              onChangeResp({
                photos: [...(response.photos || []), photo]
              });
              setModal(false);
            }}
          />
        </ModalBody>
      </BlackModal>
    </div>
  );
};
export default TextChallenge;
