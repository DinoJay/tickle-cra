import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import sortBy from 'lodash/sortBy';
import { motion, AnimatePresence } from 'framer-motion';
import MapIcon from 'react-feather/dist/icons/map';
import Layers from 'react-feather/dist/icons/layers';
import Plus from 'react-feather/dist/icons/plus';
import Minus from 'react-feather/dist/icons/minus';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import PreviewCard from '~/components/cards/PreviewCard';
import { Card } from '~/constants/cardFields';
import distanceLoc from '~/components/utils/distanceLoc';
import { avatarUrls } from '~/constants/avatars';
import { formatTime } from '~/components/utils/time';
import { Line, ArrowDown } from './LineArrow';
import SlideShow from './DiarySlideShow';

const LazyAnimation = ({ children, className }) => {
  const [ref, inView] = useInView({
    rootMargin: '-100px 0px'
  });
  const props = useSpring({ opacity: inView ? 1 : 0 });

  return (
    <animated.div ref={ref} style={props} className={className}>
      {children}
    </animated.div>
  );
};

const TopicRecommendations = ({
  id,
  cards,
  open,
  onCardClick,
  size,
  topics
}) => {
  const getCards = idd =>
    cards.filter(
      c => c.id !== id && !!c.topics.value?.find(t => t.id === idd)
    );

  return (
    <motion.div
      className="w-full overflow-hidden"
      animate={
        open
          ? { height: 'auto', opacity: 1 }
          : { height: 0, opacity: 0, display: 'none' }
      }
      transition={{ duration: 0.4 }}
      exit={{ height: 0 }}>
      <div className="flex flex-col items-center justify-center">
        <Line />
        <div className="">Topics</div>
        <ArrowDown className="" />
      </div>
      <div className="flex p-1 flex-col mt-1 w-full justify-center">
        {topics.map((d: any) => (
          <div className="flex justify-center flex-col w-full">
            <h3 className="text-base text-center">{d.title}</h3>
            {getCards(d.id).length !== 0 && (
              <SlideShow
                size={size}
                cards={getCards(d.id)}
                onCardClick={onCardClick}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const DistRecommendations = ({
  id,
  onClick,
  selected,
  allCards,
  location,
  open,
  size
}) => {
  const dists = allCards.map(c => ({
    ...c,
    dist: calcDist(c.loc.value, location)
  }));
  const cards = dists.filter(c => c.dist > 0 && c.dist < 1);

  return (
    <motion.div
      className="w-full"
      key={id}
      initial={{ opacity: 0 }}
      animate={
        open
          ? { opacity: 1, height: 'auto' }
          : { opacity: 0, height: 0, display: 'none' }
      }
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}>
      <div className="flex flex-col items-center justify-center">
        <Line />
        <div className="">Cards in proximity</div>

        <ArrowDown className="" />
      </div>
      <SlideShow cards={cards} size={size} />
    </motion.div>
  );
};

const calcDist = (loc0: any, loc1: any) =>
  +(distanceLoc(loc0, loc1) / 1000).toFixed(2);

const WP = props => {
  const {
    selected,
    onCardClick,
    title,
    img,
    topics,
    allCards,
    size
  } = props;
  const [ext, setExt] = useState<string | null>(null);

  const btnClass =
    'shadow-md ml-2 mt-1 flex justify-center items-center text-white rounded-full p-1';

  const TOPICS = 'topics';
  const DIST = 'dist';

  return (
    <motion.div
      layoutTransition
      className="flex flex-col items-center w-full">
      <motion.div layoutTransition className="relative">
        <PreviewCard
          detail={false}
          className="m-1 "
          onClick={() => { setExt(!ext ? null : ext) }}
          style={{
            minWidth: `${size}rem`,
            width: `${size}rem`,
            height: `${size}rem`,
            // minWidth: '5rem',
            // height: '5rem',
            transform: `scale(${selected ? 1.05 : 1})`,
            // transformOrigin: d.id === selectedCardId && null ,
            transition: 'transform 300ms'
          }}
          title={title}
          img={img}
        />
        <motion.div
          className="absolute right-0 top-0 flex flex-col justify-center h-full"
          style={{ transform: 'translate(100%)' }}>
          <button
            type="button"
            className={clsx(
              btnClass,
              ext === TOPICS ? 'bg-black' : 'bg-gray-500'
            )}
            onClick={() => setExt(ext !== 'topics' ? 'topics' : null)}>
            <Layers size={30} />
          </button>
          <button
            type="button"
            className={clsx(
              btnClass,
              ext === DIST ? 'bg-black' : 'bg-gray-500'
            )}
            onClick={() => setExt(ext !== 'dist' ? 'dist' : null)}>
            <MapIcon size={25} />
          </button>
        </motion.div>
      </motion.div>
      <DistRecommendations
        open={ext === DIST}
        {...props}
        cards={allCards}
        size={size}
        key="yeah"
      />
      <TopicRecommendations
        open={ext === TOPICS}
        {...props}
        cards={allCards}
        key="yeah1"
      />
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

  const createdDate = new Date(authUser.created);

  const waypoints = cards.map((c: any, i: number) => {
    const date1 =
      i !== cards.length - 1
        ? cards[i + 1].activitySubmission.date.toDate()
        : null;

    const date0 = c.activitySubmission.date.toDate();
    const distance = date1 ? Math.abs(date1 - date0) / 1000 : null;

    return {
      ...c,
      distance,
      date: date0,
      submissionDateStr: formatTime(date0)
    };
  });

  const userDistance = waypoints.length
    ? calcDist(userLocation, waypoints[0].loc.value)
    : null;

  const [size, setSize] = useState(7);
  const scale = scaleLinear()
    .domain(extent(waypoints as any[], d => d.distance))
    .range([60, 200 - 300 / size]);

  // console.log
  // const cropLineHeight = (distance: number) => {
  //   const dist = distance / 100000;
  //
  //   const ret = Math.max(100, dist);
  //   console.log('height', ret, 'distnce', distance);
  //   return ret;
  // };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="w-full flex-grow flex flex-col items-center overflow-y-auto">
      <div className="absolute left-0">
        <button type="button" onClick={() => setSize(size + 1)}>
          <Plus />
        </button>
        <button type="button" onClick={() => setSize(size - 1)}>
          <Minus />
        </button>
      </div>
      {cards.length === 0 && <div>No Cards</div>}
      {cards.length > 0 && (
        <>
          <img
            className="shadow-lg"
            style={{ width: `${size}rem`, minHeight: `${size}rem` }}
            alt="usr"
            src={avatarUrls[authUser.avatar]}
          />
          <motion.div
            positionTransition
            className="flex flex-col items-center">
            <Line />
            <div className="">25/10/2019</div>
            <ArrowDown />
          </motion.div>
        </>
      )}

      {waypoints.map((d: any) => (
        <div key={d.id} className="w-full">
          <WP
            {...props}
            size={size}
            onCardClick={onCardClick}
            selected={d.id === selectedCardId}
            topics={d.topics?.value || []}
            title={d.title?.value}
            location={d.loc.value}
            id={d.id}
            img={d.img?.value}
          />
          {d.distance && (
            <motion.div
              exit={{ opacity: 0 }}
              layoutTransition
              key={`${d.id}kas`}
              className="flex flex-col items-center ">
              <Line height={scale(d.distance) / 2} />
              <div className="">{d.submissionDateStr}</div>
              <ArrowDown height={scale(d.distance) / 2} />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default CardTimeLine;
