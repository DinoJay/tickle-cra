import React from 'react';
import UserEnv from '~/constants/userEnvType';
import Topic from '~/constants/topicType';
import { PersonalityTraits as PersonalityTraitsType, User } from '~/constants/userFields';
interface UpdateUserInfoProps {
    onChange: Function;
    interests: Topic[];
    topicDict: Topic[];
    aims?: Topic[];
    deficits?: Topic[];
    goals?: string[];
    sensitiveContent?: {
        content: string;
        selected: boolean;
    }[];
    personalityTraits?: PersonalityTraitsType;
    addUserToEnv: Function;
    excludeUserFromEnv: Function;
    envs: UserEnv[];
    uid: string;
    style?: React.CSSProperties;
    className?: string;
    prefWeekDayIds?: string[];
    user: User;
}
declare const UpdateUserInfo: React.FC<UpdateUserInfoProps>;
export default UpdateUserInfo;
