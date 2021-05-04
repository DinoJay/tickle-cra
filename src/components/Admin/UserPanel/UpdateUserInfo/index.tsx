import React, {useState} from 'react';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import DetailsFrame from '~/components/utils/DetailsFrame';
import SelectTags from '~/components/utils/SelectTags';
import UserEnv from '~/constants/userEnvType';
import Topic from '~/constants/topicType';
import PersonalityTraits from './PersonalityTraits';
import {
  PersonalityTraits as PersonalityTraitsType,
  User
} from '~/constants/userFields';

import TimeFrame from './TimeFrame';

const tagClass = 'text-base mr-1 mb-1 p-1 text-white uppercase';

interface TagSetProps {
  values: {title: string}[];
  className?: string;
  onClick: Function;
  style?: React.CSSProperties;
  placeholder: string;
}

const uniqById = (newTags: {id: string}[]) =>
  uniqBy(newTags, d => d.id);

const TagSet: React.FC<TagSetProps> = props => {
  const {values, className, onClick, style, placeholder} = props;

  return (
    <div
      style={style}
      className={`flex mt-1 cursor-pointer flex-wrap ${className}`}>
      {values.length === 0 && (
        <div className={`${tagClass} bg-grey`}>{placeholder}</div>
      )}
      {values.map(a => (
        <div
          onClick={() => onClick(a)}
          key={a.title}
          className={`${tagClass} bg-black`}>
          {a.title} <span className="text-sm">x</span>
        </div>
      ))}
    </div>
  );
};

const EnvPanel: React.FC<{
  open: boolean;
  onClick: Function;
  envs: UserEnv[];
  onChange: Function;
  uid: string;
}> = props => {
  const {open, onClick, envs, onChange, uid} = props;

  const checkInEnv = (env: UserEnv) =>
    env.uids && env.uids.includes(uid);

  const baseLiClass =
    'border-b-2 p-1 m-1 text-lg flex justify-between items-center';

  return (
    <DetailsFrame
      className="flex flex-col mb-3"
      open={open}
      onClick={onClick}
      title="Environments">
      <div className="h-64 flex flex-col">
        <ul className="list-reset m-2 ">
          {envs.map(env => (
            <li className={baseLiClass} key={env.id}>
              <span>{env.name}</span>
              <input
                className="cursor-pointer"
                name="inEnv"
                id={env.id}
                type="checkbox"
                defaultChecked={checkInEnv(env)}
                onChange={() => onChange(env)}
              />
            </li>
          ))}
        </ul>
      </div>
    </DetailsFrame>
  );
};
//
// const PLAYER_TYPES = [
//   {
//     trait: 'Philanthropist',
//     selected: false
//   },
//   {
//     trait: 'Socialiser',
//     selected: false
//   },
//   {
//     trait: 'Free Spirit',
//     selected: false
//   },
//   {
//     trait: 'Achiever',
//     selected: false
//   },
//   {
//     trait: 'Player',
//     selected: false
//   },
//   {
//     trait: 'Disruptor',
//     selected: false
//   }
// ];
//
// const BIG_FIVE = [
//   {
//     trait: 'Opennes',
//     selected: false
//   },
//   {
//     trait: 'Conscientiniousness',
//     selected: false
//   },
//   {
//     trait: 'Extraversion',
//     selected: false
//   },
//   {
//     trait: 'Agreeableness',
//     selected: false
//   },
//   {
//     trait: 'Neuroticism',
//     selected: false
//   }
// ];

const CONTENT = [
  {
    content: 'Islamic',
    selected: false
  },
  {
    content: 'Catholic',
    selected: false
  },
  {
    content: 'Judaism',
    selected: false
  }
];

const remove = (tags: {id: string}[], id: string) =>
  tags.filter(t => t.id !== id);

const AimsPanel: React.FC<{
  open: boolean;
  onClick: Function;
  onChange: Function;
  topicDict: Topic[];
  aims: Topic[];
}> = props => {
  const {open, onClick, onChange, topicDict, aims} = props;

  return (
    <DetailsFrame
      className="flex flex-col mb-3 overflow-visible"
      open={open}
      onClick={() => onClick()}
      overflow
      title="Learning Aims">
      <div className="mb-3">
        <SelectTags
          key="0"
          placeholder="Enter Learning Aims"
          inputClassName="flex-grow p-2 border-2 "
          ulClassName="h-max-32 overflow-y-auto"
          idAcc={(d: Topic) => d.id}
          valueAcc={(d: Topic) => d.title}
          onSelect={(newAim: Topic) => {
            onChange({aims: uniqById([...aims, newAim])});
          }}
          values={topicDict}
        />
        <TagSet
          values={aims}
          placeholder="No aim"
          onClick={(n: Topic) => onChange({aims: remove(aims, n.id)})}
        />
      </div>
    </DetailsFrame>
  );
};

interface UpdateUserInfoProps {
  onChange: Function;
  interests: Topic[];
  topicDict: Topic[];
  aims?: Topic[];
  deficits?: Topic[];
  goals?: string[];
  sensitiveContent?: {content: string; selected: boolean}[];
  personalityTraits?: PersonalityTraitsType;
  addUserToEnv: Function;
  excludeUserFromEnv: Function;
  envs: UserEnv[];
  uid: string;
  style?: React.CSSProperties;
  className?: string;
  prefWeekDayIds?: string[];
  user: User;
}

const UpdateUserInfo: React.FC<UpdateUserInfoProps> = props => {
  const {
    onChange,
    interests = [],
    topicDict = [],
    aims = [],
    deficits = [],
    sensitiveContent = [],
    personalityTraits,
    addUserToEnv,
    excludeUserFromEnv,
    user,
    envs,
    uid
  } = props;

  // const removeTag = ()

  const DEFICITS_PANEL = 'DEFICITS_PANEL';
  const AIMS_PANEL = 'AIMS_PANEL';
  const INTEREST_PANEL = 'INTEREST_PANEL';
  const SENSITIVITY_PANEL = 'SENSITIVITY_PANEL';
  const PERSONALITY_PANEL = 'PERSONALITY_PANEL';
  const ENV_PANEL = 'ENV_PANEL';

  const [panelId, setPanelId] = useState<string | null>(null);
  const onPanelClick = (refId: string) =>
    setPanelId(panelId === refId ? null : refId);

  const selectedStyle = {
    borderColor: 'black',
    borderWidth: '5px'
  };

  const checkInEnv = (env: UserEnv) =>
    env.uids && env.uids.includes(uid);

  const handleInputChange = (env: UserEnv) => {
    if (checkInEnv(env)) {
      excludeUserFromEnv({envId: env.id, usrInfo: user});
    } else {
      addUserToEnv({envId: env.id, usrInfo: user});
    }
  };

  return (
    <div className="mr-1">
      <EnvPanel
        envs={envs}
        uid={uid}
        open={panelId === ENV_PANEL}
        onClick={() => onPanelClick(ENV_PANEL)}
        onChange={handleInputChange}
      />
      <DetailsFrame
        className="flex flex-col mb-3"
        open={DEFICITS_PANEL === panelId}
        onClick={() => onPanelClick(DEFICITS_PANEL)}
        title="Learning Deficits">
        <div className="mb-3">
          <SelectTags
            key="1"
            btnContent="Add"
            placeholder="Enter Learning deficits"
            inputClassName="z-0 flex-grow p-2 border-2 "
            ulClassName="h-max-32 overflow-y-auto"
            className=""
            valueAcc={(d: Topic) => d.title}
            idAcc={(d: Topic) => d.id}
            onSelect={(newDeficit: Topic) =>
              onChange({
                deficits: uniqById([...deficits, newDeficit])
              })
            }
            values={topicDict}
          />
          <TagSet
            values={deficits}
            onClick={(n: Topic) =>
              onChange({deficits: remove(deficits, n.id)})
            }
            placeholder="No deficits"
          />
        </div>
      </DetailsFrame>
      <DetailsFrame
        className="flex flex-col mb-3"
        open={panelId === INTEREST_PANEL}
        onClick={() => setPanelId(INTEREST_PANEL)}
        title="Interests">
        <div className="mb-3">
          <SelectTags
            key="2"
            placeholder="Enter interests"
            inputClassName="z-0 flex-grow p-2 border-2 "
            ulClassName="h-max-32 overflow-y-auto"
            valueAcc={(d: Topic) => d.title}
            idAcc={(d: Topic) => d.id}
            onSelect={(newInterest: Topic) => {
              onChange({
                interests: uniqById([...interests, newInterest])
              });
            }}
            values={topicDict}
          />
          <TagSet
            values={interests}
            onClick={(n: Topic) =>
              onChange({interests: remove(interests, n.id)})
            }
            placeholder="No deficits"
          />
        </div>
      </DetailsFrame>
      <DetailsFrame
        className="flex flex-col overflow-y-auto mb-3"
        open={SENSITIVITY_PANEL === panelId}
        onClick={() => onPanelClick(SENSITIVITY_PANEL)}
        title="Sensitive CONTENT">
        <p className="mb-2">Sensitive CONTENT</p>
        <div className="flex flex-wrap justify-between">
          {CONTENT.map(sc => (
            <button
              type="button"
              id={sc.content}
              className="btn border-2 p-2"
              onClick={() => {
                if (sc.selected) {
                  onChange({
                    sensitiveContent: sensitiveContent.filter(
                      s => s.content !== sc.content
                    )
                  });
                } else {
                  onChange({
                    sensitiveContent: uniq([
                      ...sensitiveContent,
                      sc.content
                    ])
                  });
                }
              }}
              style={sc.selected ? selectedStyle : undefined}>
              {sc.content}
            </button>
          ))}
        </div>
      </DetailsFrame>
      <PersonalityTraits
        traits={personalityTraits}
        onChange={(traits: PersonalityTraitsType) =>
          onChange({personalityTraits: traits})
        }
        open={PERSONALITY_PANEL === panelId}
        onClick={() => onPanelClick(PERSONALITY_PANEL)}
      />

      <AimsPanel
        onChange={onChange}
        aims={aims}
        onClick={() => onPanelClick(AIMS_PANEL)}
        topicDict={topicDict}
        open={AIMS_PANEL === panelId}
      />
      <TimeFrame {...props} />
    </div>
  );
};

export default UpdateUserInfo;
