import React, { useEffect, useState } from 'react';
import uuidv1 from 'uuid/v1';
import AtSign from 'react-feather/dist/icons/at-sign';
import Phone from 'react-feather/dist/icons/phone';
import clsx from 'clsx';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import SelectTags from '~/components/utils/SelectTags';

import TabSlider from '~/components/utils/TabSlider';

// import PreviewTag from "~/components/utils/PreviewTag";
// import { User } from "~/constants/userFields";
//
const prevActs = [
  { id: 1, value: 'blablalblabla' },
  { id: 2, value: 'blablasllvlbasl' },
  { id: 3, value: 'aslldasmvadkask' }
];

const Btn: React.FC<any> = props => (
  <button
    {...props}
    className={clsx(
      'btn border-2 p-2 flex-grow text-gray-700',
      props.className
    )}
    type="button"
  />
);

const RadioBtn: React.FC<any> = ({ children, className, onChange }) => {
  const uid = uuidv1();
  return (
    <div className={clsx('flex items-center ', className)}>
      <input
        id={uid}
        type="radio"
        name="radio"
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={uid}
        className="flex flex-grow items-center cursor-pointer ">
        <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
        {children}
      </label>
    </div>
  );
};

const ContactForm: React.FC<any> = ({
  onLeftClick,
  onRightClick,
  onChange,
  contactType
}) => (
    <div className="text-4xl p-2 flex flex-col flex-grow">
      <p>How to Contact?</p>
      <p className="border-b-2">Choose One:</p>
      <form onSubmit={e => e.preventDefault()} className="mt-3">
        <RadioBtn className="mb-2" onChange={() => onChange('telephone')}>
          <Phone className="mr-1" />
          <div>Telephone</div>
        </RadioBtn>
        <RadioBtn onChange={() => onChange('email')}>
          <AtSign className="mr-1" />
          <div>Email</div>
        </RadioBtn>
      </form>
      <div className="mt-auto flex justify-between text-2xl p-2">
        <Btn className="mr-2" onClick={onLeftClick}>
          Prev
      </Btn>
        <Btn
          onClick={onRightClick}
          disabled={!contactType}
          className={!contactType && 'disabled'}>
          Next
      </Btn>
      </div>
    </div>
  );

const Summary: React.FC<any> = ({
  onLeftClick,
  onSubmitClick,
  helpNeed
}) => (
    <div className="p-2 flex text-xl flex-col flex-grow">
      <h2 className="text-3xl">Summary</h2>
      <div>
        <h3 className="text-2xl"> What</h3>
        {helpNeed.action?.id}
      </div>
      <div>
        <h3 className="text-2xl"> When</h3>
        {helpNeed.time}
      </div>
      <div>
        <h3 className="text-2xl"> contact</h3>
        {helpNeed.contactType}
      </div>

      <div className="mt-auto flex justify-between text-2xl p-2">
        <Btn className="mr-2" onClick={onLeftClick}>
          Prev
      </Btn>
        <Btn onClick={onSubmitClick}>Submit</Btn>
      </div>
    </div>
  );

const WhatForm: React.FC<any> = ({
  authUser,
  onLeftClick,
  onRightClick,
  onChange,
  action
}) => (
    <div className="p-2 text-4xl flex-grow flex flex-col">
      <div className="">Hi {authUser.username}</div>
      <p className="mb-2 border-b-2">What would you like to do?</p>
      <SelectTags
        className="mt-3"
        defaultValue="Select Action"
        liClassName="text-2xl"
        idAcc={(d: any) => d.id}
        valueAcc={(d: any) => d.value}
        onChange={onChange}
        values={prevActs}
      />
      <div className="mt-auto flex justify-between text-2xl p-2">
        <Btn
          onClick={onRightClick}
          disabled={!action}
          className={!action && 'disabled'}>
          Next
      </Btn>
      </div>
    </div>
  );

const WhenForm = ({ onLeftClick, onRightClick, onChange, time }) => (
  <div className="text-4xl p-2 flex flex-col flex-grow">
    <p className="">Ok! sounds good!</p>
    <p className="border-b-2">When would you like to do this?</p>

    <form className="text-2xl mt-3" onSubmit={e => e.preventDefault()}>
      <RadioBtn onChange={() => onChange('today')}>
        <div className="flex flex-grow justify-between">
          <div>Today</div> <div>24h</div>
        </div>
      </RadioBtn>
      <RadioBtn
        className="my-2"
        onChange={() => {
          onChange('tomorrow');
        }}>
        <div className="flex flex-grow justify-between">
          <div>Tomorrow</div> <div>48h</div>
        </div>
      </RadioBtn>
      <RadioBtn onChange={() => onChange('this week')}>
        <div className="flex flex-grow justify-between">
          <div>This week</div> <div>7*24h</div>
        </div>
      </RadioBtn>
    </form>

    <div className="mt-auto flex justify-between text-2xl p-2">
      <Btn className="mr-2" onClick={onLeftClick}>
        Prev
      </Btn>
      <Btn
        onClick={onRightClick}
        disabled={!time}
        className={!time && 'disabled'}>
        Next
      </Btn>
    </div>
  </div>
);

const HelpModal: React.FC<any> = props => {
  const { helpMode, setHelpMode, authUser } = props;
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const onLeftClick = () => setVisibleIndex(visibleIndex - 1);
  const onRightClick = () => setVisibleIndex(visibleIndex + 1);

  const initHelpNeed = { action: null, time: null, contactType: null };
  const [helpNeed, setHelpNeed] = useState(initHelpNeed);

  return (
    <div className="flex-grow flex flex-col">
      <div className="flex-grow flex flex-col">
        <TabSlider
          visibleIndex={visibleIndex}
          className="flex flex-col flex-grow">
          <WhatForm
            action={helpNeed.action}
            authUser={authUser}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
            onChange={(action: string) =>
              setHelpNeed({ ...helpNeed, action })
            }
          />
          <WhenForm
            time={helpNeed.time}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
            onChange={(time: string) =>
              setHelpNeed({ ...helpNeed, time })
            }
          />
          <ContactForm
            contactType={helpNeed.contactType}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
            onChange={(contactType: string) =>
              setHelpNeed({ ...helpNeed, contactType })
            }
          />
          <Summary
            helpNeed={helpNeed}
            onLeftClick={onLeftClick}
            onSubmitClick={() => {
              setHelpNeed(initHelpNeed);
              setHelpMode(false);
              setVisibleIndex(0);
            }}
          />
        </TabSlider>
      </div>
    </div>
  );
};

export default HelpModal;
