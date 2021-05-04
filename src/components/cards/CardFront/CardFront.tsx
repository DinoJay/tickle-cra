import React, { useState } from 'react';
import Eye from 'react-feather/dist/icons/eye-off';
import clsx from 'clsx';

import HelpIcon from 'react-feather/dist/icons/help-circle';
import Clock from 'react-feather/dist/icons/clock';
import ArrowLeft from 'react-feather/dist/icons/arrow-left';
import ArrowRight from 'react-feather/dist/icons/arrow-right';
import { theme } from 'Tailwind';
import CardControls from '~/components/cards/CardControls';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import IcAk from '~/styles/alphabet_icons/ic_ak.svg';
import { Card, mediaScale, ACTIVITY } from '~/constants/cardFields';
import Topic from '~/constants/topicType';
import { RouterTypes } from '~/constants/typeUtils';

import { RightTriangleUpBtn } from '~/components/utils/RightTriangleBtn';
import { LeftTriangleUpBtn } from '~/components/utils/LeftTriangleBtn';

export const ImgOverlay: React.FC<{
  src: string | null;
  className: string;
  style: React.CSSProperties;
  onClick?: Function;
  onLeftClick?: Function;
  onRightClick?: Function;
  contain: boolean;
}> = ({
  src,
  className,
  style,
  onClick,
  onLeftClick,
  onRightClick,
  contain
}) => (
      <button
        type="button"
        onClick={(): void => onClick?.()}
        className={`${className} h-full w-full mx-auto relative overflow-hidden`}
        style={{
          ...style
        }}>
        {onRightClick && (
          <RightTriangleUpBtn
            className="absolute right-0"
            onClick={onRightClick}>
            <ArrowRight color="white" size="40" />
          </RightTriangleUpBtn>
        )}
        {onLeftClick && (
          <LeftTriangleUpBtn
            className="absolute left-0"
            onClick={onLeftClick}>
            <ArrowLeft color="white" size="40" />
          </LeftTriangleUpBtn>
        )}
        {src ? (
          <img
            className="h-full w-full"
            src={src}
            alt="Card img"
            style={{
              objectFit: contain ? 'contain' : 'cover'
            }}
          />
        ) : (
            <div className="w-full h-full p-8">
              <img className="w-full h-full" src={IcAk} alt="logo" />
            </div>
          )}
      </button>
    );

const { colors } = theme;

export const TextField: React.FC<{
  onClick: Function;
  extended: boolean;
  className?: string;
  style?: React.CSSProperties;
  value: string;
}> = ({ onClick, extended, className, style, value }) => (
  <div
    className={`${className}`}
    style={{
      ...style,
      cursor: 'pointer',
      transition: 'all 800ms',
      whiteSpace: 'pre-wrap'
    }}
    onClick={(): void => onClick()}>
    <div
      className={clsx(
        'mr-1 flex-shrink sm:leading-tight flex-shrink'
        // 'overflow-y-auto'
      )}>
      <p
        className={clsx(!extended ? 'h-full' : 'h-full')}
        style={{ transition: 'height 400ms' }}>
        {value}
      </p>
    </div>
  </div>
);

const createIcon: React.FC<string> = type =>
  React.createElement(type, {
    style: { color: 'black' },
    color: colors.black,
    width: 50,
    height: 50
  });

const CardFieldIcons: React.FC<Card> = props => {
  const {
    videos,
    img,
    // description,
    hyperlinks,
    setKey,
    loc,
    dateTime,
    className
  } = props;

  const cls =
    'mr-1 flex items-center cursor-pointer p-1 m-1 flex-shrink';

  const imgIcon =
    img && img.value ? (
      <button
        onClick={(): void => setKey(img.key)}
        type="button"
        className={cls}>
        {createIcon(mediaScale(img.key))}
      </button>
    ) : null;

  const vid =
    videos && videos.value ? (
      <button
        type="button"
        className={cls}
        onClick={(): void => setKey(videos.key)}>
        {createIcon(mediaScale(videos.key))}
      </button>
    ) : null;

  // const descr =
  //   description && description.value ? (
  //     <button
  //       type="button"
  //       className={cls}
  //       onClick={(): void => setKey(description.key)}>
  //       {createIcon(mediaScale(description.key))}
  //     </button>
  //   ) : null;

  const links =
    hyperlinks && hyperlinks.value ? (
      <button
        type="button"
        className={cls}
        onClick={(): void => setKey(hyperlinks.key)}>
        {createIcon(mediaScale(hyperlinks.key))}
      </button>
    ) : null;

  const locIcon =
    loc.value && loc.key ? (
      <button
        type="button"
        className={cls}
        onClick={(): void => setKey(loc.key)}>
        {createIcon(mediaScale(loc.key))}
      </button>
    ) : null;

  const dateTimeKey = dateTime && dateTime.key;
  const dateTimeIcon =
    dateTime && dateTime.value && dateTimeKey ? (
      <button
        type="button"
        className={cls}
        onClick={(): void => setKey(dateTimeKey)}>
        {createIcon(Clock)}
      </button>
    ) : null;

  return (
    <div className={className}>
      {locIcon}
      {imgIcon}
      {vid}
      {links}
      {dateTimeIcon}
    </div>
  );
};

const TopicField: React.FC<{
  values: Topic[];
  className?: string;
  style?: React.CSSProperties;
  onClick?: Function;
}> = ({ values, className, style, onClick }) => {
  if (values.length === 0) return null;
  return (
    <div
      onClick={(): void => onClick && onClick()}
      className={`flex ${className} flex-wrap items-center flex-grow `}
      style={{ ...style }}>
      {values.map(t => (
        <div className="tag-label bg-black text-white mr-1 mb-1 ">
          {t.title}
          <span className="bg-white text-black rounded-full ml-1 px-1">
            {t.points}
          </span>
        </div>
      ))}
    </div>
  );
};

export const TitleField: React.FC<{
  onClick: Function;
  className?: string;
  value: string;
  style?: React.CSSProperties;
}> = ({ onClick, className, value, style }) => {
  if (!value) return null;
  return (
    <button
      type="button"
      onClick={(): void => onClick()}
      style={style}
      className={`text-muted break-words ${className}`}>
      <h1>{value}</h1>
    </button>
  );
};

interface CardFrontInterface extends Card, RouterTypes {
  style: React.CSSProperties;
  onClose: Function;
  onTitleClick?: Function;
  onFlip: Function;
  className?: string;
  setDialogKey: Function;
  onHelpClick?: Function;
  addActivitySubmission: Function;
  toggleUserview: Function;
}
const CardFront: React.FC<CardFrontInterface> = props => {
  const {
    title,
    topics,
    img,
    description,
    style,
    onClose,
    onTitleClick,
    onFlip,
    className,
    setDialogKey,
    onHelpClick,
    activity,
    id,
    addActivitySubmission,
    activitySubmission,
    toggleUserview,
    match,
    superAdmin,
    authUser,
    asyncRemoveActivitySub
  } = props;

  const {
    params: { userEnvId }
  } = match;
  // TODO fix later
  // TODO fix later
  // TODO fix later
  // TODO fix later
  // TODO fix later
  // TODO fix later
  const topicValues: Topic[] =
    topics && Array.isArray(topics.value) ? topics.value : [];

  const [modal, setModal] = useState<boolean | null>(null);

  const btnCls =
    'btn flex sm:text-base md:text-xl lg:text-2xl xl:text-2xl p-2 text-white p-1 items-center ';

  const activityBtn = (): React.ReactNode => {
    const text = (): string => {
      if (
        activitySubmission &&
        !activitySubmission.succeeded &&
        activitySubmission.completed
      )
        return 'failed';
      if (activitySubmission && activitySubmission.succeeded)
        return 'Collected';
      if (activitySubmission && activitySubmission.completed)
        return 'submitted';
      if (
        activitySubmission &&
        !activitySubmission.completed &&
        !activitySubmission.succeeded
      )
        return 'started';
      if (!activity) return 'Start';
      return 'Start';
    };

    if (activitySubmission)
      return (
        <>
          <button
            type="button"
            disabled={activitySubmission.succeeded}
            className={clsx(
              `btn border-2 border-black`,
              activitySubmission.succeeded
                ? 'bg-green-500'
                : 'bg-yellow-500',
              btnCls,
              activitySubmission.succeeded && 'disabled'
            )}
            onClick={() => {
              setDialogKey(ACTIVITY);
            }}>
            <div className="flex items-center" />
            {text()}
          </button>
          <div
            className={clsx(
              !superAdmin && 'hidden',
              'flex items-center'
            )}>
            <button
              type="button"
              onClick={() =>
                asyncRemoveActivitySub({
                  uid: authUser.uid,
                  id,
                  userEnvId
                })
              }
              className={clsx('btn ml-3 border-2 p-3')}>
              Remove Sub.
            </button>
          </div>
        </>
      );

    if (activity && activity.value)
      return (
        <button
          type="button"
          className={`${btnCls} bg-black items-center`}
          onClick={(): void => {
            setDialogKey(ACTIVITY);
            // TODO check later
            addActivitySubmission({ id }, userEnvId);
          }}>
          <div className="flex items-center">
            <span className="">Challenge</span>
          </div>
        </button>
      );

    return (
      !activity ||
      (!activity.value && (
        <button
          type="button"
          className={`bg-black ${btnCls}`}
          onClick={(): void => {
            addActivitySubmission({ id, succeeded: true }, userEnvId);
            setModal(true);
          }}>
          <div className="flex items-center">
            <span>Collect</span>
            <span className="ml-1 text-xl">😯</span>
          </div>
        </button>
      ))
    );
  };

  const [extDescr, setExtDescr] = useState(false);

  return (
    <div
      style={{ ...style }}
      className={`flex flex-col w-full h-full ${className}`}>
      <ImgOverlay
        {...props}
        style={{
          flex: `0 ${extDescr ? 1 : 0} ${extDescr ? 20 : 50}%`,
          transition: 'flex 400ms'
        }}
        className="flex-grow "
        contain={!!img && !!img.value && !!img.value.contain}
        src={img && img.value ? img.value.url : null}
      />
      <div className="flex-grow flex mt-3 mr-3 ml-3 mb-1 min-h-0 justify-between">
        <div className="overflow-y-auto">
          <TitleField
            onClick={(): void => onTitleClick && onTitleClick()}
            value={title && title.value ? title.value : 'No Title'}
          />
          <TopicField values={topicValues} className="my-1" />
          {description && description.value && (
            <TextField
              style={{ gridRow: 3 }}
              onClick={(): void => setExtDescr(!extDescr)}
              extended={extDescr}
              value={description.value}
            />
          )}
        </div>
        <CardFieldIcons
          {...props}
          className="overflow-y-auto flex-shrink-0"
          setKey={setDialogKey}
        />
      </div>
      <CardControls
        className="flex-shrink-0"
        onFlip={onFlip}
        onClose={onClose}>
        <div className="flex mb-2 ">
          <div className="flex">
            {activityBtn()}
            {onHelpClick && (
              <button
                onClick={(): void => onHelpClick()}
                className="hidden flex-grow border-2 border-black flex items-center justify-center flex-col w-10"
                type="button">
                <HelpIcon className="m-1" />
              </button>
            )}
          </div>

          {toggleUserview && (
            <button
              type="button"
              className="btn border-2 m-2 p-2"
              onClick={(): void => toggleUserview()}>
              <Eye />
            </button>
          )}
        </div>
      </CardControls>
      <BlackModal
        visible={modal !== null}
        background={false}
        className="md:my-3"
        zIndex={200}>
        <ModalBody
          className="flex justify-center"
          title="Collect Card"
          onClose={(): void => {
            setModal(null);
            onClose();
          }}>
          <h1>Success!!!</h1>
        </ModalBody>
      </BlackModal>
    </div>
  );
};
export default CardFront;
