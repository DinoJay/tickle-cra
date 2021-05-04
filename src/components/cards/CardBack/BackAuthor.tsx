import React, { useEffect, useState } from 'react';

import PreviewCard from '~/components/cards/PreviewCard';

import makeAbort from '~/components/utils/abortPromise';

import { doReadDetailUser } from '~/firebase/db/user_db';

import { Card } from '~/constants/cardFields';
import { ExtendedUser } from '~/constants/userFields';
import { Img } from '~/constants/typeUtils';

/**
 * Component for author profile on the back of the card
 */
const AuthorDetails: React.FC<{
  style?: React.CSSProperties; // skills,
  className?: string;
  collectedCards: Card[];
  createdCards: Card[];
}> = ({
  style, // skills,
  className,
  createdCards
}) => (
      <div className={`${className} flex flex-col`} style={{ ...style }}>
        <div className="flex-shrink-0 mb-3">
          <h2 className="mb-1">Top Interests</h2>
          <div className="flex w-full flex-wrap">
            {['football', 'sports'].map(d => (
              <div
                className="text-xl capitalize bg-black tag-label
              bg-black m-1">
                {d}
              </div>
            ))}
          </div>
        </div>
        <h2 className="mb-1">Top Cards</h2>
        <div className="flex flex-wrap relative" style={{}}>
          {createdCards.slice(0, 4).map((d: Card) => (
            <PreviewCard
              detail={false}
              title={(d.title && d.title.value) || undefined}
              img={(d.img && d.img.value) || undefined}
              className="m-1 p-2"
              style={{ flex: '0 0 100px', height: 130 }}
            />
          ))}
        </div>
      </div>
    );

const AuthorPreview: React.FC<{
  className?: string;
  img: Img;
  style: React.CSSProperties;
  username: string;
}> = props => {
  const { className, img, style, username } = props;
  return (
    <div
      className={className}
      style={{
        ...style
      }}>
      <img
        className="absolute h-full w-full"
        src={img && img.url}
        alt="alt"
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute m-3">
        <h2 className="tag-label bg-black">{username}</h2>
      </div>
    </div>
  );
};

const BackAuthor: React.FC<{
  extended: boolean;
  style?: React.CSSProperties;
  userInfo: ExtendedUser | null;
}> = props => {
  const { extended, style, userInfo } = props;
  const {
    createdCards = null,
    collectedCards = null,
    img = null,
    username = null
  } = userInfo || {};

  const info = createdCards && collectedCards && img && username && (
    <>
      <AuthorPreview
        img={img}
        username={username}
        className="flex flex-col relative flex-shrink-0"
        style={{ flexGrow: 10 }}
      />
      {extended && (
        <AuthorDetails
          className="flex-grow flex flex-col relative p-1"
          createdCards={createdCards}
          collectedCards={collectedCards}
        />
      )}
    </>
  );

  return (
    <div
      className="flex flex-grow flex-col justify-center overflow-y-auto"
      style={style}>
      {info}
    </div>
  );
};

/**
 * Component to wrap data fetching for author profile
 */
const BackAuthorWrapper: React.FC<{
  uid: string;
  style?: React.CSSProperties;
  extended: boolean;
}> = props => {
  const { uid, extended, style } = props;
  const [userInfo, setUserInfo] = useState<ExtendedUser | null>(null);

  useEffect(() => {
    const authorDataPromise = makeAbort(
      doReadDetailUser(uid).then(authorInfo => {
        setUserInfo(authorInfo);
      })
    );
    return (): void => authorDataPromise.cancel();
  }, []);

  return (
    <BackAuthor extended={extended} userInfo={userInfo} style={style} />
  );
};
export default BackAuthorWrapper;
