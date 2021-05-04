import React, { useState, useEffect, useRef } from 'react';

import uuidv1 from 'uuid/v1';
import * as turf from '@turf/helpers';
import convexHull from '@turf/convex';
import polyline from '@mapbox/polyline';
import { useQueryParams, StringParam } from 'use-query-params';
import { theme } from 'Tailwind';
import { Img } from '~/constants/typeUtils';
import { PhotoPreview } from '~/components/utils/PhotoUpload';
import { BlackModal, ModalBody } from '~/components/utils/Modal';

import ThreeDots from '~/components/utils/ThreeDots';
import SelectField from '~/components/utils/SelectField';
import ABC from '~/components/utils/abc';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';
import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';
import DetailsFrame from '~/components/utils/DetailsFrame';
import MapBox, { Marker, Feature } from '~/components/utils/MapBox';
import MapPOI from './MapPOI';
import MapBoxDirections, {
  Route
} from '~/components/utils/MapBox/Directions/DirectionCreator';
import icons from '~/components/utils/MapBox/Directions/MapIcons';
import WayPoints, {
  WP,
  WPtype,
  wpTypes,
  DEFAULT,
  useGetLocName
} from '~/components/utils/MapBox/Directions/Waypoints';

import { Card } from '~/constants/cardFields';

import UserEnv from '~/constants/userEnvType';

import { doCreateMapFeat, doReadMapFeats } from '~/firebase/db/env_db';

const { colors } = theme;

const nearByPlaces = () => {
  const qString =
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyBt9WPodorV9AmcyFB_nwo3eHwoc_Mqsg4';

  return fetch(qString, {
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache',
    credentials: 'same-origin' // include, *same-origin, omit
  }).then(function (response) {
    return response.json();
  });
};

const ROUTE = 'ROUTE';

type Loc = {
  latitude: number;
  longitude: number;
};

interface MapPanelContentType {
  userEnv: UserEnv;
  cards: Card[];
  asyncUpdateCard: ({
    cardData,
    userEnvId
  }: {
    cardData: Card;
    userEnvId: string;
  }) => any;
  userLocation: Loc;
  route: Route;
  // TODO
  setRoute: Function; // (a: Route) => any;
  style?: React.CSSProperties;
  routeSelectExtend: Function;
}

const WayPointModal: React.FC<{
  wpId?: string;
  onClose: Function;
  waypoints: WP[];
  updateWayPoint: Function;
}> = props => {
  const { wpId, onClose, waypoints, updateWayPoint } = props;
  const selectedWp = waypoints.find((d: WP) => d.id === wpId);
  const {
    type: initType = DEFAULT,
    text: initText = '',
    img: initImg = null,
    loc = [null, null]
  } = selectedWp || {};

  const [type, setType] = useState<WPtype>(initType);

  const [text, setText] = useState<string>(initText);
  const [img, setImg] = useState<Img | null>(initImg as Img);

  const [title, setTitle] = useState<string>('Loading...');

  useGetLocName({
    latitude: loc[1],
    longitude: loc[0],
    onChange: setTitle
  });

  const updWPhelper = () =>
    updateWayPoint({ ...selectedWp, text, type, img });

  return (
    <BlackModal visible={!!wpId}>
      <ModalBody
        title={title}
        onClose={() => {
          onClose();
          updWPhelper();
        }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            // setQuery({wpId: ''});
          }}>
          <label className="label" htmlFor="place-info">
            Add place icon
          </label>

          <div className="mb-3">
            <SelectField
              selectedId={type}
              className="bg-white flex-grow mr-4 "
              selectedClassName="px-2 border-2 border-black shadow
    text-lg flex items-center py-1 "
              optionClassName="px-2 py-1"
              values={wpTypes.map(d => ({
                label: (
                  <div className="w-full flex justify-between items-center">
                    <div>{d}</div>
                    {React.createElement(
                      icons.find(
                        (e: { key: string; Icon: any }) => e.key === d
                      )!.Icon,
                      { title: ABC[waypoints.length - 1] }
                    )}
                  </div>
                ),
                key: d
              }))}
              onChange={(obj: { key: string; label: any }) =>
                setType(obj.key as WPtype)
              }
            />
          </div>
          <label className="label" htmlFor="place-info">
            Add place photo
          </label>
          <PhotoPreview
            edit
            className="h-48 mb-3"
            {...img}
            onChange={setImg}
          />

          <label className="label" htmlFor="place-info">
            Add place information
          </label>
          <textarea
            name="place-info"
            placeholder="Enter Text..."
            rows={7}
            className="form-input mb-1 w-full"
            onChange={e => setText(e.target.value)}
            value={text || ''}
          />
        </form>
      </ModalBody>
    </BlackModal>
  );
};

// type MVP = Loc & {zoom: number};
const MapPanelContent: React.FC<MapPanelContentType> = props => {
  const {
    userEnv,
    cards,
    asyncUpdateCard,
    userLocation,
    route,
    setRoute,
    style,
    routeSelectExtend
  } = props;

  const { id: userEnvId } = userEnv;

  const { waypoints = [] } = route;
  const setWayPoints = (ws: WP[]) =>
    setRoute({ ...route, waypoints: ws });
  const addWayPoint = (l: WP) => setWayPoints([...waypoints, l]);

  const removeWayPoint = (id: string) => {
    setWayPoints(waypoints.filter(w => id !== w.id));
  };

  const updateCard = (cardData: Card) =>
    asyncUpdateCard({ cardData, userEnvId });

  const onDragEnd = (n: Card) => (newLocValue: Loc) => {
    updateCard({
      ...n,
      loc: { ...n.loc, value: { ...n.loc.value, ...newLocValue } }
    });
  };

  const updateWayPoint = (l: WP) => {
    setRoute(({ id, loading, geometry, waypoints }: Route) => ({
      id,
      loading,
      geometry,
      waypoints: waypoints.reduce(
        (acc: WP[], w: WP) =>
          l.id === w.id ? [l, ...acc] : [w, ...acc],
        []
      )
    }));
  };

  const geojson = turf.featureCollection(
    route.geometry
      ? polyline
        .decode(route.geometry)
        .map(d => turf.point(d.reverse()))
      : cards.map(d =>
        turf.point([d.loc.value.longitude, d.loc.value.latitude])
      )
  );

  // TODO change later
  const { coordinates }: any = convexHull(geojson) || { coordinates: [] };

  const [query, setQuery] = useQueryParams({
    wpId: StringParam
  });
  const { wpId } = query;

  const mapRef = useRef(null);

  return (
    <div className="relative flex flex-col w-full" style={style}>
      <WayPointModal
        key={wpId}
        updateWayPoint={updateWayPoint}
        wpId={wpId}
        onClose={() => setQuery({ wpId: '' })}
        waypoints={waypoints}
      />
      <MapBox
        ref={mapRef}
        longitude={userLocation.longitude}
        latitude={userLocation.latitude}
        zoom={12}
        className="w-full h-full">
        {cards.map(c => (
          <Marker
            draggable
            color={colors.yellow[500]}
            title={c.title ? c.title.value : undefined}
            onClick={({ id }: { id: string }) => {
              routeSelectExtend(id);
            }}
            key={c.id}
            {...c}
            onDragEnd={onDragEnd(c)}
            {...c.loc.value}
          />
        ))}
        <Feature coordinates={coordinates} />
        <MapBoxDirections
          {...props}
          {...route}
          onWaypointClick={id => setQuery({ wpId: id })}
          addWayPoint={addWayPoint}
          updateWayPoint={updateWayPoint}
        />
        <MapPOI
          cards={cards}
          bounds={mapRef.current?.getBounds()}
          mapRef={mapRef}
        />
      </MapBox>

      <div className="overflow-y-auto m-3 h-64 flex flex-col w-128">
        {waypoints.length > 0 ? (
          <WayPoints
            disabled={route.loading}
            className="h-full w-full"
            waypoints={route.waypoints.sort(
              (a, b) => a.order - b.order
            )}
            onClick={(id: string) => setQuery({ wpId: id })}
            removeWayPoint={removeWayPoint}
          />
        ) : (
            <div className="m-auto text-2xl text-grey">No Waypoints</div>
          )}
      </div>
      <button
        disabled={route.loading}
        onClick={() => {
          addWayPoint({
            type: DEFAULT as WPtype,
            label: ABC[waypoints.length],
            order: Date.now(),
            id: uuidv1(),
            // TODO
            loc: [userLocation.longitude, userLocation.latitude]
          });
        }}
        type="button"
        className={`border-2 bg-white w-full btn p-1 text-base cursor-pointer ${route.loading &&
          'disabled'} mb-1`}>
        {route.loading ? 'loading ...' : 'Add Waypoint'}
      </button>
    </div>
  );
};

const MapPanel: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  onClick: Function;
  userEnvId: string;
  envs: UserEnv[];
  userLocation: Loc;
  cards: Card[];
  asyncUpdateCard: ({
    cardData,
    userEnvId
  }: {
    cardData: Card;
    userEnvId: string;
  }) => any;
  routeSelectExtend: Function;
}> = props => {
  const {
    className,
    envs,
    userEnvId,
    open,
    onClick,
    userLocation,
    cards,
    asyncUpdateCard,
    routeSelectExtend
  } = props;

  const userEnv = envs.find((e: UserEnv) => e.id === userEnvId);

  const [route, setRoute] = useState<Route>({
    id: ROUTE,
    waypoints: [],
    geometry: null,
    loading: false
  });

  useEffect(() => {
    // nearByPlaces().then(pl => console.log('places', pl));
    if (userEnvId) {
      doReadMapFeats(userEnvId).then((feats: Route[]) => {
        const r = feats.find((d: Route) => d.id === ROUTE);
        if (r) setRoute(r);
      });
    }
  }, [userEnvId]);

  useDidUpdateEffect(() => {
    doCreateMapFeat(userEnv!.id, { ...route, id: ROUTE });
  }, [useDeepCompareMemoize(route)]);

  return (
    <DetailsFrame
      className={className}
      open={open}
      onClick={onClick}
      title="Map">
      {userEnv ? (
        <MapPanelContent
          {...props}
          userLocation={userLocation}
          cards={cards}
          asyncUpdateCard={asyncUpdateCard}
          routeSelectExtend={routeSelectExtend}
          route={route}
          setRoute={setRoute}
          userEnv={userEnv}
        />
      ) : null}
    </DetailsFrame>
  );
};
const MapPanelWrapper: React.FC<{
  envs: UserEnv[];
  userEnvId: string;
  open: boolean;
  onClick: Function;
  className?: string;
  userLocation: Loc;
  cards: Card[];
  asyncUpdateCard: ({
    cardData,
    userEnvId
  }: {
    cardData: Card;
    userEnvId: string;
  }) => any;
  routeSelectExtend: Function;
  style: React.CSSProperties;
}> = props => {
  const { className, envs, userEnvId, open, onClick, style } = props;

  if (!envs.length)
    return (
      <div className="font-bold text-xl mt-3 flex justify-center">
        <ThreeDots />
      </div>
    );

  return (
    <MapPanel
      style={style}
      className={className}
      envs={envs}
      userEnvId={userEnvId}
      open={open}
      onClick={onClick}
      {...props}
    />
  );
};
export default MapPanelWrapper;
