import React from 'react';
import { User } from '~/constants/userFields';
import { Card } from '~/constants/cardFields';
declare const LeaderBoard: React.FC<{
    fetchUsers: Function;
    users: User[];
    cards: Card[];
    userEnvId: string;
    fetchAllCardsWithSubmissions: (env: string) => any;
}>;
export default LeaderBoard;
