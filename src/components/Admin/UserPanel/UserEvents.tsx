import React, {useEffect, CSSProperties} from 'react';
import {timeFormat} from 'd3-time-format';
import clsx from 'clsx';
import Event from '~/constants/eventType';
import {User} from '~/constants/userFields';

const formatTime = timeFormat('%B %d, %Y');

interface UserEventsProps {
  events: Event[];
  className: string;
  style?: CSSProperties;
  fetchAllUserEvents: Function;
  user: User | null;
}

const UserEvents: React.FC<UserEventsProps> = props => {
  const {events, className, style, fetchAllUserEvents, user} = props;

  useEffect(() => {
    if (user) {
      fetchAllUserEvents(user.email);
    }
  }, []);

  return (
    <div
      className={`${className} flex flex-col flex-grow`}
      style={style}>
      <ul
        className={clsx(
          'list-reset overflow-y-auto flex-grow border-b',
          events.length === 0 && 'flex justify-center items-center'
        )}>
        {events.length === 0 && (
          <p className="m-auto text-3xl text-gray-600">No Events</p>
        )}
        {events.map(e => (
          <li className="p-1 text-sm border-b-2 my-1 justify-between flex">
            <div className="mt-auto mr-2 ">
              {formatTime(e.created.toDate())}
            </div>
            <div>{`${e.domain} ${e.type}`}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEvents;
