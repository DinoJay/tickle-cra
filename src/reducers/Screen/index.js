// import { combineReducers } from 'redux';
// import cards from './cards';
// import visibilityFilter from './visibilityFilter';
// import turf from 'turf';
// import booleanWithin from '@turf/boolean-within';
// import setBBox from './fitbounds';
// import mapboxgl from 'mapbox-gl';
import { SCREEN_RESIZE } from './types';
// const toGeoJSON = points => ({
//   type: 'FeatureCollection',
//   features: points.map(p => ({
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: p
//     }
//   }))
// });
const INITIAL_STATE = {
    width: 100,
    height: null,
    iOS: false,
    android: false,
    smallScreen: false
};
function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SCREEN_RESIZE: {
            const { width } = action.options;
            // TODO check later
            const smallScreen = typeof width === 'number' && width < 420;
            return { ...state, smallScreen, ...action.options };
        }
        default:
            return state;
    }
}
export default reducer;
