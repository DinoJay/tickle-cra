import React from 'react';
import AuthUser from '~/constants/authUserType';
declare const UserMenu: React.FC<{
    authUser: AuthUser;
    open: boolean;
    updateAuthUser: Function;
}>;
export default UserMenu;
