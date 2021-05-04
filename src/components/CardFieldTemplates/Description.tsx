import React, { useState, useEffect } from 'react';

import { ModalBody, ModalProps } from '~/components/utils/Modal';
import { DESCRIPTION, Description } from '~/constants/cardFields';

import PreviewFrame from './PreviewFrame';

export const key = DESCRIPTION;
export const label = 'Description';

export const ModalContent: React.FC<{
  onChange: Function;
  modalProps: ModalProps;
  disabled: boolean;
  description: Description;
}> = props => {
  const { onChange, modalProps, disabled, description } = props;

  const [text, setText] = useState<string | null>(description.value);

  useEffect(() => {
    onChange({ key, label, value: text });
  }, [text]);

  return (
    <ModalBody {...modalProps}>
      <textarea
        disabled={disabled}
        onChange={(e): void => setText(e.target.value)}
        className="mt-1 form-control border-2 w-full text-lg"
        rows={8}
        placeholder="Please insert your description">
        {description.value}
      </textarea>
    </ModalBody>
  );
};

export const Preview: React.FC<{
  description: Description;
  onClick: Function;
}> = ({ description, onClick }) => (
  <PreviewFrame
    placeholder="Description"
    onClick={onClick}
    empty={description.value === null}
    content={() => description.value}
    type={label}
  />
);

export const View: React.FC<{
  description: Description;
  onClick: Function;
  onClose: Function;
  modalProps: any
}> = ({ description, modalProps }) => (
  <ModalBody title="Description" onClose={modalProps.onClose}>
    <p style={{ width: '100%' }}>{description.value}</p>
  </ModalBody>
);
