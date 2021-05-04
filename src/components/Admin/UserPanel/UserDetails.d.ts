import React, { CSSProperties } from 'react';
import { User } from '~/constants/userFields';
import Topic from '~/constants/topicType';
import UserEnv from '~/constants/userEnvType';
interface UserInfoProps {
    className?: string;
    style?: CSSProperties;
    onRemoveUser: Function;
    user: User | null;
    updateUser: Function;
    registerUserToEnv: Function;
    removeUserFromEnv: Function;
    topicDict: Topic[];
    envs: UserEnv[];
}
declare const UserDetails: React.FC<UserInfoProps>;
export default UserDetails;
