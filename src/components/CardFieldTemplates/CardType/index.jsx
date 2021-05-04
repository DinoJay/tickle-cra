import React, {useRef, useState, useEffect} from 'react';

import {ModalBody} from '~/components/utils/Modal';
import {CARD_TYPE} from '~/constants/cardFields';

import PreviewFrame from '../PreviewFrame';

import posed, {PoseGroup} from 'react-pose';

import {
  DEFAULT_CARD_TYPE,
  STORY_CARD_TYPE,
  ORGA_CARD_TYPE
} from '~/constants/cardFields';

const CARD_TYPES = [DEFAULT_CARD_TYPE, STORY_CARD_TYPE, ORGA_CARD_TYPE];

export const key = CARD_TYPE;
export const label = 'Card Type';
export const required = true;

const PosedDiv = posed.div();

export const ModalContent = props => {
  const {onChange, modalProps, disabled, cardType} = props;

  const selectedId = cardType.value || DEFAULT_CARD_TYPE.id;
  // console.log('selectedId', selectedId);
  // console.log('cardType', cardType);
  // const [selectedId, setSelectedId] = useState(
  //   cardType.value ? cardType.value.id : DEFAULT_CARD_TYPE.id
  // );

  return (
    <ModalBody {...modalProps}>
      <div className="flex flex-wrap">
        {CARD_TYPES.map(c => (
          <PosedDiv
            key={c.id}
            className={`btn m-2 flex-none w-48 flex-shrink-0 flex-grow h-48 border-2 p-2 m-3 ${
              selectedId === c.id ? 'big-shadow' : 'opacity-50'
            }`}
            onClick={() => onChange({key, label, value: c.id})}
            style={{background: c.color}}>
            {c.label}
          </PosedDiv>
        ))}
      </div>
    </ModalBody>
  );
};

export const Preview = ({cardType, onClick}) => {
  // console.log('cardType', cardType);
  const ct = CARD_TYPES.find(c => c.id === cardType.value);
  // console.log('ct', ct);
  return (
    <PreviewFrame
      onClick={onClick}
      empty={false}
      content={
        () => ct && ct.label
        // CARD_TYPES.find(c => c.id === cardType.value).label
      }
      type={label}
    />
  );
};

export const View = ({description, onClick, onClose}) => (
  <ModalBody title="Description" onClose={onClose}>
    <p style={{width: '100%'}}>{description.value}</p>
  </ModalBody>
);
