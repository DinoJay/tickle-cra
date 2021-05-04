import React from 'react';

import UserThumbnail from './UserThumbnail';

import {User} from '~/constants/userFields';

interface UserPreviewInfoProps {
  user: User;
  className?: string;
  style?: React.CSSProperties;
}

const UserPreview: React.FC<UserPreviewInfoProps> = props => {
  const {user, style, className} = props;

  return (
    <div
      className={`${className} h-48 w-full flex relative`}
      style={style}>
      <UserThumbnail user={user} className="w-48 h-full mr-4" />
      <div className="text-2xl">
        <div>
          <label className="label">Username:</label>
          <div>{user.username || 'No Username'}</div>
        </div>
        <div>
          <label className="label">First Name:</label>
          <div>{user.firstName || 'No first name'}</div>
        </div>
        <div>
          <label className="label">Last Name:</label>
          <div>{user.lastName || 'No last name'}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPreview;
