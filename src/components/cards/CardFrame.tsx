import React from 'react';

import Flipper from '~/components/utils/Flipper';

// import debounce from 'lodash/debounce';

const CardFrame: React.FC<{
  front: React.ReactNode;
  back: React.ReactNode;
  className: string;
  flipped: boolean;
}> = props => {
  const {front, back} = props;
  const className =
    'bg-white border-4 border-black flex flex-col flex-grow';

  return (
    <Flipper
      className="flex flex-col flex-grow"
      frontClassName={`${className}`}
      backClassName={className}
      front={front}
      back={back}
      {...props}
    />
  );
};

export default CardFrame;
