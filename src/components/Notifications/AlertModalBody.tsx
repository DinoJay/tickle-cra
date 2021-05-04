import React, { useState } from "react";
// import pose, {PoseGroup} from 'react-pose';
import clsx from 'clsx';
import {ModalBody} from '~/components/utils/Modal';
import {Card} from '~/constants/cardFields';
import Notification from '~/constants/notificationType';
// import NotificationPreview from './NotificationPreview';
import { OneNotification } from "./index";
// import AuthUser from '~/constants/authUserType';

type AlertModalBodyProps = {
  onClose: (id: string) => any;
  onSelect: (id: string) => any;
  notifications: Notification[];
  cards: Card[];
  onClick: Function;
  // authUser: AuthUser;
  // asyncMarkNotificationAsSeen: (uid: string, n: Notification) => any;
};

const AlertModalBody: React.FC<AlertModalBodyProps> = props => {
  const {
    onClose,
    // onSelect,
    notifications,
    cards,
    onClick
    // authUser,
    // asyncMarkNotificationAsSeen
  } = props;
  const firstNotification = notifications[0];

  const [isOpen, setIsOpen] = useState(false);

  // console.log('notifications len', notifications.length - 1);
  return (
    <ModalBody
      footerClassName="border-t-4 border-yellow-500"
      style={{ transition: "all 400ms" }}
      title="Notifications"
      onClose={onClose}
      footer={

        notifications.length > 1 && (
          <button
            className={clsx('btn border-4 p-1 md:p-2 ')}
            type="button"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen
              ? 'Minder...'
              : `${notifications.length - 1} notificatie(s)`}
          </button>
        )
      }>
      <OneNotification {...firstNotification} {...props} />
      {isOpen &&
        notifications
          .slice(1)
          .map((n: Notification) => (
            <OneNotification
              {...n}
              cards={cards}
              {...props}
              key={n.id}
              onClick={onClick}
            />
          ))}
    </ModalBody>
  );
};
export default AlertModalBody;
