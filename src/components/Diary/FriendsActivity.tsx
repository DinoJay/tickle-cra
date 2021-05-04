import React from 'react';
import LeaderBoard from './LeaderBoard';

const FriendsActivity: React.FC<any> = props => (
  <div className="flex-grow">
    <LeaderBoard {...props} />
  </div>
);
export default FriendsActivity;
