import React, {useEffect, useState} from 'react';
import mbxGeoCoding from '@mapbox/mapbox-sdk/services/geocoding';

import {ModalBody} from '~/components/utils/Modal';

import {LOC} from '~/constants/cardFields';

import PreviewFrame from '../PreviewFrame';
import {EditLocationMap, ViewLocationMap} from './LocationMap';

import {reverseGeoCoding} from '~/components/utils/geocoding';

import makeCancelable from '~/components/utils/abortPromise';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import delay from '~/components/utils/delayPromise';

export const label = 'Location';
export const key = LOC;
export const required = true;

const geoCodingClient = mbxGeoCoding({
  accessToken: process.env.MapboxAccessToken
});

const GeoLabel = props => {
  const {className, style, latitude, longitude} = props;

  const promiseRef0 = React.useRef();
  const [name, setName] = useState();

  useEffect(() => {
    if (promiseRef0.current) promiseRef0.current.cancel();

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=poi&access_token=${
        process.env.MapboxAccessToken
      }`
    ).then(res => res.json().then(data => console.log('data', data)));

    promiseRef0.current = makeCancelable(
      delay(400)
        .then(() =>
          geoCodingClient
            .reverseGeocode({
              query: [longitude, latitude]
            })
            .send()
            .then(response => {
              const match = response.body;
              return match;
            })
        )
        .then(res => {
          const name = res.features[0].place_name;
          setName(name);
        })
    );
  }, []);
  return (
    <div className={className} style={style}>
      {name}
    </div>
  );
};

export const ModalContent = props => {
  const {
    modalProps,
    onChange,
    disabled,
    visible,
    title: initTitle
  } = props;

  return (
    <ModalBody {...modalProps} className="flex flex-col flex-grow">
      {disabled ? (
        <ViewLocationMap {...props} className="flex-grow" />
      ) : (
        <EditLocationMap
          className="w-full flex-grow"
          {...props}
          onChange={loc => onChange({key, label, value: loc})}
        />
      )}
    </ModalBody>
  );
};

export const View = props => {
  const {modalProps, onClose, loc} = props;

  return (
    <ModalBody
      {...modalProps}
      onClose={onClose}
      className="flex flex-col flex-grow"
      header={
        <GeoLabel className="text-lg" input={false} {...loc.value} />
      }>
      <ViewLocationMap className="flex-grow" {...props} />
    </ModalBody>
  );
};

export const Preview = ({onClick, loc}) => {
  const [locLabel, setLocLabel] = useState(null);

  const {hidden, radius} = loc.value;

  useEffect(() => {
    if (loc.value) {
      const lngLat = [loc.value.longitude, loc.value.latitude];

      const pr = makeCancelable(
        delay(500)
          .then(() =>
            fetch(reverseGeoCoding(lngLat)).then(function(response) {
              return response.json();
            })
          )
          .then(function(resp) {
            const {formatted_address} = resp.results[0];
            if (formatted_address) setLocLabel(formatted_address);
          })
      );
      return () => pr.cancel();
    }
  }, [useDeepCompareMemoize(loc.value)]);

  // TODO
  return (
    <PreviewFrame
      onClick={onClick}
      type={label}
      empty={loc.value === null}
      content={() => (
        <div className="text-grey-dark">
          <div className="text-truncate">{locLabel}</div>
          <div className="italic">
            <div className="">
              <div>{hidden ? 'hidden' : 'visible'}</div>

              {radius !== null && (
                <div className="ml-1 hidden">radius: {radius}m</div>
              )}
            </div>
          </div>
        </div>
      )}
    />
  );
};
