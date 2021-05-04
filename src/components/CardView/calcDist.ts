import * as turf from '@turf/helpers';
import calcDistance from '@turf/distance';
import {Units} from '@turf/helpers';

import {Card} from '~/constants/cardFields';
import {LngLat} from '~/constants/typeUtils';

export default function calcDist(card: Card, userLoc: LngLat) {
  const from = turf.point([
    card.loc.value.longitude,
    card.loc.value.latitude
  ]);

  const to = turf.point([userLoc.longitude, userLoc.latitude]);
  const options = {units: 'kilometers' as Units};
  const distance = Math.round(calcDistance(from, to, options) * 1000);
  return distance;
}
