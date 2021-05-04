interface QT {
    id?: any;
    extended?: any;
    userEnvId?: any;
    flipped?: any;
    navigation?: any;
    help?: any;
}
export default function useRouteParams(obj?: {}): {
    routeFlip: (a: string) => void;
    routeUserEnv: (a: string) => void;
    routeId: (a: string) => void;
    routeToggleExtend: (a: string) => void;
    setQuery: any;
    query: QT;
};
export {};
