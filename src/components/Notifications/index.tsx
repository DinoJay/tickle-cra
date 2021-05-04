import React from 'react';
import {timeFormat} from 'd3-time-format';
import X from 'react-feather/dist/icons/x';
import clsx from 'clsx';
import {motion, AnimatePresence} from 'framer-motion';
import Notification from '~/constants/notificationType';
import PreviewCard from '~/components/cards/PreviewCard';
// import {Img} from '~/constants/typeUtils';

import {Card} from '~/constants/cardFields';

export const OneNotification: React.FC<{
  // title?: string;
  message?: string;
  dateStr?: string;
  meta: string;
  read: boolean;
  onClose?: Function;
  onClick?: Function;
  cardId: string;
  cards: Card[];
}> = props => {
  const {
    // title,
    onClick,
    cardId,
    message,
    dateStr,
    meta,
    read,
    onClose,
    cards
  } = props;

  const card: Card | undefined = cards.find(c => c.id === cardId);

  if (!card) return null; // <div>Error card in notification not found</div>;
  return (
    <motion.div
      exit={{opacity: 0}}
      positionTransition
      className={clsx(
        'border-b-2 flex-shrink-0 border-yellow-500 p-2 ',
        !read && 'font-bold'
      )}>
      <div className="w-full">
        <div className="flex justify-between">
          <PreviewCard
            onClick={() => onClick && onClick(card)}
            title={card.title && card.title.value}
            img={card.img && card.img.value}
            className="w-24 flex-shrink-0"
          />
          <div className="flex justify-between">
            <p className="text-sm ml-2 text-gray-500">
              {message && message}
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              className="m-1 h-8"
              onClick={() => onClose()}>
              <X />
            </button>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-xs text-gray-500 mt-2">{meta}</p>
          {dateStr && (
            <p className="text-xs text-gray-500 mt-2">{dateStr}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface NotificationsPanelProps {
  notifications: Notification[];
  markAsRead: (a: string, b: Notification) => void;
  userId: string;
  cards: Card[];
  onClick: Function;
}
const compare = (a: Notification, b: Notification) =>
  a.created && b.created && a.created.toDate() < b.created.toDate()
    ? 1
    : -1;

const NotificationsPanel: React.FC<NotificationsPanelProps> = props => {
  const {notifications, markAsRead, userId, cards, onClick} = props;
  const formatDate = timeFormat('%a, %H:%M');
  // const unreadNotifications = notifications.filter(
  //   (un: Notification) => !un.read
  // );

  return (
    <div className="flex flex-col h-64 overflow-auto">
      {notifications.length === 0 && <p>No new notifications</p>}
      {notifications.sort(compare).map(n => (
        <AnimatePresence>
          <OneNotification
            key={n.cardId}
            cards={cards}
            cardId={n.cardId}
            meta={n.meta}
            read={n.read}
            onClose={() => {
              markAsRead(userId, n);
            }}
            onClick={onClick}
            message={n.message}
            dateStr={
              n.created?.toDate && formatDate(n.created.toDate())
            }
          />
        </AnimatePresence>
      ))}
    </div>
  );
};

export default NotificationsPanel;
