import React from 'react';
import Topic from '~/constants/topicType';
import { User } from '~/constants/userFields';
import UserEnv from '~/constants/userEnvType';
import Event from '~/constants/eventType';
interface UserPanelWrapperProps {
    envs: UserEnv[];
    addUser: Function;
    updateUser: Function;
    fetchUsers: Function;
    selectUser: Function;
    open: boolean;
    userEnvId: string;
    onClick: Function;
    users: User[];
    events: Event[];
    fetchAllUserEvents: Function;
    registerUserToEnv: Function;
    removeUserFromEnv: Function;
    topicDict: Topic[];
}
declare const UserPanelWrapper: React.FC<UserPanelWrapperProps>;
export default UserPanelWrapper;
