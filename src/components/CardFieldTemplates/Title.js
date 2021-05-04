import React from 'react';
import { ModalBody } from '~/components/utils/Modal';
import { TITLE } from '~/constants/cardFields';
import PreviewFrame from './PreviewFrame';
export const label = 'Title';
export const key = TITLE;
export const ModalContent = props => {
    const { modalProps, disabled, onChange, title: initTitle } = props;
    return (React.createElement(ModalBody, Object.assign({}, modalProps),
        React.createElement("input", { disabled: disabled, className: "capitalize border mt-2 form-control text-2xl w-full text-xl", placeholder: "enter title", onChange: (e) => onChange({ key, value: e.target.value }), value: initTitle.value || undefined }),
        React.createElement("button", { type: "button", className: "btn p-2 bg-green-500 w-full mt-2 text-white", onClick: () => {
                modalProps.onClose();
            } }, "Update")));
};
export const Preview = ({ onClick, title }) => (React.createElement(PreviewFrame, { onClick: onClick, placeholder: "Title", type: label, empty: title.value === null, content: () => React.createElement("div", { className: "text-truncate" }, title.value) }));
