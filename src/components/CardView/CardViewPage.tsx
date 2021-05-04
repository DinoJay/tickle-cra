import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { BooleanParam } from 'use-query-params';
import { motion, AnimatePresence } from 'framer-motion';

import ArrowDown from 'react-feather/dist/icons/arrow-down';
import X from 'react-feather/dist/icons/x';
import Plus from 'react-feather/dist/icons/plus';
import MapPin from 'react-feather/dist/icons/map-pin';
import Minus from 'react-feather/dist/icons/minus';
import ArrowUp from 'react-feather/dist/icons/arrow-up';
import Navigation from 'react-feather/dist/icons/navigation';
import AugmentedReality from './AugmentedReality';
import HelpModal from './AltHelpModal';

// import {userMove, setLocs} from '~/reducers/Map/actions';

import MapBoxDirections, {
  Route
} from '~/components/utils/MapBox/Directions/DirectionCreator';

import Topic from 'constants/topicType';

import {
  Card,
  TEMP_ID,
  activityFilterMap,
  activityFilterLabelMap
} from '~/constants/cardFields';
import DefaultLayout from '~/components/DefaultLayout';

import ConnectedCard from '~/components/cards/ConnectedCard';
// import ConnectedEditCard from '~/components/cards/ConnectedEditCard';
import { BlackModal, ModalBody } from '~/components/utils/Modal';
import usePrevious from '~/components/utils/usePrevious';
import MarkerElement from '~/components/utils/MapBox/MarkerElement';
import { avatars } from '~/constants/avatars';

// import SlideMenu from '~/components/utils/SlideMenu';
import { LngLat } from '~/constants/typeUtils';

import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import PreviewTag from '~/components/utils/PreviewTag';
import AlertModalBody from '~/components/Notifications/AlertModalBody';
import PreviewCard from '~/components/cards/PreviewCard';
import CardSlideShow from '~/components/CardSlideShow';

import css from './CardViewPage.scss';
import NavMenu from './NavMenu';
import NotifyMenu from './NotifyMenu';
import Compass from '~/components/utils/MapBox/Compass';

import { ROUTE } from '~/constants/mapFeats';

import Notification from '~/constants/notificationType';
import useRouteParams from '~/Routes/useRouteParams';

import RightTriangleBtn from '~/components/utils/RightTriangleBtn';
import LeftTriangleBtn from '~/components/utils/LeftTriangleBtn';

import MapBox, {
  Marker,
  Directions,
  shiftCenterMap
} from '~/components/utils/MapBox';

import DirectionSteps from '~/components/utils/MapBox/Directions/DirectionSteps';

import { doReadMapFeats } from '~/firebase/db/env_db';

// import useAddNotification from "./useAddNotification";
import SelectUserEnv from './SelectUserEnv';
import { firestore } from '~/firebase/firebase';

const variants = {
  enter: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: -100,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const PreviewCardHighlighter: React.FC<{
  selected: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = props => {
  const { selected, className, children, style } = props;

  return (
    <div
      className={`${className} flex-none ${selected && 'z-20'} `}
      style={{
        transform: `scale(${selected ? 1.1 : 1})`,
        transition: 'transform 300ms, width 200ms',
        ...style
      }}>
      {children}
    </div>
  );
};

const useInitData: Function = (props: any) => {
  const {
    fetchCollectibleCards,
    fetchAllNotifications,
    fetchHelpRequests,
    fetchTopics,
    uid,
    userEnvId,
    setRoute
  } = props;

  useEffect(() => {
    fetchCollectibleCards({ userEnvId, uid });
    fetchAllNotifications(uid, userEnvId);
    fetchHelpRequests({ uid, userEnvId });
    fetchTopics(userEnvId);

    doReadMapFeats(userEnvId).then((feats: Route[]) => {
      const r = feats.find((d: Route) => d.id === ROUTE);
      if (r) setRoute(r);
    });
  }, [userEnvId]);
};

const UseSetupFns = ({
  mapRef,
  changeMapViewport,
  notifications,
  asyncMarkNotificationAsSeen,
  setAlertModalVisible,
  authUser,
  alertModalVisible
}: {
  mapRef: any;
  changeMapViewport: Function;
  notifications: any[];
  asyncMarkNotificationAsSeen: Function;
  setAlertModalVisible: Function;
  authUser: any;
  view: boolean;
  toggleView: Function;
  alertModalVisible: any;
}) => {
  const {
    routeId,
    setQuery,
    query: {
      id: selectedCardId,
      extended,
      navigation,
      view,
      help,
      helpMode
    }
  } = useRouteParams({
    navigation: BooleanParam,
    help: BooleanParam,
    view: BooleanParam,
    helpMode: BooleanParam
  });

  const shiftVp = ({ latitude, longitude }: LngLat) => {
    if (!mapRef.current) return;
    if (mapRef.current)
      changeMapViewport(
        shiftCenterMap({ latitude, longitude, map: mapRef.current! })
      );
  };

  const toggleView = () => setQuery({ view: !view });
  const setHelpMode = (hm: boolean) => setQuery({ helpMode: hm });

  const routeCard = (d: Card) => {
    if (d.id === selectedCardId) {
      return setQuery({ extended: true, id: selectedCardId });
    }
    shiftVp(d.loc.value);
    return routeId(d.id);
  };

  const onNavClick = () => {
    setQuery({ navigation: true });
  };
  const onHelpClick = () => {
    setQuery({ help: !help });
  };

  const extendCard = (d: Card) => setQuery({ extended: true, id: d.id });

  const closeNav = () => {
    setQuery({ id: null, navigation: false });
  };

  const closeNotification = () => {
    notifications.forEach((n: Notification) => {
      asyncMarkNotificationAsSeen(authUser.uid, n);
    });
    setAlertModalVisible(!alertModalVisible);
  };

  return {
    closeNav,
    extended,
    navigation,
    view,
    toggleView,
    setHelpMode,
    helpMode,
    selectedCardId,
    extendCard,
    onHelpClick,
    help,
    onNavClick,
    routeCard,
    shiftVp,
    closeNotification
  };
};

const useSetupVars = ({
  cards,
  helpRequests,
  authUser,
  newCard,
  filterId,
  view,
  topicId,
  selectedCardId,
  navigation,
  topicDict
}: any) => {
  // filter cards on the distance from the userLocation
  // If the user is in the range of the card
  const selectedCards = !view ? cards : helpRequests;

  const filteredCards = selectedCards.filter(
    (d: Card) =>
      (!filterId ?? activityFilterMap[filterId!](d)) &&
      (!topicId ??
        d.topics?.value?.find((e: Topic) => e.id === topicId))
  );

  const selectedCard = selectedCards.find(
    (d: Card) => d.id === selectedCardId
  );

  const selectedTopic = topicDict.find((d: Topic) => d.id === topicId);

  const navChanged = !usePrevious(navigation) && !!navigation;
  const selectedCardChanged =
    usePrevious(selectedCardId) !== selectedCardId;

  const fitBounds = navChanged ?? selectedCardChanged;
  return {
    selectedCards,
    filteredCards,
    selectedCard,
    selectedTopic,
    fitBounds
  };
};

const useNotifications = (props: any) => {
  const {
    setUnShownNotifications,
    uid,
    userEnvId,
    notifications,
    unShownNotifications,
    setAlertModalVisible,
    fetchAllNotifications
  } = props;

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(uid)
      .collection('notifications')
      .where('shown', '==', false)
      .where('env', '==', userEnvId)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          setUnShownNotifications(snapshot.docs.map(d => d.data()));
          fetchAllNotifications(uid, userEnvId);
        } else {
          setUnShownNotifications([]);
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   setUnShownNotifications(
  //     notifications.filter((n: Notification) => !n.shown)
  //   );
  // }, [
  //   useDeepCompareMemoize(notifications.map((n: Notification) => n.id))
  // ]);

  useEffect(() => {
    unShownNotifications.length && setAlertModalVisible(true);
  }, [
    useDeepCompareMemoize(
      unShownNotifications.map((n: Notification) => n.id)
    )
  ]);
};

const CardModal: React.FC<any> = ({
  extended,
  selectedCardId,
  routeFlip,
  asyncUpdateCardTemplate,
  newCard,
  onNavClick,
  props,
  selectedCard,
  selectedIndex,
  routeCard,
  userEnvId,
  onHelpClick,
  cards
}) => (
    <BlackModal className="flex-grow flex flex-col" visible={extended}>
      <div className="flex-grow flex flex-col relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={selectedCardId}
            className="flex-grow absolute w-full h-full"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit">
            {extended && (
              <ConnectedCard
                {...props}
                {...selectedCard}
                onLeftClick={
                  selectedIndex - 1 > -1
                    ? () => routeCard(cards[selectedIndex - 1])
                    : undefined
                }
                onRightClick={
                  selectedIndex + 1 < cards.length - 1
                    ? () => routeCard(cards[selectedIndex + 1])
                    : undefined
                }
                onHelpClick={onHelpClick}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </BlackModal>
  );

const CardViewPage: React.FC<any> = props => {
  const {
    cards,
    helpRequests,
    height,
    width,
    userEnvId,
    onCardDrop,
    mapViewport,
    userLocation,
    authUser,
    scrollTop = 0,
    newCard,
    notifications = [],
    superAdmin,
    asyncUpdateCardTemplate,
    userMove
  } = props;

  const { uid } = authUser;
  const tmpAvatar = avatars.find(d => d.id === authUser.avatar);
  const avatarSrc = tmpAvatar ? tmpAvatar.img.url : avatars[0].img.url;

  // Get number of notifications by counting the notifications
  // Only counting the notifications that are unread

  const [directions, setDirections] = useState<{
    summary: string;
    duration: number;
  } | null>(null);

  const [route, setRoute] = useState<Route | null>(null);

  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [filterId, setFilterId] = useState<string | null>(null);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(
    false
  );

  const mapRef = React.useRef();

  const {
    closeNav,
    extendCard,
    onHelpClick,
    onNavClick,
    routeCard,
    shiftVp,
    extended,
    navigation,
    helpMode,
    setHelpMode,
    view,
    toggleView,
    selectedCardId,
    closeNotification,
  } = UseSetupFns({
    mapRef,
    setAlertModalVisible,
    alertModalVisible,
    ...props
  });

  const {
    selectedCards,
    filteredCards,
    selectedCard,
    selectedTopic,
    fitBounds
  } = useSetupVars({
    ...props,
    topicId,
    view,
    selectedCardId,
    navigation
  });

  useInitData({ ...props, setRoute, uid });

  const [cardStackPos, setCardStackPos] = useState<boolean>(true);

  const [notifyMenuOpen, setNotifyMenuOpen] = useState<boolean>(false);
  const [unShownNotifications, setUnShownNotifications] = useState<
    Notification[]
  >([]);

  useNotifications({
    ...props,
    uid,
    userEnvId,
    setAlertModalVisible,
    unShownNotifications,
    setUnShownNotifications
  });

  const { routeFlip } = useRouteParams();
  const [ar, setAr] = useState<boolean>(false);
  const selectedIndex = cards.findIndex(d => d.id === selectedCardId);

  return (
    <DefaultLayout
      className="relative overflow-hidden"
      menu={
        <div className="flex-grow flex justify-end items-center">
          <NotifyMenu
            {...props}
            disabled={/* TODO */ notifications.length === 0}
            open={notifyMenuOpen}
            onToggle={setNotifyMenuOpen}
            onClick={(c: Card) => {
              extendCard(c);
              setNotifyMenuOpen(false);
            }}
          />
          <button
            type="button"
            className="btn p-2 bg-white border-2 border-black"
            onClick={() => setCardStackPos(!cardStackPos)}>
            {!cardStackPos ? <ArrowUp /> : <ArrowDown />}
          </button>
          <button
            type="button"
            className="ml-2 btn p-2 bg-white border-2 border-black"
            onClick={() => setAr(true)}>
            AR
          </button>
          <NavMenu
            {...props}
            view={view}
            toggleView={toggleView}
            cards={filteredCards}
            selectTopicId={setTopicId}
            setFilterId={setFilterId}
          />
        </div>
      }>
      <CardSlideShow
        width={width}
        className="absolute mt-16 z-10 w-full py-4"
        style={{
          maxHeight: 270,
          top: !cardStackPos ? '80%' : 0,
          transition: 'top 300ms, height 300ms'
        }}
        visibleIndex={filteredCards.findIndex(
          (c: Card) => c.id === selectedCardId
        )}>
        {filteredCards.map((c: Card) => (
          <PreviewCardHighlighter
            key={c.id}
            className="preview-card-size mx-1"
            selected={selectedCardId === c.id}>
            <PreviewCard
              detail={false}
              className="w-full h-full"
              title={c.title?.value || ''}
              img={c.img ? c.img.value : undefined}
              onClick={() => routeCard(c)}
            />
            {selectedCardId === c.id && (
              <button
                type="button"
                onClick={onNavClick}
                className="invisible-btn w-full flex justify-center py-1 ">
                <div className="p-1 rounded-full border-2 border-black ">
                  <Navigation className="mr-1" size={25} />
                </div>
              </button>
            )}
          </PreviewCardHighlighter>
        ))}
      </CardSlideShow>

      <BlackModal visible={ar} className="m-auto">
        <AugmentedReality {...props} onClose={() => setAr(false)} />
      </BlackModal>

      {unShownNotifications.length > 0 && (
        <BlackModal visible={alertModalVisible} className="m-auto">
          <AlertModalBody
            {...props}
            onSelect={id =>
              routeCard(cards.find((c: Card) => c.id === id))
            }
            cards={cards}
            notifications={unShownNotifications}
            authUser={authUser}
            onClick={(c: Card) => {
              extendCard(c);
              setAlertModalVisible(false);
            }}
            onClose={closeNotification}
          />
        </BlackModal>
      )}
      {navigation && directions && (
        <div className="absolute z-50 w-full p-2" style={{ top: '5vh' }}>
          <DirectionSteps
            duration={directions.duration}
            onClose={closeNav}
            className="w-full p-2"
            summary={directions.summary}
          />
        </div>
      )}
      <BlackModal visible={welcomeScreen} className="z-50">
        <ModalBody
          title="Welcome to TICKLE"
          className="flex-grow overflow-hidden"
          onClose={() => setWelcomeScreen(false)}>
          <SelectUserEnv
            {...props}
            className="bg-white z-10 flex-grow overflow-y-auto"
            onClose={() => setWelcomeScreen(false)}
          />
        </ModalBody>
      </BlackModal>
      <CardModal
        extended={extended}
        selectedCardId={selectedCardId}
        routeFlip={routeFlip}
        asyncUpdateCardTemplate={asyncUpdateCardTemplate}
        newCard={newCard}
        onNavClick={onNavClick}
        props={props}
        selectedCard={selectedCard}
        selectedIndex={selectedIndex}
        routeCard={routeCard}
        onHelpClick={onHelpClick}
        userEnvId={userEnvId}
        cards={cards}
      />

      {superAdmin && (
        <RightTriangleBtn
          className={`${css.forceMapPos} right-0 bottom-0 z-10`}
          onClick={() => setHelpMode(!helpMode)}>
          <div
            className="text-white text-3xl flex items-center"
            style={{ bottom: scrollTop }}>
            {helpMode ? <Minus size={35} /> : <Plus size={35} />}
          </div>
        </RightTriangleBtn>
      )}
      <LeftTriangleBtn
        className={`${css.forceMapPos} left-0 bottom-0 z-10`}
        onClick={() => shiftVp(userLocation)}>
        <div
          className="text-white text-3xl flex items-center"
          style={{ bottom: scrollTop }}>
          <MapPin size={30} className="mb-1" />
        </div>
      </LeftTriangleBtn>
      <MapBox
        onClick={loc => {
          userMove(loc);
          console.log('yeah');
        }}
        ref={mapRef}
        {...mapViewport}
        className={clsx(
          'left-0 top-0 w-full h-full overflow-hidden',
          css.forceMapPos
        )}
        style={{ height }}>
        {navigation && (
          <Directions
            fitBounds={!!fitBounds}
            bboxPadding={{
              top: height / 2,
              bottom: height / 6,
              left: 20,
              right: 20
            }}
            onChange={setDirections}
            origin={userLocation}
            destination={selectedCard.loc.value}
          />
        )}
        {route && route.geometry && route.waypoints && (
          <MapBoxDirections
            {...props}
            route={route}
            draggable={false}
            waypoints={route.waypoints}
          />
        )}
        {selectedCards.map((c: Card) => (
          <Marker
            element={
              <div
                className={clsx(
                  c.id === selectedCardId &&
                  'border-2 border-black rounded-full'
                )}>
                <MarkerElement className="mx-2 my-1" />
              </div>
            }
            draggable={superAdmin && c.id === TEMP_ID}
            title={c.title?.value || ''}
            onClick={() => {
              routeCard(c);
            }}
            key={`${c.id}${selectedCardId}`}
            {...c}
            onDragEnd={(value: LngLat) =>
              onCardDrop({ ...c, loc: { ...c.loc, value } })
            }
            longitude={
              c.loc?.value?.longitude || userLocation.longitude
            }
            latitude={c.loc?.value?.latitude || userLocation.latitude}
          />
        ))}
        {selectedTopic && (
          <button
            type="button"
            onClick={() => setTopicId(null)}
            className="w-full flex absolute bottom-0 md:mb-0 mb-4"
            style={
              {
                // bottom: "-3rem"
              }
            }>
            <PreviewTag
              {...selectedTopic}
              className="z-10 preview-card-size mx-auto overflow-x-hidden "
            />
          </button>
        )}
        {filterId && (
          <div className="absolute bottom-0 md:mb-0 mb-4 w-full flex">
            <AnimatePresence>
              <motion.button
                className="btn mr-1 bg-white p-2 border border-black ml-auto mr-auto"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                type="button"
                onClick={() => setFilterId(null)}>
                {activityFilterLabelMap[filterId]}
                <X />
              </motion.button>
            </AnimatePresence>
          </div>
        )}

        {selectedCardId && (
          <Compass
            key={userEnvId}
            map={mapRef.current}
            selectedCardId={selectedCardId}
            {...props}
            cards={filteredCards}
            className="absolute left-0 top-0 overflow-visible w-full h-full pointer-events-none"
          />
        )}

        <Marker
          {...userLocation}
          id={`${userLocation.latitude} ${userLocation.longitude}`}
          element={
            <div className="border-2 p-12 rounded-full border-black">
              <img
                className="left-0 top-0"
                src={avatarSrc}
                alt="avatar"
                style={{ width: 35, height: 35 }}
              />
            </div>
          }
        />
      </MapBox>
    </DefaultLayout>
  );
};
export default CardViewPage;
