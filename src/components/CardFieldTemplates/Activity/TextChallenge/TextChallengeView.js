import React, { useState } from 'react';
import clsx from 'clsx';
// import PropTypes from 'prop-types';
// import debounce from 'lodash/debounce';
import { TEXT_CHALLENGE } from '~/constants/cardFields';
import { PhotoPreview } from '~/components/utils/PhotoUpload';
import BackgroundImg from '~/components/utils/BackgroundImg';
import IcAk from '~/styles/alphabet_icons/ic_ak.svg';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import AnimatedImgDiv from '~/components/utils/AnimatedImgDiv';
import DelayedTextArea from '~/components/utils/DelayedTextArea';
const PhotoPreviewDialog = props => {
    const { onChange, className, style, ...restProps } = props;
    const [photo, setPhoto] = useState(null);
    return (React.createElement("div", { className: "flex-grow flex flex-col" },
        React.createElement(PhotoPreview, Object.assign({ className: "flex-grow" }, restProps, photo || {}, { onChange: (ph) => {
                setPhoto(ph);
            } })),
        React.createElement("button", { type: "button", disabled: !photo, className: clsx('btn p-2 border-4 mt-3', !photo && 'disabled'), onClick: () => onChange(photo) }, "Add")));
};
const TextChallenge = props => {
    const { onClose, activity, addToStorage, removeFromStorage, id, authUser, activitySubmission, addActivitySubmission, toggleUserview, match } = props;
    const { params: { userEnvId } } = match;
    const { uid, username } = authUser;
    const [modal, setModal] = useState(false);
    const { description, img = { url: null, contain: false } } = activity.value || { description: '' };
    const { response = { text: '', photos: [] }, completed = false } = activitySubmission || {};
    const currentSubmission = {
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
    const onChangeResp = (q) => addActivitySubmission({
        ...currentSubmission,
        response: { ...currentSubmission.response, ...q }
    }, userEnvId);
    const disabled = currentSubmission.succeeded || currentSubmission.completed;
    console.log('photos response', response);
    return (React.createElement("div", { className: "flex-grow flex flex-col overflow-y-auto" },
        React.createElement("div", { className: "flex flex-grow flex-col justify-center items-center" },
            !img.url && (React.createElement("div", { className: "text-2xl text-gray-700 italic" }, "No Image")),
            React.createElement(BackgroundImg, { className: "flex-grow w-48", src: (img && img.url) || IcAk, contain: img.contain || !img.url })),
        React.createElement("div", { className: "mb-5 " },
            React.createElement("h2", { className: "mb-2" }, "Description"),
            React.createElement("p", { style: { whiteSpace: 'pre-line' }, className: "h-max-48 w-full text-lg overflow-y-auto" }, description || (React.createElement("span", { className: "italic text-gray-700" }, "'No Description'")))),
        React.createElement("div", { className: "" },
            React.createElement("h2", { className: "mb-2" }, "Response"),
            React.createElement(DelayedTextArea, { key: response.text, className: "border-2 w-full", rows: 4, placeholder: "Write your response", value: response.text, onChange: (t) => {
                    onChangeResp({
                        text: t
                    });
                } })),
        React.createElement("div", { className: "my-2 flex" },
            response.photos && !response.photos.length && (React.createElement("div", { className: "w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed" },
                React.createElement("div", { className: "text-grey-darkest" }, "No Photo"))),
            response.photos &&
                response.photos.map((m) => (React.createElement(AnimatedImgDiv, { className: "w-24 h-24 mx-1", key: m.url, src: m.url }))),
            React.createElement("button", { type: "button", disabled: disabled, className: clsx('btn tex-gray-800 border-2 text-grey-darkest w-24 h-24 mx-1', disabled && 'disabled'), onClick: () => setModal(true) }, "Add Photo")),
        React.createElement("div", { className: "mt-auto flex-no-shrink" },
            React.createElement("button", { type: "button", disabled: currentSubmission.completed, className: clsx('btn w-full p-2 border-4 text-gray-700 flex-no-shrink', disabled && 'disabled'), onClick: () => {
                    addActivitySubmission({
                        ...currentSubmission,
                        completed: true
                        // succeeded: true,
                    }, userEnvId);
                    onClose();
                } }, currentSubmission.completed
                ? 'Already submitted!!!'
                : 'Submit'),
            toggleUserview && (React.createElement("button", { type: "button", className: "mt-2 w-full btn border-2 p-1 bg-yellow-500 text-white", onClick: () => toggleUserview(false) }, "AuthorView"))),
        React.createElement(BlackModal, { visible: modal },
            React.createElement(ModalBody, { onClose: () => setModal(false), className: "flex-grow" },
                React.createElement(PhotoPreviewDialog, { className: "flex-grow", media: response.photos, onAdd: addToStorage, onRemove: removeFromStorage, btnText: "Upload Media", onChange: (photo) => {
                        onChangeResp({
                            photos: [...(response.photos || []), photo]
                        });
                        setModal(false);
                    } })))));
};
export default TextChallenge;
