import React from 'react';
import { User } from '~/constants/userFields';
declare const Activities: React.SFC<{
    authUser: User;
    open: boolean;
    onClick: Function;
    style?: React.CSSProperties;
    className?: string;
}>;
export default Activities;
