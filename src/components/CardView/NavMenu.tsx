import React, {useState} from 'react';

import {motion} from 'framer-motion';
import SlideMenu from '~/components/utils/SlideMenu';
import SelectUserEnv from './SelectUserEnv';

import PreviewTag from '~/components/utils/PreviewTag';
import TopicDetail from '~/components/utils/TopicDetail';

import {BlackModal, ModalBody} from '~/components/utils/Modal';
import {
  ACTIVITY_STARTED,
  ACTIVITY_SUCCEEDED,
  NO_ACTIVITY_FILTER,
  Card
} from '~/constants/cardFields';

import Topic from '~/constants/topicType';
import AuthUser from '~/constants/authUserType';
import useClickOutside from '~/components/utils/useClickOutside';

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

const NavMenu: React.FC<NavMenuProps> = props => {
  const {
    topicDict,
    view,
    toggleView,
    topicSet,
    selectTopicId,
    cards,
    setFilterId,
    authUser,
    match,
    history,
    userEnvId,
    height
  } = props;

  const filteredTopics = topicDict.filter((t: Topic) =>
    cards.find((c: Card) => !!c.topics?.value?.find(e => e.id === t.id))
  );

  const ref = React.useRef(null);
  useClickOutside(ref, (outside: boolean) => {
    if (outside) setMenu(false);
  });

  const highlight = (d: Topic) =>
    topicSet.length === 0 || topicSet.includes(d.id)
      ? 'opacity-100'
      : 'opacity-25';

  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(false);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <div className="flex justify-end relative m-2 z-20" ref={ref}>
      <SlideMenu
        className="flex-grow "
        onClick={() => setMenu(!menu)}
        visible={menu}
        style={{width: '95vw', maxHeight: height - 100}}>
        <div className="overflow-y-auto ">
          {filteredTopics.length ? <h3>Topics</h3> : null}
          <motion.div className="mt-3 flex flex-wrap">
            {filteredTopics.map((d: Topic) => (
              <PreviewTag
                {...d}
                className={`m-1 ${highlight(d)} md:h-24 h-12 w-20`}
                style={{transition: 'opacity 300ms', maxWidth: '6rem'}}
                onClick={() => {
                  setTopic(d);
                }}
              />
            ))}
          </motion.div>
        </div>
        <div className="overflow-y-auto">
          <h3>Cards</h3>
          <div className="mt-3 flex flex-wrap m-1">
            <button
              className="btn p-2 border-2"
              type="button"
              onClick={() => setFilterId(ACTIVITY_STARTED)}>
              Started
            </button>
            <button
              className="btn mx-1 border-2 p-2"
              type="button"
              onClick={() => setFilterId(ACTIVITY_SUCCEEDED)}>
              Collected
            </button>
            <button
              className="btn border-2 p-2"
              type="button"
              onClick={() => setFilterId(NO_ACTIVITY_FILTER)}>
              All
            </button>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 btn p-2 border-2 w-full"
          onClick={e => {
            setWelcomeScreen(true);
            e.stopPropagation();
          }}>
          Environments
        </button>
      </SlideMenu>
      <BlackModal visible={welcomeScreen} className="">
        <ModalBody
          title="Welcome to TICKLE"
          className="flex-grow "
          onClose={() => {
            setWelcomeScreen(false);
            setTopic(null);
          }}>
          <SelectUserEnv
            {...props}
            userEnvId={userEnvId}
            authUser={authUser}
            match={match}
            history={history}
            className="p-2 overflow-y-auto z-10"
            onClose={() => setWelcomeScreen(false)}
          />
        </ModalBody>
      </BlackModal>
      {topic && (
        <BlackModal visible={topic !== null} className="">
          <ModalBody
            className="overflow-y-auto w-full"
            title={topic ? topic.title : undefined}
            onClose={() => {
              setWelcomeScreen(false);
              setTopic(null);
            }}>
            <TopicDetail
              {...props}
              {...topic}
              description={topic.description}
              img={topic.img}
              onClick={() => {
                topic && selectTopicId(topic.id);
                setMenu(false);
                setTopic(null);
              }}
            />
          </ModalBody>
        </BlackModal>
      )}
    </div>
  );
};

export default NavMenu;
