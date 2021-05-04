import React, {useState, useEffect, useLayoutEffect} from 'react';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';

import UserIcon from 'react-feather/dist/icons/user';
import Minus from 'react-feather/dist/icons/minus';
import Plus from 'react-feather/dist/icons/plus';

import {BlackModal, ModalBody} from '~/components/utils/Modal';
import PreviewTag from '~/components/utils/PreviewTag';

import ElementPanel from './ElementPanel';
import softSkillData from '~/constants/softSkillData';

const IncrementPoints = props => {
  const {points = 10, onClick} = props;
  return (
    <div className="flex items-center mb-2">
      <div className="mr-auto text-xl">{points}</div>

      <div className="flex">
        <button
          type="button"
          className="btn bg-yellow-500"
          onClick={() => onClick(Math.max(0, points - 10))}>
          <Minus color="white" />
        </button>
        <button
          type="button"
          className="btn bg-green-500"
          onClick={() => onClick(Math.min(100, points + 10))}>
          <Plus color="white" />
        </button>
      </div>
    </div>
  );
};
export default function BadgePanel(props) {
  const {
    topicDict,
    fetchTopics,
    userEnvId,
    updateTopic,
    removeTopic
  } = props;

  const onSubmitTopic = topic => updateTopic(topic, userEnvId);
  const onRemoveTopic = topicId => removeTopic(topicId, userEnvId);

  useEffect(() => {
    fetchTopics(userEnvId);
  }, [userEnvId]);

  return (
    <ElementPanel
      {...props}
      data={softSkillData}
      removable={() => false}
      title="Soft Skills"
      elementTitle="Skill"
      onSubmitElement={null}
      onRemoveElement={null}
      extendForm={(datum, setDatum) => (
        <div className="mt-3 w-full">
          <h3>Points:</h3>
          <IncrementPoints
            points={datum.points}
            onClick={ps => setDatum({points: ps})}
          />
        </div>
      )}
    />
  );
}
