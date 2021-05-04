import React, {useState} from 'react';

import UserIcon from 'react-feather/dist/icons/user';
import {motion, AnimatePresence} from 'framer-motion';
import IcAk from '~/styles/alphabet_icons/ic_ak.svg';

import CardControls from '~/components/cards/CardControls';
import {BlackModal} from '~/components/utils/Modal';

import {extractCardFields, Card, TITLE} from '~/constants/cardFields';

import {fieldComps} from '~/components/CardFieldTemplates';

interface ReviewCardFrontType extends Card {
  style?: React.CSSProperties;
  onClose: Function;
  onFlip: Function;
  className?: string;
}

const ReviewCardFront: React.FC<ReviewCardFrontType> = props => {
  const {
    img,
    id,
    uid,
    loc,
    // background,
    style,
    onClose,
    onFlip,
    className
  } = props;

  const [dialogKey, setDialogKey] = useState(null);
  const cardFields = extractCardFields({id, uid, loc});

  // console.log('cardFields', cardFields);
  const previewFields = Object.keys(fieldComps)
    .filter(k => cardFields[k] && cardFields[k].value)
    .map(k => {
      const d = fieldComps[k];
      return (
        <motion.div
          key={k}
          className="text-truncate justify-between flex border-2 m-1 p-2">
          <d.Preview {...props} onClick={() => setDialogKey(d.key)} />
        </motion.div>
      );
    });

  const onCloseModal = () => {
    setDialogKey(null);
  };

  const FieldComponent =
    dialogKey !== null ? fieldComps[dialogKey] : fieldComps[TITLE];

  const modalVisible = dialogKey !== null;
  const modalProps = {
    visible: modalVisible,
    title: FieldComponent.label,
    onClose: onCloseModal
  };

  return (
    <div
      style={{...style}}
      className={`flex flex-col w-full flex-grow ${className}`}>
      <div
        className={`m-1 bg-yellow-400 ${!img || (!img.value && 'p-6')}`}
        style={{
          flex: '0 0 50%',
          cursor: 'pointer'
        }}>
        <div
          className="h-full w-full"
          style={{
            background: `url(${
              img && img.value ? img.value.url : IcAk
            }) `,
            backgroundSize: img && img.value ? 'cover' : 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
      </div>

      <div className="flex-grow mt-3 mr-3 ml-3 mb-1 overflow-scroll">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridAutoRows: '8rem'
          }}>
          <AnimatePresence>{previewFields}</AnimatePresence>
        </div>
      </div>

      <CardControls
        onFlip={onFlip}
        onClose={onClose}
        right={<UserIcon color="white" size={34} />}
      />

      <BlackModal visible={modalVisible}>
        <FieldComponent.ModalContent
          {...props}
          modalProps={modalProps}
          disabled
        />
      </BlackModal>
    </div>
  );
};
export default ReviewCardFront;
