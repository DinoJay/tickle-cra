import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
// import chroma from 'chroma-js';
import ThreeDots from '~/components/utils/ThreeDots';
import ConnectedReviewCard from './index.jsx';
import ConnectedEditCard from '../ConnectedEditCard.jsx';

import CardFrame from '../CardFrame';
import ActivityDB from '~/firebase/db/activity_db';

export default function ReviewCard(props) {
  const {
    createCard,
    removeCard,
    onCardUpdate,
    onClose,
    flipped,
    onCreate,
    template,
    onFlip,
    fetchAuthorData,
    id,
    userEnvId
  } = props;

  const {params} = match;

  const [sub, setSub] = useState(null);
  useEffect(() => {
    const activityDb = ActivityDB(params.userEnvId);
    activityDb.getAllActivitySubs(id).then(s => setSub(s));
  });

  if (!sub)
    return (
      <CardFrame
        key={id}
        flipped={flipped}
        className="flex flex-col flex-grow"
        front={
          <div className="flex flex-col items-center justify-center w-full h-full">
            <ThreeDots />
          </div>
        }
      />
    );

  // TODO remove later
  return <ConnectedEditCard {...props} />;

  if (sub.length === 0) return <ConnectedEditCard {...props} />;
  if (sub.length > 0) return <ConnectedReviewCard {...props} />;
}
