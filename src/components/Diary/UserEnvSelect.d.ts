import React from 'react';
import UserEnv from '~/constants/userEnvType';
import AuthUser from '~/constants/authUserType';
import { RouterTypes } from '~/constants/typeUtils';
interface UserEnvTypes {
    userEnvs: UserEnv[];
    uid: string;
    userEnvId: string;
    authUser: AuthUser;
}
declare const UserEnvSelect: React.FC<RouterTypes & UserEnvTypes>;
export default UserEnvSelect;
