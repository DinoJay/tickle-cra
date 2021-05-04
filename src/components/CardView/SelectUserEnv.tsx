import React, {useState, CSSProperties} from 'react';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';

import {motion} from 'framer-motion';
// import BackgroundImg from '~/components/utils/BackgroundImg';
import AuthUser from '~/constants/authUserType';
import Img from '~/constants/imgType';
import UserEnv from '~/constants/userEnvType';

interface EnvDetailProps {
  img: Img | null;
  open: boolean;
  description: string;
  onClick: () => void;
}

const EnvDetail: React.FC<EnvDetailProps> = props => {
  const {img, open, description, onClick} = props;

  const variants = {
    closed: {height: 0, opacity: 0},
    open: {
      height: 'auto',
      opacity: 1
    }
  };
  return (
    <motion.div
      {...props}
      variants={variants}
      className="overflow-hidden flex flex-col p-2"
      animate={open ? 'open' : 'closed'}
      initial="closed">
      {img && (
        <motion.img
          className="w-full flex-grow my-2 h-max-32 overflow-y-auto"
          src={img.url}
        />
      )}
      <motion.div className="flex-shrink overflow-y-auto">
        {description}
      </motion.div>
      <motion.button
        type="button"
        className="p-2 btn border-2 border-green w-full mt-2"
        onClick={onClick}>
        Go!!!
      </motion.button>
    </motion.div>
  );
};

interface EnvPreviewProps {
  name: string;
  open: boolean;
  onClick: () => void;
}

const EnvPreview: React.FC<EnvPreviewProps> = props => {
  const {name, open, onClick} = props;

  return (
    <motion.button
      positionTransition
      type="button"
      className="btn-invisible"
      style={{
        transition: 'opacity 200ms'
      }}
      onClick={onClick}>
      <div className="flex ">
        <div className="mr-1 text-xl">{open ? '🤯 ' : '🙂'}</div>
        <span className="font-bold text-xl">{name}</span>
      </div>
    </motion.button>
  );
};

interface SelectUserEnvProps {
  authUser: AuthUser;
  match: any;
  className?: string;
  style?: CSSProperties;
  history: any;
  userEnvId: string;
  onClose: Function;
}

const SelectUserEnv: React.FC<SelectUserEnvProps> = props => {
  const {
    authUser,
    match,
    className,
    style,
    history,
    onClose,
    userEnvId
  } = props;

  const {userEnvs, envIds} = authUser;
  const [openId, setOpenId] = useState<string | null>(userEnvId);

  const {params, url} = match;

  /* We do it like this to take into account a user admin an environment they were not assigned to it */
  const sortedEnvs = uniqBy(
    sortBy(
      userEnvs.filter(u => envIds.includes(u.id)),
      d => d.id !== openId
    ),
    'id'
  );

  return (
    <div className={`${className} `} style={style}>
      {sortedEnvs.map((d: UserEnv) => (
        <>
          <EnvPreview
            {...d}
            open={openId === d.id}
            onClick={() => setOpenId(openId === d.id ? null : d.id)}
          />
          <EnvDetail
            {...d}
            img={d.img}
            open={openId === d.id}
            key={d.id}
            onClick={() => {
              const nurl = url.replace(`${params.userEnvId}`, d.id);
              history.push(nurl);
              onClose();
            }}
          />
        </>
      ))}
    </div>
  );
};

export default SelectUserEnv;
