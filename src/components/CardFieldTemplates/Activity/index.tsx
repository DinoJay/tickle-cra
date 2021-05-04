import React from 'react';
import Chevrons from 'react-feather/dist/icons/chevrons-right';
import clsx from 'clsx';

import {
  useQueryParams,
  StringParam,
  BooleanParam
} from 'use-query-params';

import Activity from '~/constants/activityType';

import {ModalProps, ModalBody} from '~/components/utils/Modal';

import {ACTIVITY} from '~/constants/cardFields';
import PreviewFrame from '../PreviewFrame';

import AuthUser from '~/constants/authUserType';
import ActivitySubmission from '~/constants/activitySubmissionType';
import {Match} from '~/constants/typeUtils';
import * as BookWidget from './BookWidget';
import * as TextChallenge from './TextChallenge';
import * as Quiz from './Quiz';
import * as Hangman from './Hangman';

export const activityComps: {[key: string]: any} = {
  [BookWidget.type]: BookWidget,
  [TextChallenge.type]: TextChallenge,
  [Quiz.type]: Quiz,
  [Hangman.type]: Hangman
};

export const getActivityCompView: React.FC = k => {
  const Comp = activityComps[k as string];
  if (!Comp) return (): React.ReactNode => <div>Loading</div>;

  return Comp.View;
};

type SelectType = {
  key: string;
  preview: JSX.Element;
  detail: JSX.Element;
};

const GridSelect: React.FC<{
  selectedKey?: string;
  style: React.CSSProperties;
  children: SelectType[];
}> = props => {
  const {selectedKey, children, style} = props;
  const selected = children.find(
    (c: SelectType) => c.key === selectedKey
  );

  const {detail} = selected || {detail: null};

  return (
    <div
      style={style}
      className={clsx(
        'w-full flex flex-grow flex-col overflow-hidden',
        !selectedKey && 'items-center'
      )}>
      {selectedKey
        ? [detail]
        : children.map((d: SelectType) => d.preview)}
    </div>
  );
};

export const key = ACTIVITY;
export const label = 'Activity';

const ActivityAuthor: React.FC<{
  activity: Activity;
  onChange: Function;
  modalProps: ModalProps;
  // addToStorage: Function;
  authUser: AuthUser;
  onClose: Function;
  // removeFromStorage: Function;
  id: string;
  activitySubmission: ActivitySubmission;
  addActivitySubmission: (a: any) => any;
  match: any;
  addToStorage: Function;
  removeFromStorage: Function;
  onSubmit: Function;
  disabled: boolean;
  // onSubmit: Function;
  // disabled: boolean;
  style?: React.CSSProperties;
}> = props => {
  const {
    activity,
    modalProps,
    onChange,
    // style,
    addToStorage,
    removeFromStorage,
    onSubmit,
    disabled
  } = props;

  const [query = null, setQuery] = useQueryParams({
    selectedKey: StringParam,
    dialogKey: StringParam,
    activityUserview: BooleanParam
  });

  /* TODO dialog key is external, it comes from editcardfront */
  const {
    selectedKey,
    activityUserview,
    dialogKey
  }: {
    selectedKey?: string;
    activityUserview?: boolean;
    dialogKey?: string;
  } = query || {};

  const updateQuery = (newSt: {
    selectedKey?: string;
    activityUserview?: boolean;
    dialogKey?: string;
  }): void =>
    setQuery({dialogKey, selectedKey, activityUserview, ...newSt});

  const activityType = activity ? activity.type : undefined;

  const allActivities = [TextChallenge, Quiz, Hangman];

  return (
    <ModalBody
      {...modalProps}
      onClose={(): void => {
        modalProps.onClose();
        setQuery({
          selectedKey: undefined,
          dialogKey: undefined
        });
        // if (!query) setQuery({dialogKey: null, selectedKey: null});
      }}
      title={undefined}
      header={
        <div className="flex mt-3 items-center">
          <button
            type="button"
            className="btn-invisible"
            disabled={!query}
            onClick={(): void => updateQuery({selectedKey: undefined})}>
            <h1>Activities</h1>
          </button>
          {selectedKey && (
            <div key="chevrons">
              <Chevrons />
            </div>
          )}
          {selectedKey && (
            <div key="query" className="btn-invisible">
              <h2>{selectedKey}</h2>
            </div>
          )}
        </div>
      }
      className="flex-grow">
      <div className="flex flex-col flex-grow ">
        <GridSelect selectedKey={selectedKey} style={{minHeight: 0}}>
          {allActivities.map(d => ({
            key: d.type,
            preview: (
              <div
                key={d.type}
                className={`btn w-48 h-48 border-2 p-2 my-1 mr-3 ${
                  activityType === d.type ? 'bg-yellow-400' : 'bg-white'
                }`}
                onClick={(): void => {
                  updateQuery({selectedKey: d.type});
                }}>
                {d.label}
              </div>
            ),
            detail: (
              <d.ModalContent
                {...props}
                onSubmit={onSubmit}
                disabled={disabled}
                addToStorage={addToStorage}
                removeFromStorage={removeFromStorage}
                key={d.type}
                activityUserview={!!activityUserview}
                toggleUserview={(us: boolean): void => {
                  updateQuery({activityUserview: us});
                }}
                activity={activity}
                onChange={(value: unknown): void => {
                  onChange({key, label, value, type: d.type});
                }}
              />
            )
          }))}
        </GridSelect>
      </div>
      {selectedKey && (
        <div className="flex w-full mt-auto">
          <button
            type="button"
            className="btn p-2 flex-grow border-2"
            onClick={(): void =>
              setQuery({
                selectedKey: undefined,
                activityUserview: false
              })
            }>
            Back
          </button>
          <button
            type="button"
            className="btn p-2 bg-green-500 border-2 text-white flex-grow"
            onClick={(): void => modalProps.onClose()}>
            {activityType === selectedKey
              ? 'Update Activity'
              : 'Add Activity'}
          </button>
        </div>
      )}
    </ModalBody>
  );
};

// const BookWidgetNonAuth = props => {
//   const {activity} = props;
//   const nonAuthUrl = activity.value.url.replace('lti/', '');
//   return (
//     <iframe
//       title="nonAuthBookwidgetIframe"
//       src={nonAuthUrl}
//       className="flex-grow"
//     />
//   );
// };

const PureView: React.FC<{activity: Activity}> = props => {
  const {activity} = props;
  if (!activity.value) return <div>err</div>;

  const t = activity.type;
  if (!t) return null;
  const ActivityComp = activityComps[t].View;

  return <ActivityComp {...props} />;
};

export const View: React.FC<{
  activity: Activity;
  modalProps: ModalProps;
}> = props => {
  const {activity, modalProps} = props;

  return (
    <ModalBody
      title={activity.value && activity.value.title}
      {...modalProps}
      className="flex-grow overflow-y-auto">
      <PureView {...props} />
    </ModalBody>
  );
};
interface ModalContentType extends Match {
  disabled: boolean;
  activity: Activity;
  modalProps: ModalProps;
  onChange: Function;
  onClose: Function;
  activitySubmission: ActivitySubmission;
  authUser: AuthUser;
  addToStorage: Function;
  removeFromStorage: Function;
  id: string;
  addActivitySubmission: (a: any) => any;
  onSubmit: Function;
}

export const ModalContent: React.FC<ModalContentType> = props => {
  const {
    disabled,
    onChange,
    onClose,
    authUser,
    id,
    addActivitySubmission,
    activitySubmission,
    addToStorage,
    removeFromStorage,
    match,
    onSubmit
  } = props;
  return disabled ? (
    <View {...props} />
  ) : (
    <ActivityAuthor
      {...props}
      match={match}
      onSubmit={onSubmit}
      addToStorage={addToStorage}
      removeFromStorage={removeFromStorage}
      activitySubmission={activitySubmission}
      addActivitySubmission={addActivitySubmission}
      id={id}
      onChange={onChange}
      authUser={authUser}
      onClose={onClose}
    />
  );
};

export const Preview: React.FC<{
  activity: Activity;
  onClick: Function;
}> = ({activity, onClick}) => (
  <PreviewFrame
    placeholder="Activity"
    onClick={(): void => onClick()}
    type={label}
    empty={activity.value === null}
    content={() =>
      activity.value.title || <span className="italic">No Title</span>
    }
  />
);
