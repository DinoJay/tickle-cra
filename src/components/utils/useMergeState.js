import { useState } from "react";
// TODO: BUGGY
export default function useMergeState(initState) {
    const [state, setState] = useState(initState);
    const mergeState = (newState) => setState({ ...state, ...newState });
    return [state, mergeState];
}
