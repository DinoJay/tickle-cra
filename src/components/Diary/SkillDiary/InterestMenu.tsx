import React from 'react';

import Topic from '~/constants/topicType.ts';
import AuthUser from '~/constants/authUserType.ts';

import {Card, isActivitySucceeded} from '~/constants/cardFields';

import BarChart from './BarChart';
import DataElem from '~/constants/dataElemType';

import setify from '~/components/utils/setify';

import calcPoints from '~/components/utils/calcPoints';

import FlexCollapsible from '~/components/utils/FlexCollapsible';

const InterestMenu: React.FC<{
  className: string;
  // authUser: AuthUser;
  cards: Card[];
  open: boolean;
  onClick: Function;
  // openPanel: boolean;
  allXpoints: number;
  topicDict: Topic[];
  authUser: AuthUser;
}> = props => {
  const {cards, open, onClick, allXpoints} = props;

  const succeededCards = cards.filter(isActivitySucceeded);

  const ps = calcPoints(succeededCards);
  const sets: DataElem[] = setify(succeededCards);

  return (
    <FlexCollapsible
      className="mb-2"
      header={<h4>Interests</h4>}
      open={open}
      onClick={onClick}
      footer={
        <div className="w-full flex justify-between items-center">
          <div className="text-xl ">{ps}XP</div>
        </div>
      }>
      {sets.length === 0 && (
        <div className="text-xl italic m-1">No Interests</div>
      )}
      <BarChart
        cards={cards}
        className="m-1 md:px-3 overflow-y-auto"
        countAcc={(d: Topic): number => d.points || 0}
        data={sets}
        imgAcc={(d: Topic): string | null => (d.img ? d.img.url : null)}
      />
    </FlexCollapsible>
  );
};
export default InterestMenu;
