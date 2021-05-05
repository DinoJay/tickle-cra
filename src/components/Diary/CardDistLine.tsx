import React, { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Layers from 'react-feather/dist/icons/layers';
import PreviewCard from '~/components/cards/PreviewCard';
import { Card } from '~/constants/cardFields';
import distanceLoc from '~/components/utils/distanceLoc';
import { avatarUrls } from '~/constants/avatars';

import PreviewTag from '~/components/utils/PreviewTag';
import { Line, ArrowDown } from './LineArrow';
import SlideShow from './DiarySlideShow';

const WP = props => {
  const { selected, cards, id, onCardClick, title, img, topics } = props;
  const [ext, setExt] = useState(false);

  const getCards = idd =>
    cards.filter(
      c => c.id !== id && !!c.topics.value?.find(t => t.id === idd)
    );

  return (
    <motion.div
      layoutTransition
      className="flex flex-col justify-center items-center w-full">
      <div className="relative">
        <PreviewCard
          detail={false}
          onClick={() => onCardClick(id)}
          key={title}
          className="preview-card-size m-1 "
          style={{
            transform: `scale(${selected ? 1.05 : 1})`,
            // transformOrigin: d.id === selectedCardId && null ,
            transition: 'transform 300ms'
          }}
          title={title}
          img={img}
        />
        <div
          className="absolute flex items-center right-0 top-0 h-full"
          style={{ transform: 'translate(100%)' }}>
          <button
            type="button"
            onClick={() => setExt(!ext)}
            className={clsx(
              'btn rounded-full p-1 bottom-0 right-0 z-10 m-2',
              !ext ? 'bg-gray-500' : 'bg-black'
            )}>
            <Layers className="text-white" size={30} />
          </button>
        </div>
      </div>
      {ext && topics.length !== 0 && (
        <>
          <div className="flex flex-col items-center justify-center">
            <Line />
            <div className="">Topics</div>
            <ArrowDown className="" />
          </div>
          <div className=" flex p-1 bg-gray-300 w-full justify-center">
            {topics.map((d: any) => (
              <div className="flex justify-center flex-col">
                <h3 className="text-base text-center">{d.title}</h3>
                {getCards(d.id).length !== 0 && (
                  <SlideShow
                    cards={getCards(d.id)}
                    onCardClick={onCardClick}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

const CardTimeLine: React.FC<any> = props => {
  const {
    cards,
    onCardClick,
    selectedCardId,
    authUser,
    userLocation
  } = props;

  const calcDist = (loc0, loc1) =>
    Math.round(distanceLoc(loc0, loc1) / 1000).toFixed(2);

  const waypoints = cards.map((c: any, i: number) => {
    const loc1 = i !== cards.length - 1 ? cards[i + 1].loc.value : null;
    const loc0 = c.loc.value;

    const distance = loc1 ? calcDist(loc0, loc1) : null;

    return { ...c, distance };
  });

  const userDistance = waypoints.length
    ? calcDist(userLocation, waypoints[0].loc.value)
    : null;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="flex-grow flex flex-col items-center">
      {!cards.length && <div>No Cards</div>}
      <img
        className="w-32"
        alt="usr"
        src={avatarUrls[authUser.avatar]}
      />
      <motion.div layoutTransition className="">
        <Line />
        <div className="w-0">{userDistance}km</div>
        <ArrowDown />
      </motion.div>
      {waypoints.map((d: any) => (
        <>
          <WP
            {...props}
            key={d.id}
            onCardClick={onCardClick}
            selected={d.id === selectedCardId}
            id={d.id}
            title={d.title?.value}
            topics={d.topics?.value || []}
            img={d.img?.value}
          />
          {d.distance && (
            <motion.div layoutTransition className="">
              <Line />
              <div className="w-0">{d.distance}km</div>
              <ArrowDown
                height={Math.min(140, Math.max(40, d.distance / 10))}
              />
            </motion.div>
          )}
        </>
      ))}
    </motion.div>
  );
};

export default CardTimeLine;
