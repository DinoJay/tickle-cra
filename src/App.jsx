import React from 'react';

import { Provider } from 'react-redux';

// import withAuthentication from './components/withAuthentication';oo
// import AuthUserContext from './components/AuthUserContext';
// import {screenResize} from '~/reducers/Screen/actions';
// import {db} from 'Firebase';

import { createBrowserHistory } from 'history';
import { formatTime } from '~/components/utils/time';
import { userMove, setLocs } from '~/reducers/Map/actions';
import store from './store';
import Routes from './Routes';

const history = createBrowserHistory();

const geoOpts = {
  enableHighAccuracy: false,
  timeout: 10000
};

const geoError = err => console.log('GEO err', err);

// const geoSuccess = pos => {
//   const coords = {
//     latitude: pos.coords.latitude,
//     longitude: pos.coords.longitude
//   };
//
//   store.dispatch(userMove(coords));
//   // store.dispatch(changeMapViewport(coords));
// };

const updateLoc = pos => {
  const mapState = store.getState().MapView;
  const lastLoc = mapState.userLocation;
  const lastDists = mapState.locs;
  console.log('lastLoc', lastLoc);
  const coords = {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude
  };

  // Oude Arendonkse Baan, Oud-Turnhout 51.313476, 5.001513
  // const turnoud = { latitude: 51.313476, longitude: 5.001513 };
  const newLocs = [
    ...lastDists,
    { date: formatTime(new Date()), coords }
  ];
  console.log('newLocs', newLocs);
  store.dispatch(userMove(coords));
  store.dispatch(setLocs(newLocs));
};

// TODO
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      updateLoc(pos);
      // store.dispatch(changeMapViewport(coords));
    },
    err => console.log('err', err),
    geoOpts
  );

  navigator.geolocation.watchPosition(updateLoc, geoError, geoOpts);
}

// let deferredPrompt;

window.addEventListener('beforeinstallprompt', () => {
  // e.preventDefault();
  // deferredPrompt = e;
  // btnAdd.style.display = 'block';
});

// TODO
// window.addEventListener('resize', () => {
//   const cont = document.querySelector('#content-container');
//   console.log('resize');
//   const isAndroid = /(android)/i.test(navigator.userAgent);
//   store.dispatch(
//     screenResize({
//       width: cont.offsetWidth,
//       height: cont.offsetHeight,
//       isAndroid
//     })
//   );
// });

// store.dispatch(fetchAuthoredCards(0));
// store.dispatch(fetchNearByPlaces());

// const withAuthentication = Component =>
//   class WithAuthentication extends React.Component {
//     constructor(props) {
//       super(props);
//
//       this.state = {
//         authUser: null
//       };
//     }
//
//     componentDidMount() {
//       firebase.auth.onAuthStateChanged(authUser => {
//         authUser
//           ? this.setState(() => ({ authUser }))
//           : this.setState(() => ({ authUser: null }));
//       });
//     }
//
//     render() {
//       const { authUser } = this.state;
//
//       return (
//         <AuthUserContext.Provider value={authUser}>
//           <Component />
//         </AuthUserContext.Provider>
//       );
//     }
//   };

/**
 * The App wrapper, registering routes and setting global event listeners
 */

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('firebase-messaging-sw.js', { scope: '.'}).then(registration => {
//       console.log('SW is registered: ', registration)
//     }).catch(registrationError => {
//       console.log('SW registration failed:', registrationError);
//     });
//   });
// }

// let deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  // deferredPrompt = e;
});

const App = () => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
);

export default App;
