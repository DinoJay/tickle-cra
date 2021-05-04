import React, {useState, useEffect} from 'react';
import {timeFormat} from 'd3-time-format';
// import UserIcon from 'react-feather/dist/icons/user';
import uuidv1 from 'uuid/v1';
import Comment from '~/constants/commentType';
import {User} from '~/constants/userFields';

import CardDB from '~/firebase/db/card_db';
import {avatarUrls} from '~/constants/avatars';

/**
 * Component to fetch data for CommentList
 */
const CommentsWrapper: React.FC<{
  author: User;
  cardId: string;
  addComment: Function;
  extended: boolean;
  userEnvId: string;
}> = props => {
  const {author, cardId, extended, userEnvId} = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const {uid, username, avatar} = author;

  const db = CardDB(userEnvId);
  useEffect(() => {
    db.readComments(cardId).then(setComments);
  }, []);

  console.log('comments', comments);
  console.log('author', author);

  return (
    <CommentList
      extended={extended}
      data={comments.sort(
        (a: Comment, b: Comment) => +b.date - +a.date
      )}
      onAdd={(text: string): void => {
        db.addComment({cardId, uid, text, username, avatar}).then(
          (c: any) => console.log('comment added', c)
        );
        const comment = {
          id: uuidv1(),
          text,
          cardId,
          avatar,
          uid,
          username,
          date: new Date()
        };
        setComments([comment, ...comments]);
      }}
    />
  );
};

/**
 * List of Comments
 */
const CommentList: React.FC<{
  data: Comment[];
  // author: User;
  onAdd: Function;
  extended: boolean;
}> = ({data, onAdd, extended}) => (
  <div className="m-2 flex flex-col flex-grow flex-shrink">
    <div className="flex mb-2">
      <h2 className="tag-label bg-black">Comments</h2>
    </div>

    {data.length === 0 && <div className="tex-lg">No Comments</div>}
    <div className="mb-auto overflow-y-auto">
      {data.map(({...c}) => (
        <OneComment {...c} />
      ))}
    </div>
    {extended && <AddComment onClick={onAdd} />}
  </div>
);

/**
 * One single Comment
 */
const OneComment: React.FC<{
  text: string;
  username: string;
  avatar?: string;
  date: Date;
}> = props => {
  const {text, username, avatar = 'user1', date} = props;

  const formatTime = timeFormat('%B %d, %Y');

  return (
    <div className="flex items-center mb-2 pb-1 border-b">
      <div className="mr-2 border-black flex-col-wrapper justify-center">
        {avatar && (
          <img
            width="30"
            height="30"
            src={avatarUrls[avatar]}
            alt="alt"
          />
        )}
      </div>
      <div>
        <div className="mb-1">{text}</div>
        <div className="italic text-sm">
          {' '}
          <span className="font-bold">{username || 'user'}</span>
          {', '}
          {formatTime(date)}
        </div>
      </div>
    </div>
  );
};

const AddComment: React.FC<{onClick: Function}> = props => {
  const {onClick} = props;
  const [text, setText] = useState<string | null>(null);
  return (
    <div className="mt-5">
      <input
        className="mb-2 form-control mb-1 w-full border"
        placeholder="Write a comment"
        type="text"
        onChange={(e): void => setText(e.target.value)}
      />
      <button
        className="btn w-full border-2 p-2"
        type="button"
        disabled={text === null || text === ''}
        onClick={(): void => {
          onClick(text);
          setText(null);
        }}>
        Submit
      </button>
    </div>
  );
};

export default CommentsWrapper;
