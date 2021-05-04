import React from 'react';
import PropTypes from 'prop-types';

import ConnectedCard from './ConnectedCard';

import ConnectedEditCard from './ConnectedEditCard';

const MetaCard = props => {
  const {edit, completed} = props;

  if (edit) return <ConnectedEditCard {...props} key={props.id}/>;
  if (completed) return <ConnectedReviewCard {...props} />;
  return <ConnectedCard {...props} />;
};

export default MetaCard;
