import React from 'react';
import clsx from 'clsx';
import DetailsFrame from '~/components/utils/DetailsFrame';
// import Topic from '~/constants/topicType';

import {PersonalityTraits as PersonalityTraitsType} from '~/constants/userFields';

const PercentageInput: React.FC<any> = props => {
  const {label, value, onChange, className} = props;

  return (
    <div
      className={clsx(
        'w-32 p-1 flex flex-col h-24 items-center',
        className
      )}>
      <div className="form-input w-full h-full border-4 flex items-center">
        <div className=" text-2xl flex items-center">
          <input
            onChange={e => onChange && onChange(e.target.value)}
            value={value}
            type="number"
            min="0"
            max="100"
            step="1"
            className="w-full text-center w-full"
          />
          <span className="">%</span>
        </div>
      </div>
      <div className="w-full flex-shrink-0 text-center text-lg text-gray-700 truncate">
        {label}
      </div>
    </div>
  );
};

const PersonalityTraits: React.FC<{
  open: boolean;
  traits?: PersonalityTraitsType;
  onClick: Function;
  onChange: Function;
}> = props => {
  const {
    onClick,
    onChange,
    open,
    traits = {
      openness: 0,
      conscientiousness: 0,
      emotionalStability: 0,
      agreeableness: 0,
      neuroticism: 0,
      player: 0,
      introvert: 0,
      extrovert: 0
    }
  } = props;

  const {
    openness,
    conscientiousness,
    agreeableness,
    neuroticism,
    player,
    emotionalStability,
    introvert,
    extrovert
  } = traits;

  const updateTraits = (tr: Object) => onChange({...traits, ...tr});

  return (
    <DetailsFrame
      className="flex overflow-y-auto mb-3"
      open={open}
      onClick={onClick}
      title="Personality Traits">
      <form
        className="flex flex-wrap"
        onSubmit={e => {
          e.preventDefault();
        }}>
        <PercentageInput
          label="Openness"
          className="m-1"
          value={openness}
          onChange={(val: string) =>
            updateTraits({openness: parseInt(val, 10)})
          }
        />
        <PercentageInput
          value={conscientiousness}
          className="m-1 "
          label="conscientiousness"
          onChange={(val: string) =>
            updateTraits({conscientiousness: parseInt(val, 10)})
          }
        />
        <PercentageInput
          value={agreeableness}
          className="m-1"
          label="Agreeableness"
          onChange={(val: string) =>
            updateTraits({agreeableness: parseInt(val, 10)})
          }
        />
        <PercentageInput
          value={neuroticism}
          className="m-1"
          label="Neuroticism"
          onChange={(val: string) =>
            updateTraits({neuroticism: parseInt(val, 10)})
          }
        />
        <PercentageInput
          value={emotionalStability}
          className="m-1"
          label="Emotional stable"
          onChange={(val: string) =>
            updateTraits({emotionalStability: parseInt(val, 10)})
          }
        />
        <PercentageInput
          value={introvert}
          className="m-1"
          label="Introvert"
          onChange={(val: string) =>
            updateTraits({introvert: parseInt(val, 10)})
          }
        />
        <PercentageInput
          value={extrovert}
          onChange={(val: string) =>
            updateTraits({extrovert: parseInt(val, 10)})
          }
          className="m-1"
          label="Extrovert"
        />
        <PercentageInput
          value={player}
          onChange={(val: string) =>
            updateTraits({player: parseInt(val, 10)})
          }
          className="m-1"
          label="Player"
        />
      </form>
    </DetailsFrame>
  );
};
export default PersonalityTraits;
