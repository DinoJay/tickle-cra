import React, {useRef, useState, useEffect} from 'react';

import {ModalBody} from '~/components/utils/Modal';
import {CONTACT} from '~/constants/cardFields';

import PreviewFrame from '../PreviewFrame';

export const key = CONTACT;
export const label = 'Contact';

export const ModalContent = props => {
  const {onChange, modalProps, disabled, contact} = props;

  const [text, setText] = useState(description.value);

  useEffect(() => {
    onChange({key, label, value: text});
  }, [text]);

  return (
    <ModalBody {...modalProps}>
      <div>
        <div>Email</div>
        <input
          disabled={disabled}
          onChange={e => setText(e.target.value)}
          className="mt-1 form-control border-2 w-full text-lg"
          placeholder="Please insert your description"
        />
      </div>
      <div>
        <div>Telephone Number</div>
        <input
          disabled={disabled}
          onChange={e => setText(e.target.value)}
          className="mt-1 form-control border-2 w-full text-lg"
          placeholder="Please insert your description"
        />
      </div>
    </ModalBody>
  );
};

export const Preview = ({description, onClick}) => (
  <PreviewFrame
    onClick={onClick}
    empty={description.value === null}
    content={() => description.value}
    type={label}
  />
);

export const View = ({description, onClick, onClose}) => (
  <ModalBody title="Description" onClose={onClose}>
    <p style={{width: '100%'}}>{description.value}</p>
  </ModalBody>
);
