import {AdminActionTypes} from './Admin/types';
import {MapActionTypes} from './Map/types';
import {CardActionTypes} from './Cards/types';
import {SessionActionTypes} from './Session/types';
import {ScreenActionTypes} from './Screen/types';
import {NotificationActionTypes} from './Notifications/types';

type RootAction = AdminActionTypes &
  MapActionTypes &
  CardActionTypes &
  SessionActionTypes &
  ScreenActionTypes &
  NotificationActionTypes;

export default RootAction;
