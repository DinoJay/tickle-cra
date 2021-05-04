import React from 'react';

import {ModalBody, ModalProps} from '~/components/utils/Modal';

import {TITLE, Title} from '~/constants/cardFields';

import PreviewFrame from './PreviewFrame';

export const label = 'Title';
export const key = TITLE;

export const ModalContent: React.FC<{
  modalProps: ModalProps;
  disabled: false;
  onChange: Function;
  title: Title;
}> = props => {
  const {modalProps, disabled, onChange, title: initTitle} = props;

  return (
    <ModalBody {...modalProps}>
      <input
        disabled={disabled}
        className="capitalize border mt-2 form-control text-2xl w-full text-xl"
        placeholder="enter title"
        onChange={(e): void => onChange({key, value: e.target.value})}
        value={initTitle.value || undefined}
      />
      <button
        type="button"
        className="btn p-2 bg-green-500 w-full mt-2 text-white"
        onClick={(): void => {
          modalProps.onClose();
        }}>
        Update
      </button>
    </ModalBody>
  );
};

export const Preview: React.FC<{onClick: Function; title: Title}> = ({
  onClick,
  title
}) => (
  <PreviewFrame
    onClick={onClick}
    placeholder="Title"
    type={label}
    empty={title.value === null}
    content={() => <div className="text-truncate">{title.value}</div>}
  />
);
