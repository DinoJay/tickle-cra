import {combineReducers} from 'redux';

import MapView from './Map';
import Cards from './Cards';
import Session from './Session';
import Screen from './Screen';
import Admin from './Admin';
// Add the notifications in the state
import Notifications from './Notifications';
// import Account from './Account';
// import Diary from './Diary';
// import TagTree from './TagTree';
// import Login from './components/Login/reducer';
export default combineReducers({
  Admin,
  MapView,
  Cards,
  Session,
  // DataView,
  Screen,
  Notifications
  // Account,
  // Diary,
});
// export default MapView;
// export default CardCreator;
