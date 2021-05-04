import React, {useState, useEffect} from 'react';

import SelectInput from '~/components/utils/SelectInput';

import delay from '~/components/utils/delayPromise';
import makeCancelable, {
  PromiseType
} from '~/components/utils/abortPromise';
import {LngLat} from '~/constants/cardFields';

import {
  forwardGeoCoding,
  reverseGeoCoding
} from '~/components/utils/geocoding';

const GoToPlace: React.FC<{
  onSelect: Function;
  className?: string;
  location: LngLat;
  onLabelChange: Function;
  label: string;
  locField: string;
  input: boolean;
  style: React.CSSProperties;
}> = props => {
  const {
    onSelect,
    className,
    location,
    onLabelChange,
    label,
    locField = 'formatted_address',
    input = false,
    style
  } = props;

  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);

  const promiseRef0 = React.useRef();
  const promiseRef1 = React.useRef();
  const placeNameCache = React.useRef();
  useEffect(() => {
    const promiseRef0Cur = promiseRef0.current as
      | PromiseType
      | undefined;
    if (promiseRef0Cur) promiseRef0Cur.cancel();

    if (location) {
      promiseRef0.current = makeCancelable(
        delay(400)
          .then(() =>
            fetch(
              reverseGeoCoding([location.longitude, location.latitude])
            ).then(function(response) {
              return response.json();
            })
          )
          .then((res: any) => {
            const name = Array.isArray(res.results)
              ? res.results[0][locField]
              : '';

            placeNameCache.current = name;
            onLabelChange(name);
          })
      );
    }
    return (): void => undefined;
  }, [location.longitude, location.latitude]);

  useEffect(() => {
    if (query) {
      const qs = forwardGeoCoding(query);
      const promiseRef1Cur = promiseRef1.current as
        | PromiseType
        | undefined;
      if (promiseRef1Cur) promiseRef1Cur.cancel();
      promiseRef1.current = makeCancelable(
        delay(50).then(() =>
          fetch(qs)
            .then(function(response) {
              return response.json();
            })
            .then(response => {
              if (response.results) setMatches(response.results);
            })
        )
      );
      return (): void => promiseRef1Cur && promiseRef1Cur.cancel();
    }
    setMatches([]);
    return () => undefined;
  }, [query]);

  return input ? (
    <SelectInput
      {...props}
      value={label}
    orientation={'down'}
    placeholder="type place"
      className={className}
      values={matches}
      onFocus={() => query === '' && setQuery('Brussels')}
      onBlur={() => onLabelChange(placeNameCache.current)}
      onInputChange={(t: string): void => {
        onLabelChange(t);
        setQuery(t || 'brussels');
      }}
      onSelect={(p: any) => {
        const newLoc: LngLat = {
          longitude: p.geometry.location.lng,
          latitude: p.geometry.location.lat
        };
        onSelect(newLoc);
      }}
      valueAcc={(d: any) => d.formatted_address}
      filterFn={() => true}
      idAcc={(d: any) => d.place_id}
    />
  ) : (
    <div className={className} style={style}>
      {label}
    </div>
  );
};
export default GoToPlace;
