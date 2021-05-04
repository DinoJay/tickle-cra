import { ScreenActionTypes } from './types';
export interface ScreenStateType {
    width: number | null;
    height: number | null;
    iOS: boolean;
    android: boolean;
    smallScreen: boolean;
}
declare function reducer(state: ScreenStateType | undefined, action: ScreenActionTypes): ScreenStateType;
export default reducer;
