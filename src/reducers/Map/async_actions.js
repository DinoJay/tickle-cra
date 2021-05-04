// import { flyToUser } from './actions';
// import Mapbox from 'mapbox';

import {
  // WebMercatorViewport,
  userMove
} from './actions';

export function asyncUserMove(e) {
  return function(dispatch) {
    dispatch(userMove(e));
  };
}
