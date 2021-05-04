import React from 'react';
import { User } from '~/constants/userFields';
interface UserPreviewInfoProps {
    user: User;
    className?: string;
    style?: React.CSSProperties;
}
declare const UserPreview: React.FC<UserPreviewInfoProps>;
export default UserPreview;
