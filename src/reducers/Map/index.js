import uniqBy from 'lodash/uniqBy';
import { USER_MOVE, CHANGE_MAP_VIEWPORT, SET_LOCS } from './types';
// import {LOAD_DIRECTION} from './async_actions';
const defaultLocation = {
    latitude: 50.85146,
    longitude: 4.315483
};
const INITIAL_STATE = {
    mapSettings: {
        zoom: 15,
        ...defaultLocation
    },
    accessibleRadius: 80,
    userLocation: defaultLocation,
    locs: []
};
function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_MAP_VIEWPORT: {
            const mapSettings = action.options;
            return {
                ...state,
                mapSettings: { ...state.mapSettings, ...mapSettings }
            };
        }
        case SET_LOCS: {
            const locs = action.options;
            return {
                ...state,
                locs: uniqBy(locs, d => `${d.date}|${d.coords.latitude}|${d.coords.longitude}`)
                // userLocation
            };
        }
        case USER_MOVE: {
            const userLocation = action.options;
            return {
                ...state,
                userLocation
                // userLocation
            };
        }
        default:
            return state;
    }
}
export default reducer;
