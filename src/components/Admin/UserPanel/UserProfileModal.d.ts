import React from 'react';
import Event from '~/constants/eventType';
import Topic from '~/constants/topicType';
import { User } from '~/constants/userFields';
import UserEnv from '~/constants/userEnvType';
interface UserInfoModalProps {
    visible: boolean;
    key: string;
    user: User | null;
    onClose: Function;
    updateUser: Function;
    onRemoveUser: Function;
    registerUserToEnv: Function;
    removeUserFromEnv: Function;
    envs: UserEnv[];
    events: Event[];
    fetchAllUserEvents: Function;
    topicDict: Topic[];
}
declare const UserProfileModal: React.FC<UserInfoModalProps>;
export default UserProfileModal;
