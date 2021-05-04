import React, { CSSProperties } from 'react';
import { User } from '~/constants/userFields';
interface UserThumbnailProps {
    user: User;
    className?: string;
    style?: CSSProperties;
}
export declare const UserThumbnail: React.FC<UserThumbnailProps>;
export default UserThumbnail;
