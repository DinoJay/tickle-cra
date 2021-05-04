import React, {useEffect} from 'react';

import polyline from '@mapbox/polyline';
import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
import {MapMouseEvent} from 'mapbox-gl';

// import GoToPlace from '~/components/utils/GoToPlace';

import uuidv1 from 'uuid/v1';

import {theme} from 'Tailwind';
import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';
import Marker from '../Marker';
import Line from '../Line';
import ABC from '~/components/utils/abc';
// import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
// import MapBoxDirections from '@mapbox/mapbox-gl-directions';

import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import abortPromise from '~/components/utils/abortPromise';
import delay from '~/components/utils/delayPromise';

// import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';
import icons, {DefaultIcon} from './MapIcons';

import {MapContext} from '../index';

import {WP, WPtype, DEFAULT} from './Waypoints';

const {colors} = theme;

const directionService = mbxDirections({
  accessToken: process.env!.MapboxAccessToken!
});
export type Route = {
  id: string;
  waypoints: WP[];
  geometry: null | string;
  // type: string;
  loading: boolean;
};

type MapBoxDirectionsType = {
  waypoints: WP[];
  addWayPoint?: (a: WP) => any;
  updateWayPoint?: (a: WP) => any;
  route: Route;
  setRoute?: Function;
  onWaypointClick: (id: string) => any;
  draggable?: boolean;
};

const MapBoxDirections: React.FC<MapBoxDirectionsType> = props => {
  const {
    waypoints = [],
    addWayPoint,
    onWaypointClick,
    updateWayPoint,
    route,
    setRoute,
    draggable = true
  } = props;

  const {map, layers} = React.useContext(MapContext);

  const routeGeometry = route.geometry
    ? polyline.decode(route.geometry).map(d => d.reverse())
    : null;

  useEffect(() => {
    const waypointHandler = (e: MapMouseEvent) => {
      const invalidClick = layers.some(
        (l: {_pos: {x: number; y: number}}) =>
          Math.abs(l._pos.x - e.point.x) < 20 &&
          Math.abs(l._pos.y - e.point.y) < 20
      );

      if (waypoints.length > 8 || invalidClick) return;

      addWayPoint &&
        addWayPoint({
          type: DEFAULT as WPtype,
          label: ABC[waypoints.length],
          order: Date.now(),
          id: uuidv1(),
          loc: [e.lngLat.lng, e.lngLat.lat]
        });
    };

    if (map) map.on('click', waypointHandler);

    return () => {
      map && map.off('click', waypointHandler);
    };
  });

  useDidUpdateEffect(() => {
    if (waypoints.length > 1) {
      setRoute && setRoute({...route, loading: true});
      const pr = abortPromise(
        delay(400).then(() =>
          directionService
            .getDirections({
              profile: 'walking',
              waypoints: waypoints.map(w => ({coordinates: w.loc}))
            })
            .send()
            .then(response => {
              const directions = response.body;
              const {geometry} = directions.routes[0];
              setRoute &&
                setRoute({
                  id: uuidv1(),
                  waypoints,
                  geometry,
                  loading: false
                });
            })
        )
      );

      return pr.cancel;
    }
    setRoute &&
      setRoute({
        waypoints,
        geometry: null,
        loading: false,
        id: uuidv1()
      });
  }, [useDeepCompareMemoize(waypoints.map(d => d.loc))]);

  const sortedWaypoints = waypoints.sort((a, b) => a.order - b.order);

  const getIconType = (t: string) => {
    const Ic = icons.find(d => d.key === t);
    return Ic ? Ic.Icon : DefaultIcon;
  };

  const markers = sortedWaypoints.map((d, i) => (
    <Marker
      element={React.createElement(getIconType(d.type), {
        title: ABC[i]
      })}
      key={d.id}
      id={d.id}
      color="black"
      draggable={draggable}
      onClick={() => onWaypointClick && onWaypointClick(d.id)}
      popupEl={
        !draggable && d.text ? (
          <div className="">
            <div>{d.text}</div>
            {d.img && <img src={d.img.url} />}
          </div>
        ) : (
          undefined
        )
      }
      onDragEnd={(nl: {latitude: number; longitude: number}) => {
        updateWayPoint &&
          updateWayPoint({...d, loc: [nl.longitude, nl.latitude]});
      }}
      longitude={d.loc[0]}
      latitude={d.loc[1]}
    />
  ));

  const LineRoute = route && routeGeometry && (
    <Line
      coordinates={routeGeometry}
      paint={{'line-color': colors.black, 'line-opacity': 0.5}}
    />
  );

  return (
    <>
      {LineRoute}
      {markers}
    </>
  );
};
export default MapBoxDirections;
