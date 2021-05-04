import React, {CSSProperties} from 'react';
import {User} from '~/constants/userFields';
import userSvg from '~/styles/user.svg';
import {avatars} from '~/constants/avatars';

interface UserThumbnailProps {
  user: User;
  className?: string;
  style?: CSSProperties;
}

export const UserThumbnail: React.FC<UserThumbnailProps> = props => {
  const {user, className, style} = props;

  const avatar = avatars.find(d => d.id === user.avatar);

  const st = (url: string) => ({
    ...style,
    backgroundImage: `url(${url}) `,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  });

  return (
    <div
      className={className}
      style={st(avatar ? avatar.img.url : userSvg)}
    />
  );
};
export default UserThumbnail;
