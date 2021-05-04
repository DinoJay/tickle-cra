import React from 'react';
import AuthUser from '~/constants/authUserType';
/**
 * Authentication Higher Order Component to implement a Session
 */
declare const withAuthentication: (condition?: (authUser: AuthUser, _: string) => boolean, DefaultScreen?: React.FC<{
    height: number;
}>) => Function;
export default withAuthentication;
