import {SessionStateType} from './Session';
import {MapViewStateType} from './Map';
import {AdminStateType} from './Admin';
import {CardsStateType} from './Cards';
import {ScreenStateType} from './Screen';
import {NotificationsStateType} from './Notifications';

export default interface AppStateShape {
  MapView: MapViewStateType;
  Cards: CardsStateType;
  Session: SessionStateType;
  Admin: AdminStateType;
  Screen: ScreenStateType;
  Notifications: NotificationsStateType;
}
export type SpreadAppStateShape = MapViewStateType &
  CardsStateType &
  SessionStateType &
  AdminStateType &
  ScreenStateType &
  NotificationsStateType;
