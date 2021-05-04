import React from 'react';
import { Card } from '~/constants/cardFields';
import Topic from '~/constants/topicType';
import AuthUser from '~/constants/authUserType';
interface NavMenuProps {
    authUser: AuthUser;
    topicDict: Topic[];
    topicSet: string[];
    view: boolean;
    toggleView: Function;
    selectTopicId: (a: string) => void;
    cards: Card[];
    setFilterId: (a: string) => void;
    match?: any;
    history?: any;
    userEnvId: string;
    height: number;
}
declare const NavMenu: React.FC<NavMenuProps>;
export default NavMenu;
