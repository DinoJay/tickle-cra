import { useState } from "react";
// TODO: BUGGY

export default function useMergeState(initState: any): [any, Function] {
  const [state, setState] = useState<any>(initState);
  const mergeState = (newState: any): void =>
    setState({ ...state, ...newState });
  return [state, mergeState];
}
