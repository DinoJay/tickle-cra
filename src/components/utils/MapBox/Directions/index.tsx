import React, {useEffect, useState} from 'react';

import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
import {LngLatLike} from 'mapbox-gl';

import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';

import {MapContext} from '../index';
import Line from '../Line';
import {LngLat} from '~/constants/cardFields';

const directionService = mbxDirections({
  accessToken: process.env.MapboxAccessToken as string
});

const Directions: React.FC<{
  origin: LngLat;
  destination: LngLat;
  onChange: Function;
  bboxPadding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  fitBounds: boolean;
}> = props => {
  const {
    origin,
    onChange = () => null,
    destination,
    bboxPadding = {top: 500, bottom: 80, left: 20, right: 20},
    fitBounds
  } = props;
  const {map} = React.useContext(MapContext);
  const startCoords = [origin.longitude, origin.latitude] as LngLatLike;
  const endCoords = [
    destination.longitude,
    destination.latitude
  ] as LngLatLike;

  const [route, setRoute] = useState({coordinates: [], steps: []});

  useDidUpdateEffect(() => {
    onChange(route.steps);
  }, [useDeepCompareMemoize(route.steps)]);

  useEffect(() => {
    const routeConf: any = {
      profile: 'walking',
      geometries: 'geojson',
      steps: true,
      waypoints: [
        {
          coordinates: startCoords
        },
        {
          coordinates: endCoords
        }
      ]
    };

    directionService
      .getDirections(routeConf)
      .send()
      .then((response: any) => {
        const {body} = response;
        const {
          routes: [
            {
              geometry: {coordinates},
              legs
            }
          ]
        } = body;

        const steps = legs ? legs[0] : [];

        setRoute({coordinates, steps});

        if (map && fitBounds)
          map.fitBounds([startCoords, endCoords], {
            padding: bboxPadding
          });
      });
  }, [
    useDeepCompareMemoize({
      startCoords,
      endCoords,
      bboxPadding,
      fitBounds
    })
  ]);

  if (route.coordinates.length > 0)
    return <Line coordinates={route.coordinates} />;
  return null;
};
export default Directions;
