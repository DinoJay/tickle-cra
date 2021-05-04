import React from 'react';
import { screens } from 'Tailwind';
import tickleSrc from '~/styles/alt_tickle_icon.svg';
import DefaultLayout from '~/components/DefaultLayout';

import useWindowSize from '~/components/utils/useWindowSize';

import css from './LogoWobble.scss';

const Wobbler: React.FC<{ height: number }> = props => {
  const { height } = props;
  const { width } = useWindowSize();
  return (
    <DefaultLayout>
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ height: (width || 0) > screens.md ? '100%' : height }}>
        <div>
          <div
            className={`mb-6 mt-4 sm:mt-6 md:mt-12 w-full flex-grow ${css.wobble
              }`}
            style={{
              // height: 300,
              background: `url(${tickleSrc}) `,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Wobbler;
