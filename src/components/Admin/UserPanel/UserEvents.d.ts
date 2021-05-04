import React, { CSSProperties } from 'react';
import Event from '~/constants/eventType';
import { User } from '~/constants/userFields';
interface UserEventsProps {
    events: Event[];
    className: string;
    style?: CSSProperties;
    fetchAllUserEvents: Function;
    user: User | null;
}
declare const UserEvents: React.FC<UserEventsProps>;
export default UserEvents;
