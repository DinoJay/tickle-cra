import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';

import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import {ModalBody} from '~/components/utils/Modal';

import {SOFT_SKILLS} from '~/constants/cardFields';

// TODO change
import softSkillDict from '~/constants/softSkillData';

import PreviewFrame from './PreviewFrame';

import {EditMetaTags} from './MetaTags';

export const key = SOFT_SKILLS;

export const label = 'Soft-Skills';

export const ModalContent = props => {
  const {
    softSkills: {value, points = 0},
    onChange,

    modalProps
  } = props;

  const change = selectedData => {
    onChange({key, label, value: selectedData});
  };

  return (
    <ModalBody {...modalProps} className="flex-grow">
      <EditMetaTags
        selectedTags={value || []}
        allTags={softSkillDict}
        onChange={change}
      />
    </ModalBody>
  );
};

export const Preview = props => {
  const {onClick, softSkills, points} = props;

  return (
    <PreviewFrame
      onClick={onClick}
      type={label}
      empty={softSkills.value === null}
      content={() => (
        <div className="flex flex-wrap">
          {softSkills.value &&
            softSkills.value.map(d => (
              <div className="m-1">{d.title}</div>
            ))}
        </div>
      )}
    />
  );
};
