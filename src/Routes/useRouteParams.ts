import {
  useQueryParams,
  BooleanParam,
  StringParam
} from 'use-query-params';

interface QT {
  id?: any;
  extended?: any;
  userEnvId?: any;
  flipped?: any;
  navigation?: any;
  help?: any;
  view?: any
  helpMode?: any
}
export default function useRouteParams(
  obj = {}
): {
  routeFlip: (a: string) => void;
  routeUserEnv: (a: string) => void;
  routeId: (a: string) => void;
  routeToggleExtend: (a: string) => void;
  setQuery: any;
  query: QT;
} {
  const [query, setQuery]: [QT, Function] = useQueryParams({
    flipped: BooleanParam,
    extended: BooleanParam,
    id: StringParam,
    userEnvId: StringParam,
    ...obj
  });

  const routeToggleExtend = (): void => {
    setQuery({
      id: query.extended ? undefined : query.id,
      extended: !query.extended,
      userEnvId: query.userEnvId,
      flipped: false
    });
  };

  const routeFlip = (): void => setQuery({ flipped: !query.flipped });

  const routeId = (id: string): void =>
    query.id === id ? routeToggleExtend() : setQuery({ id });

  const routeUserEnv = (envId: string): void =>
    setQuery({ userEnvId: envId });

  return {
    query,
    routeFlip,
    routeUserEnv,
    routeId,
    routeToggleExtend,
    setQuery
  };
}
