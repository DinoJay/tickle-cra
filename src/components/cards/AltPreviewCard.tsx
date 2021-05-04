import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './PreviewCard.css';
import {motion} from 'framer-motion';
import HelpCircle from 'react-feather/dist/icons/help-circle';
import IcAk from '~/styles/alphabet_icons/ic_ak.svg';
import css from './PreviewCard.scss';
import {Img} from '~/constants/typeUtils';
// import {ImgField} from '~/constants/cardFields'

/**
 * PreviewCard component for CardSlide Show
 */

const PreviewCard: React.FC<{
  title?: string | null;
  topics?: string[];
  img?: Img | null;
  style?: React.CSSProperties;
  onClick?: Function;
  className: string;
}> = (props, ref) => {
  const {
    title,
    topics = [],
    img = null,
    style,
    onClick,
    className
  } = props;

  const bgSize = (): string => {
    if (!img || img.contain) return 'contain';
    return 'cover';
  };

  return (
    <motion.div
      positionTransition
      className={`${className} ${css.previewCard}`}
      style={{
        ...style
      }}
      ref={ref}
      onClick={(): void => onClick?.()}>
      <div
        className={`flex-grow flex flex-col relative ${!img &&
          'bg-yellow-500'}`}
        style={{
          backgroundImage: `url(${
            img ? img.thumbnail || img.url : null
          }) `,
          backgroundSize: bgSize(),
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}>
        <h2 className="z-10 m-1 pl-1 pr-1 px-1 text-sm break-words">
          <span className="bg-white">{title || 'No title'}</span>
        </h2>
        <div className="mt-auto flex flex-wrap">
          {Array.isArray(topics) &&
            topics.map(t => (
              <div className="tag-label m-1 text-xl bg-black text-white">
                i{t}
              </div>
            ))}
        </div>
        {!img && <HelpCircle className="flex-grow w-full" />}
      </div>
    </motion.div>
  );
};

export default PreviewCard;

// export const PreviewCardTemplate = ({className, style, onClick}) => (
//   <div
//     className={`${className} cursor-pointer relative p-1 overflow-hidden bg-white flex flex-col border-2 border-dashed border-black w-32 h-32`}
//     style={{...style}}
//     onClick={onClick}>
//     <h3>New Card</h3>
//     <div className="flex-grow flex flex-col items-center justify-center">
//       <div className="text-5xl">+</div>
//     </div>
//   </div>
// );
//
// export const PreviewCardSwitch = ({edit, ...props}) =>
//   edit ? (
//     <PreviewCardTemplate {...props} />
//   ) : (
//     <PreviewCard {...props} />
//   );
