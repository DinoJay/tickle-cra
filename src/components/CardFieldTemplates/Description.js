import React, { useState, useEffect } from 'react';
import { ModalBody } from '~/components/utils/Modal';
import { DESCRIPTION } from '~/constants/cardFields';
import PreviewFrame from './PreviewFrame';
export const key = DESCRIPTION;
export const label = 'Description';
export const ModalContent = props => {
    const { onChange, modalProps, disabled, description } = props;
    const [text, setText] = useState(description.value);
    useEffect(() => {
        onChange({ key, label, value: text });
    }, [text]);
    return (React.createElement(ModalBody, Object.assign({}, modalProps),
        React.createElement("textarea", { disabled: disabled, onChange: (e) => setText(e.target.value), className: "mt-1 form-control border-2 w-full text-lg", rows: 8, placeholder: "Please insert your description" }, description.value)));
};
export const Preview = ({ description, onClick }) => (React.createElement(PreviewFrame, { placeholder: "Description", onClick: onClick, empty: description.value === null, content: () => description.value, type: label }));
export const View = ({ description, modalProps }) => (React.createElement(ModalBody, { title: "Description", onClose: modalProps.onClose },
    React.createElement("p", { style: { width: '100%' } }, description.value)));
