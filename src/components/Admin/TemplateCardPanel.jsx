import React, {useState, useEffect, useLayoutEffect} from 'react';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';

import UserIcon from 'react-feather/dist/icons/user';
import uniq from 'lodash/uniq';

import isEqual from 'lodash/isEqual';

import {BlackModal, ModalBody} from '~/components/utils/Modal';
import AlertButton from '~/components/utils/AlertButton';

import useMergeState from '~/components/utils/useMergeState';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import {cardFields as allCardFields} from '~/components/cards/CardFront/FieldTemplates';

import imgSrc from '~/styles/mediaTypes/img.svg';
import txtSrc from '~/styles/mediaTypes/txt.svg';
import videoSrc from '~/styles/mediaTypes/video.svg';
// import imgSrc from '~/styles/mediaTypes/gif.svg';

import DetailsFrame from '~/components/utils/DetailsFrame';

// const TagSet = ({values, className, placeholder}) => (
//   <div className={`flex mt-1 flex-wrap ${className}`}>
//     {values.length === 0 && (
//       <div className="tag-label bg-grey mr-1 mb-1">{placeholder}</div>
//     )}
//     {values.map(a => (
//       <div className="tag-label bg-black mr-1 mb-1">{a}</div>
//     ))}
//   </div>
// );
//
const blockItemClass =
  'p-4 cursor-pointer font-bold flex items-center justify-center uppercase text-white bg-black ';

const TemplateCardPanelContent = props => {
  const {userEnv, updateEnv} = props;

  // const updateUserEnv = e => updateEnv({...userEnv, ...e});
  const {cardFields = []} = userEnv;

  const exists = d =>
    cardFields.filter(e => e.key === d.key).length > 0;

  const removeField = d => cardFields.filter(e => e.key !== d.key);
  const addField = d => cardFields.concat(d);

  return (
    <div className="flex flex-wrap">
      {allCardFields.map(d => (
        <div className="m-1 ">
          <button
            className={`${blockItemClass} ${!exists(d) &&
              'opacity-25'}`}
            onClick={() => {
              updateEnv({
                ...userEnv,
                cardFields: exists(d) ? removeField(d) : addField(d)
              });
            }}>
            {d.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default function CardTemplatePanel(props) {
  const {
    className,
    selectedUserId,
    onSelectUser,
    userRegErr,
    title = '',
    userEnvId,
    updateEnv,
    createTopic,
    envs,
    // registerUserToEnv,
    users,
    topicDict
  } = props;

  const [isModalOpen, setModalOpen] = useState(false);
  const [topicId, setTopicId] = useState(null);
  // const topic = topicDict.find(t => t.id === topicId);

  // TODO untangle
  const [panelOpen, setPanelOpen] = useState(false);

  const headerHeight = 300;

  const userEnv = envs.find(e => e.id === userEnvId);

  const updateUserEnv = e => updateEnv({...e});

  return (
    <DetailsFrame
      className={className}
      open={panelOpen}
      onClick={() => setPanelOpen(!panelOpen)}
      title={!userEnv ? 'Loading' : `Card Template`}>
      {userEnv ? (
        <TemplateCardPanelContent {...props} userEnv={userEnv} />
      ) : null}
    </DetailsFrame>
  );
}
