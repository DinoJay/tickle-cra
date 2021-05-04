import React, { useState, useEffect } from 'react';
import SelectInput from '~/components/utils/SelectInput';
import delay from '~/components/utils/delayPromise';
import makeCancelable from '~/components/utils/abortPromise';
import { forwardGeoCoding, reverseGeoCoding } from '~/components/utils/geocoding';
const GoToPlace = props => {
    const { onSelect, className, location, onLabelChange, label, locField = 'formatted_address', input = false, style } = props;
    const [query, setQuery] = useState('');
    const [matches, setMatches] = useState([]);
    const promiseRef0 = React.useRef();
    const promiseRef1 = React.useRef();
    const placeNameCache = React.useRef();
    useEffect(() => {
        const promiseRef0Cur = promiseRef0.current;
        if (promiseRef0Cur)
            promiseRef0Cur.cancel();
        if (location) {
            promiseRef0.current = makeCancelable(delay(400)
                .then(() => fetch(reverseGeoCoding([location.longitude, location.latitude])).then(function (response) {
                return response.json();
            }))
                .then((res) => {
                const name = Array.isArray(res.results)
                    ? res.results[0][locField]
                    : '';
                placeNameCache.current = name;
                onLabelChange(name);
            }));
        }
        return () => undefined;
    }, [location.longitude, location.latitude]);
    useEffect(() => {
        if (query) {
            const qs = forwardGeoCoding(query);
            const promiseRef1Cur = promiseRef1.current;
            if (promiseRef1Cur)
                promiseRef1Cur.cancel();
            promiseRef1.current = makeCancelable(delay(50).then(() => fetch(qs)
                .then(function (response) {
                return response.json();
            })
                .then(response => {
                if (response.results)
                    setMatches(response.results);
            })));
            return () => promiseRef1Cur && promiseRef1Cur.cancel();
        }
        setMatches([]);
        return () => undefined;
    }, [query]);
    return input ? (React.createElement(SelectInput, Object.assign({}, props, { value: label, orientation: 'down', placeholder: "type place", className: className, values: matches, onFocus: () => query === '' && setQuery('Brussels'), onBlur: () => onLabelChange(placeNameCache.current), onInputChange: (t) => {
            onLabelChange(t);
            setQuery(t || 'brussels');
        }, onSelect: (p) => {
            const newLoc = {
                longitude: p.geometry.location.lng,
                latitude: p.geometry.location.lat
            };
            onSelect(newLoc);
        }, valueAcc: (d) => d.formatted_address, filterFn: () => true, idAcc: (d) => d.place_id }))) : (React.createElement("div", { className: className, style: style }, label));
};
export default GoToPlace;
