import React, {useState, useEffect} from 'react';
import pose, {PoseGroup} from 'react-pose';
import {createMirroredEasing} from '@popmotion/easing';
import NotificationPreview from './NotificationPreview';
import {BlackModal, ModalBody} from '~/components/utils/Modal';

const PosedDiv = pose.div();
export default function AlertModal(props) {
  const {
    onClose,
    onSelect,
    notifications,
    cards,
    authUser,
    asyncMarkNotificationAsSeen
  } = props;
  const firstNotification = notifications[0];

  const [isOpen, setIsOpen] = useState(false);

  // notifications.forEach(n =>
  //   asyncMarkNotificationAsSeen(authUser.uid, n)
  // );

  const getImageFromCard = n => {
    const card = cards.find(c => c.id === n.cardId);
    return card ? card.img.value : null;
  };

  return (
    <ModalBody
      footerClassName="border-t-4 border-yellow-500"
      style={{transition: 'all 400ms'}}
      title="Notifications"
      onClose={onClose}
      footer={
        <button
          className="btn border-4 p-1 md:p-2 "
          type="button"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen
            ? 'Minder...'
            : `${notifications.length - 1} notificatie(s)`}
        </button>
      }>
      <PoseGroup animateOnMount>
        <PosedDiv key={0}>
          <NotificationPreview
            {...firstNotification}
            {...props}
            preview={getImageFromCard(firstNotification)}
            msg={firstNotification.message}
            title={firstNotification.title}
            caption={firstNotification.time}
            onSelect={onSelect}
          />
        </PosedDiv>
        {isOpen &&
          notifications.slice(1).map(n => (
            <PosedDiv key={n.title}>
              <NotificationPreview
                {...n}
                {...props}
                preview={getImageFromCard(n)}
                msg={n.message}
                title={n.title}
                caption={n.time}
                onSelect={onSelect}
              />
            </PosedDiv>
          ))}
      </PoseGroup>
    </ModalBody>
  );
}
