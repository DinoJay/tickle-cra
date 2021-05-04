import React from 'react';
import Notification from '~/constants/notificationType';
import FlexCollapsible from '~/components/utils/FlexCollapsible';
import {OneNotification} from '~/components/Notifications';
import {Card} from '~/constants/cardFields';

type BacklogType = {
  style: React.CSSProperties;
  onClick: Function;
  onCardClick: (id: string) => any;
  notifications: Notification[];
  open: boolean;
  cards: Card[];
};

const Backlog: React.FC<BacklogType> = props => {
  const {
    style,
    onClick,
    notifications,
    open,
    cards,
    onCardClick
  } = props;
  const readNotifications = notifications.filter(d => d.read);
  return (
    <FlexCollapsible
      header={<div className="truncate italic">Notifications</div>}
      className="overflow-hidden mb-3"
      open={open}
      onClick={onClick}
      style={style}
      footer={null}>
      <div className="m-1 flex-grow flex items-center justify-center">
        {readNotifications.length === 0 && (
          <div
            className="text-4xl text-gray-600"
            style={{transform: 'rotate(45deg)'}}>
            No Notifications!
          </div>
        )}
        {readNotifications.map(d => (
          <OneNotification
            {...d}
            cards={cards}
            onClick={(c: Card) => onCardClick(c.id)}
          />
        ))}
      </div>
    </FlexCollapsible>
  );
};

export default Backlog;
