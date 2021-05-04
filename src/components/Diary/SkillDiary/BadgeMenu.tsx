import React from 'react';
import Plus from 'react-feather/dist/icons/plus';
import softSkillData, {SoftSkill} from '~/constants/softSkillData';

import BarChart from '~/components/utils/BarChart';

import FlexCollapsible from '~/components/utils/FlexCollapsible';

const PlusBtn: React.FC<any> = props => (
  <button type="button" className="btn p-2 bg-black" {...props}>
    <Plus color="white" />
  </button>
);

const BadgeMenu: React.FC<{
  onClick: Function;
  openPanel: Function;
  open: boolean;
}> = props => {
  const {onClick, openPanel, open} = props;
  const data = softSkillData
    .slice(0, 4)
    .map((d: SoftSkill) => ({...d, count: 3 + Math.random() * 20}));

  return (
    <FlexCollapsible
      className="mb-2"
      open={open}
      header={<h4>Soft-Skills</h4>}
      onClick={onClick}
      footer={
        <>
          <div className="text-xl " style={{width: '90%'}}>
            100$
          </div>
          <PlusBtn onClick={openPanel} />
        </>
      }>
      <div>
        <BarChart
          className="flex-shrink-0"
          sumAcc={() => 100}
          data={data}
        />
      </div>
    </FlexCollapsible>
  );
};

export default BadgeMenu;
