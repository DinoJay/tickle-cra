import React from 'react';
import clsx from 'clsx';
import {wpTypes} from './Waypoints';

export const AttractionIcon: React.FC<{
  title?: string;
  className?: string;
}> = props => {
  const {title, className} = props;
  return (
    <div className={className}>
      {title && (
        <div className={clsx('absolute -ml-4 font-bold')}>{title}</div>
      )}
      <div className="bg-black w-8 h-8 flex flex-col justify-center items-center rounded-full font-bold text-white border-2 border-black">
        <svg
          version="1.1"
          id="attraction-15"
          xmlns="http://www.w3.org/2000/svg"
          width="15px"
          height="15px"
          viewBox="0 0 15 15">
          <path
            fill="white"
            id="rect7143"
            d="M6,2C5.446,2,5.2478,2.5045,5,3L4.5,4h-2C1.669,4,1,4.669,1,5.5v5C1,11.331,1.669,12,2.5,12h10&#xA;&#x9;c0.831,0,1.5-0.669,1.5-1.5v-5C14,4.669,13.331,4,12.5,4h-2L10,3C9.75,2.5,9.554,2,9,2H6z M2.5,5C2.7761,5,3,5.2239,3,5.5&#xA;&#x9;S2.7761,6,2.5,6S2,5.7761,2,5.5S2.2239,5,2.5,5z M7.5,5c1.6569,0,3,1.3431,3,3s-1.3431,3-3,3s-3-1.3431-3-3S5.8431,5,7.5,5z&#xA;&#x9; M7.5,6.5C6.6716,6.5,6,7.1716,6,8l0,0c0,0.8284,0.6716,1.5,1.5,1.5l0,0C8.3284,9.5,9,8.8284,9,8l0,0C9,7.1716,8.3284,6.5,7.5,6.5&#xA;&#x9;L7.5,6.5z"
          />
        </svg>
      </div>
    </div>
  );
};

export const StarIcon: React.FC<{
  title?: string;
  className?: string;
}> = props => {
  const {title, className} = props;
  return (
    <div className={className}>
      {title && (
        <div className={clsx('absolute -ml-4 font-bold')}>{title}</div>
      )}
      <div
        className={clsx(
          'bg-black w-8 h-8 flex flex-col justify-center items-center rounded-full font-bold text-white border-2 border-black'
        )}>
        <svg viewBox="0 0 15 15" height="15" width="15">
          <title>star-15.svg</title>
          <rect fill="none" x="0" y="0" width="15" height="15" />
          <path
            fill="white"
            transform="translate(0 0)"
            d="M7.5,0l-2,5h-5l4,3.5l-2,6l5-3.5
	l5,3.5l-2-6l4-3.5h-5L7.5,0z"
          />
        </svg>
      </div>
    </div>
  );
};

export const FootballIcon: React.FC<{
  title?: string;
  className?: string;
}> = props => {
  const {title, className} = props;
  return (
    <div className={className}>
      {title && (
        <div className={clsx('absolute ml-8 font-bold')}>{title}</div>
      )}
      <div
        className={clsx(
          'bg-black w-8 h-8 flex flex-col justify-center items-center rounded-full font-bold text-white border-2 border-black',
          className
        )}>
        <svg viewBox="0 0 15 15" height="15" width="15">
          <title>star-15.svg</title>
          <rect fill="none" x="0" y="0" width="15" height="15" />
          <path
            fill="white"
            transform="translate(0 0)"
            d="M7.5,0l-2,5h-5l4,3.5l-2,6l5-3.5
	l5,3.5l-2-6l4-3.5h-5L7.5,0z"
          />
        </svg>
      </div>
    </div>
  );
};

export const MusicIcon: React.FC<{
  title?: string;
  className?: string;
}> = props => {
  const {title, className} = props;
  return (
    <div className={className}>
      {title && (
        <div className={clsx('absolute ml-8 font-bold')}>{title}</div>
      )}
      <div
        className={clsx(
          'bg-black w-8 h-8 flex flex-col justify-center items-center rounded-full font-bold text-white border-2 border-black'
        )}>
        <svg viewBox="0 0 15 15" height="15" width="15">
          <title>music-15.svg</title>
          <rect fill="none" x="0" y="0" width="15" height="15" />
          <path
            fill="white"
            transform="translate(0 0)"
            d="M13.5,1c-0.0804,0.0008-0.1594,0.0214-0.23,0.06L4.5,3.5C4.2239,3.5,4,3.7239,4,4v6.28C3.6971,10.1002,3.3522,10.0037,3,10
	c-1.1046,0-2,0.8954-2,2s0.8954,2,2,2s2-0.8954,2-2V7.36l8-2.22v3.64c-0.3029-0.1798-0.6478-0.2763-1-0.28c-1.1046,0-2,0.8954-2,2
	s0.8954,2,2,2s2-0.8954,2-2v-9C14,1.2239,13.7761,1,13.5,1z M13,4.14L5,6.36v-2l8-2.22C13,2.14,13,4.14,13,4.14z"
          />
        </svg>
      </div>
    </div>
  );
};
export const AnimalIcon: React.FC<{
  title?: string;
  className?: string;
}> = props => {
  const {title, className} = props;
  return (
    <div className={clsx(className, 'relative')}>
      {title && (
        <div className={clsx('absolute -ml-4 font-bold')}>{title}</div>
      )}
      <div
        className={clsx(
          'bg-black w-8 h-8 flex flex-col justify-center items-center rounded-full font-bold text-white border-2 border-black',
          className
        )}>
        <svg viewBox="0 0 15 15" height="15" width="15">
          <title>zoo-15.svg</title>
          <rect fill="none" x="0" y="0" width="15" height="15" />
          <path
            fill="white"
            transform="translate(0 0)"
            d="
	M8.3879,3.8928C8.3879,3.8928,7.6818,5,7,5H4.5C3.8182,5,3.2016,5.4086,2.7273,5.8636L0.5,8C0.231,8.258,0.0072,8.7681,0,9
	c-0.0156,0.5,0,1,0,1s1,0,1-1V8.5l1-1h0.5l0.158,0.2892c0,0-0.9535,1.8244-0.9535,3.5289C1.7046,12,2.3864,12,2.3864,12h0.6818
	c0,0,0.3409,0,0-0.3409l-0.3409-0.3409C2.7273,10.6364,3.5002,9.6667,4,9c0,0,0.0168,1.1579,0,2c-0.008,0.4096,0.2721,1,0.6818,1
	h0.6818c0,0,0.3409,0,0-0.3409l-0.3409-0.3409C4.7105,10.7495,5.5,8.5,5.5,8.5C6.7716,8.5,7,9,8.5,9l0.3636,2.3182
	C8.975,12.0282,9.5,12,9.5,12H11c0.3409,0,0.9611-0.3115,0.3409-0.7736L11,11V9c1.2142-0.1722,2-1,2-2h1c0.3214,0,1,0,1-0.5v-1
	l-1.7045-1.6818C12.5444,3.0772,12,2.5,11,2.5C9.5469,2.5,8.8636,3.0688,8.3879,3.8928z"
          />
        </svg>
      </div>
    </div>
  );
};

export const DefaultIcon: React.FC<{
  title?: string;
  className?: string;
}> = props => {
  const {title, className} = props;
  return (
    <div
      className={clsx(
        'bg-black w-8 h-8 flex flex-col justify-center items-center rounded-full font-bold text-white border-2 border-black',
        className
      )}>
      <div className={clsx('font-bold text-white')}>{title}</div>
    </div>
  );
};

const allIcons = [AttractionIcon, StarIcon, AnimalIcon, DefaultIcon];

export default wpTypes.map((d, i) => ({key: d, Icon: allIcons[i]}));
