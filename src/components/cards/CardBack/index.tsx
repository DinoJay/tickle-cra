import React, {useState} from 'react';

import Minimize from 'react-feather/dist/icons/minimize';
import Maximize from 'react-feather/dist/icons/maximize';

import CardControls from '~/components/cards/CardControls';
import Comments from './Comments';
import RelatedTags from './RelatedTags';
import BackAuthor from './BackAuthor';
import AuthUser from '~/constants/authUserType';
import Topic from '~/constants/topicType';
import {Card} from '~/constants/cardFields';

const BackField: React.FC<{
  onClick: Function;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  extended: boolean;
}> = ({onClick, style, className, children, extended}) => (
  <div
    className={`overflow-hidden relative flex flex-col ${className}`}
    style={{
      ...style
    }}>
    <div
      className="mb-1 z-10 absolute flex-grow flex justify-end items-center"
      style={{right: 0}}>
      <button
        type="button"
        className="btn bg-white m-2 p-1"
        onClick={(): void => onClick()}>
        {extended ? <Minimize /> : <Maximize />}
      </button>
    </div>
    {children}
  </div>
);

const CardBack: React.FC<{
  onFlip: Function;
  id: string;
  uid: string;
  onClose: Function;
  className?: Function;
  addComment: Function;
  userEnvId: string;
  authUser: AuthUser;
  cards: Card[];
  topicDict: Topic[];
  controls?: React.ReactNode;
}> = props => {
  const {
    onFlip,
    id: cardId,
    uid,
    onClose,
    className,
    addComment,
    authUser,
    controls,
    cards,
    topicDict, userEnvId
  } = props;

  const [extended, setExtended] = useState<string | null>(null);

  const selectField = (field: string): void => {
    setExtended(prevExtended =>
      prevExtended !== field ? field : null
    );
  };

  const isExtended = (field: string): boolean =>
    extended === field && extended !== null;

  const displayStyle = (field: string): React.CSSProperties => {
    const flexStyle = (): string => {
      if (extended === null) return '0 10 33%';
      return extended === field ? '1 0 0%' : '0 10 0%';
    };
    return {
      transition: 'flex 300ms',
      flex: flexStyle()
      // overflow: fieldExtended ? 'scroll' : 'hidden'
    };
  };

  return (
    <div className={`flex flex-col flex-grow ${className}`}>
      <div className="flex-grow m-2 relative">
        <div className="absolute h-full w-full flex flex-col  ">
          <BackField
            className="mb-2"
            style={displayStyle('author')}
            extended={isExtended('author')}
            onClick={(): void => selectField('author')}>
            <BackAuthor
              uid={uid}
              {...props}
              extended={extended === 'author'}
            />
          </BackField>
          <BackField
            className="mb-2"
            extended={isExtended('tags')}
            style={displayStyle('tags')}
            onClick={(): void => selectField('tags')}>
            <RelatedTags cards={cards} topicDict={topicDict} />
          </BackField>
          <BackField
            className="relative"
            extended={isExtended('comments')}
            onClick={(): void => selectField('comments')}
            style={displayStyle('comments')}>
            <Comments
              userEnvId={userEnvId}
              author={authUser}
              cardId={cardId}
              extended={isExtended('comments')}
              addComment={addComment}
            />
          </BackField>
        </div>
      </div>
      <CardControls
        onFlip={onFlip}
        onClose={onClose}
        style={{width: '100%', flexShrink: 0}}>
        {controls ? controls:null}
      </CardControls>
    </div>
  );
};
export default CardBack;
