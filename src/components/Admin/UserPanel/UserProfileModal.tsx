import React, {useState} from 'react';
import uniq from 'lodash/uniq';
import Event from '~/constants/eventType';

import Topic from '~/constants/topicType';
import {BlackModal, ModalBody} from '~/components/utils/Modal';

import TabSlider from '~/components/utils/TabSlider';
import {User} from '~/constants/userFields';

import UserEvents from './UserEvents';
import UserEnv from '~/constants/userEnvType';
import SlideDiv from '~/components/utils/SlideDiv';
import DetailsFrame from '~/components/utils/DetailsFrame';

import UserDetails from '~/components/Admin/UserPanel/UserDetails';

interface TabBtnProps {
  className?: string;
  children: React.ReactNode;
  active: boolean;
  onClick: Function;
}

const selectedStyle = {
  borderColor: 'black',
  borderWidth: '5px'
};

interface ConfigNotifyProps {
  onChange: Function;
  preferredNotificationTime?: {
    startTime: string;
    endTime: string;
    selected: boolean;
  };
  blockOffTime?: {
    startTime: string;
    endTime: string;
    selected: boolean;
  };
  preferredWeekdays?: number[];
  preferredNotificationMedium?: {
    medium: string;
    selected: boolean;
  }[];
}

interface MessengerProps {
  user: User | null;
}

const Messenger: React.FC<MessengerProps> = props => {
  const {user} = props;

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  // TODO: Select the type that the user want to receive:
  //  - Preferred notification medium

  return (
    <SlideDiv>
      <form
        className="flex flex-col h-full"
        onSubmit={e => {
          e.preventDefault();

          if (user && user.firebaseMessagingToken) {
            const notification = {
              title,
              body,
              token: user.firebaseMessagingToken
            };
            fetch(
              'https://us-central1-tickle-194510.cloudfunctions.net/emailNotifications-sendNotification',
              {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(notification)
              }
            );
          } else {
            const email = {
              to: user && user.email,
              subject: title,
              message: body
            };
            fetch(
              'https://us-central1-tickle-194510.cloudfunctions.net/emailNotifications-sendEmail',
              {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(email)
              }
            );
          }
        }}>
        <section className="mb-2">
          <h2 className="mb-2">Title:</h2>
          <input
            onChange={e => setTitle(e.target.value)}
            placeholder="Your Title"
            className="form-control w-full border-2"
          />
        </section>
        <section className="">
          <h2 className="mb-2">Body:</h2>
          <textarea
            onChange={e => setBody(e.target.value)}
            placeholder="Your message"
            className="w-full form-control border-2"
            rows={10}
          />
        </section>
        <button type="submit" className="btn border-2 p-2">
          {user && user.firebaseMessagingToken
            ? 'Send Notification'
            : 'Send email'}
        </button>
      </form>
    </SlideDiv>
  );
};

const TabBtn: React.FC<TabBtnProps> = props => {
  const {className, children, active, onClick} = props;

  return (
    <button
      type="button"
      {...props}
      onClick={() => onClick()}
      className={`flex-grow btn border p-2 ${className} ${
        active ? 'btn-active' : null
      }`}>
      {children}
    </button>
  );
};

const ConfigNotify: React.FC<ConfigNotifyProps> = props => {
  const {
    onChange,
    // preferredWeekdays = [],
    preferredNotificationMedium = []
  } = props;

  const [mediumPanelOpen, setMediumPanelOpen] = useState<boolean>(
    false
  );

  // const notifyStartTime = timeParser(
  //   preferredNotificationTime.startTime
  // );

  // TODO
  // weekDays.map(
  //   w => (w.selected = preferredWeekdays.some(pw => pw === w.number))
  // );

  const medium = [
    {
      medium: 'Push Notification',
      selected: false
    },
    {medium: 'Email', selected: false}
  ];

  medium.map(
    m =>
      (m.selected = preferredNotificationMedium.some(
        pm => pm.medium === m.medium
      ))
  );

  return (
    <SlideDiv>
      <DetailsFrame
        className="flex flex-col mb-3"
        open={mediumPanelOpen}
        onClick={() => setMediumPanelOpen(!mediumPanelOpen)}
        title="Preferred Notification Medium">
        <p className="mb-2">Notification Medium</p>
        <div className="flex flex-wrap justify-between">
          {medium.map(m => (
            <button
              type="button"
              id={m.medium}
              className="btn border-2 p-2"
              onClick={() => {
                if (m.selected) {
                  onChange({
                    preferredNotificationMedium: preferredNotificationMedium.filter(
                      pm => pm.medium !== m.medium
                    )
                  });
                } else {
                  onChange({
                    preferredNotificationMedium: uniq([
                      ...preferredNotificationMedium,
                      m.medium
                    ])
                  });
                }
              }}
              style={m.selected ? selectedStyle : undefined}>
              {m.medium}
            </button>
          ))}
        </div>
      </DetailsFrame>
    </SlideDiv>
  );
};

interface UserInfoModalProps {
  visible: boolean;
  key: string;
  user: User | null;
  onClose: Function;
  updateUser: Function;
  onRemoveUser: Function;
  registerUserToEnv: Function;
  removeUserFromEnv: Function;
  envs: UserEnv[];
  events: Event[];
  fetchAllUserEvents: Function;
  topicDict: Topic[];
}

const UserProfileModal: React.FC<UserInfoModalProps> = props => {
  const {
    visible,
    user,
    onClose,
    updateUser,
    envs,
    registerUserToEnv,
    removeUserFromEnv,
    events,
    fetchAllUserEvents
  } = props;
  const {email = null} = user || {};

  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const goToTab = (index: number) => () => setVisibleIndex(index);

  return (
    <BlackModal visible={visible} key="modal" className="my-3">
      {visible && (
        <ModalBody
          className="flex-grow overflow-hidden"
          title={email || undefined}
          onClose={onClose}>
          <>
            <div className="flex mt-1 mb-3">
              <TabBtn
                active={visibleIndex === 0}
                className="mr-1"
                onClick={goToTab(0)}>
                Activity
              </TabBtn>
              <TabBtn
                active={visibleIndex === 1}
                className="mr-1"
                onClick={goToTab(1)}>
                User Details
              </TabBtn>
              <TabBtn className="mr-1"active={visibleIndex === 2} onClick={goToTab(2)}>
                Messenger
              </TabBtn>
              <TabBtn active={visibleIndex === 3} onClick={goToTab(3)}>
                Notify configuration
              </TabBtn>
            </div>
            <TabSlider
              key={user ? user.uid : undefined}
              visibleIndex={visibleIndex}
              className="flex-grow"
              tabClassName="p-1">
              <UserEvents
                {...props}
                events={events}
                fetchAllUserEvents={fetchAllUserEvents}
                className=""
              />
              <UserDetails
                {...props}
                registerUserToEnv={registerUserToEnv}
                removeUserFromEnv={removeUserFromEnv}
                envs={envs}
                user={user}
              />
              <Messenger {...props} user={user} />
              <ConfigNotify
                {...props}
                {...user}
                onChange={(n: User) => updateUser({...user, ...n})}
              />
            </TabSlider>
          </>
        </ModalBody>
      )}
    </BlackModal>
  );
};
export default UserProfileModal;
