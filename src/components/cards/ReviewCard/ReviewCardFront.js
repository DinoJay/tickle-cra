import React, { useState } from 'react';
import UserIcon from 'react-feather/dist/icons/user';
import { motion, AnimatePresence } from 'framer-motion';
import IcAk from '~/styles/alphabet_icons/ic_ak.svg';
import CardControls from '~/components/cards/CardControls';
import { BlackModal } from '~/components/utils/Modal';
import { extractCardFields, TITLE } from '~/constants/cardFields';
import { fieldComps } from '~/components/CardFieldTemplates';
const ReviewCardFront = props => {
    const { img, id, uid, loc, 
    // background,
    style, onClose, onFlip, className } = props;
    const [dialogKey, setDialogKey] = useState(null);
    const cardFields = extractCardFields({ id, uid, loc });
    // console.log('cardFields', cardFields);
    const previewFields = Object.keys(fieldComps)
        .filter(k => cardFields[k] && cardFields[k].value)
        .map(k => {
        const d = fieldComps[k];
        return (React.createElement(motion.div, { key: k, className: "text-truncate justify-between flex border-2 m-1 p-2" },
            React.createElement(d.Preview, Object.assign({}, props, { onClick: () => setDialogKey(d.key) }))));
    });
    const onCloseModal = () => {
        setDialogKey(null);
    };
    const FieldComponent = dialogKey !== null ? fieldComps[dialogKey] : fieldComps[TITLE];
    const modalVisible = dialogKey !== null;
    const modalProps = {
        visible: modalVisible,
        title: FieldComponent.label,
        onClose: onCloseModal
    };
    return (React.createElement("div", { style: { ...style }, className: `flex flex-col w-full flex-grow ${className}` },
        React.createElement("div", { className: `m-1 bg-yellow-400 ${!img || (!img.value && 'p-6')}`, style: {
                flex: '0 0 50%',
                cursor: 'pointer'
            } },
            React.createElement("div", { className: "h-full w-full", style: {
                    background: `url(${img && img.value ? img.value.url : IcAk}) `,
                    backgroundSize: img && img.value ? 'cover' : 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                } })),
        React.createElement("div", { className: "flex-grow mt-3 mr-3 ml-3 mb-1 overflow-scroll" },
            React.createElement("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridAutoRows: '8rem'
                } },
                React.createElement(AnimatePresence, null, previewFields))),
        React.createElement(CardControls, { onFlip: onFlip, onClose: onClose, right: React.createElement(UserIcon, { color: "white", size: 34 }) }),
        React.createElement(BlackModal, { visible: modalVisible },
            React.createElement(FieldComponent.ModalContent, Object.assign({}, props, { modalProps: modalProps, disabled: true })))));
};
export default ReviewCardFront;
