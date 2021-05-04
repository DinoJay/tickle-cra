import React from 'react';
import BellIcon from 'react-feather/dist/icons/bell';
import clsx from 'clsx';
// import {motion} from 'framer-motion';
import NotificationsPanel from '~/components/Notifications';
import AuthUser from '~/constants/authUserType';
import Notification from '~/constants/notificationType';
import {Card} from '~/constants/cardFields';
import useClickOutside from '~/components/utils/useClickOutside';
// import useMeasure from '~/components/utils/useMeasure';

interface NotifyMenuProps {
  notifications: Notification[];
  authUser: AuthUser;
  asyncMarkNotificationAsRead: (a: string, b: Notification) => void;
  userEnvId: string;
  onToggle: (a: boolean) => void;
  open: boolean;
  disabled: boolean;
  cards: Card[];
  onClick: Function;
  width: number;
}

const NotifyMenu: React.FC<NotifyMenuProps> = props => {
  const {
    notifications,
    authUser,
    asyncMarkNotificationAsRead,
    userEnvId,
    onToggle,
    open,
    disabled,
    cards,
    onClick
  } = props;

  const ref = React.useRef(null);
  const filteredNotis = notifications.filter(
    (tn: Notification) =>
    //if card is removed before the noti is read
      !!cards.find(c => c.id === tn.cardId) &&
      !tn.read &&
      tn.env === userEnvId
  );

  useClickOutside(ref, (outside: any) => {
    if (outside) onToggle(false);
  });

  return (
    <div className="flex " ref={ref}>
      <button
        type="button"
        className={clsx(
          'btn p-2 mr-2 border-2 border-black',
          disabled && 'disabled',
          open ? 'bg-black' : 'bg-white'
        )}
        disabled={disabled}
        onClick={() => {
          onToggle(!open);
        }}>
        {filteredNotis.length > 0 && (
          <span
            className="rounded-full bg-red-600 px-2 py-1 text-xs text-white mr-3 z-50"
            style={{
              marginTop: -23,
              marginLeft: 15,
              position: 'absolute'
            }}>
            {filteredNotis.length}
          </span>
        )}
        <BellIcon className={open && 'text-white'} />
      </button>
      <div
        className="absolute z-30 mt-12"
        style={{
          right: open ? 8 : '-100vw',
          width: '95vw',
          maxWidth: 500,
          transition: 'right 300ms'
        }}>
        <div className="p-2 border-2 border-black shadow bg-white">
          <NotificationsPanel
            onClick={onClick}
            cards={cards}
            notifications={filteredNotis}
            markAsRead={asyncMarkNotificationAsRead}
            userId={authUser.uid}
          />
        </div>
      </div>
    </div>
  );
};

export default NotifyMenu;
