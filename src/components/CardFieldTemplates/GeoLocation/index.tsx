import React, {useEffect, useState} from 'react';
import mbxGeoCoding from '@mapbox/mapbox-sdk/services/geocoding';

import {ModalBody, ModalProps} from '~/components/utils/Modal';

import {LOC, Loc, Card} from '~/constants/cardFields';

import PreviewFrame from '../PreviewFrame';
import {EditLocationMap, ViewLocationMap} from './LocationMap';

import {reverseGeoCoding} from '~/components/utils/geocoding';

import makeCancelable, {
  PromiseType
} from '~/components/utils/abortPromise';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import delay from '~/components/utils/delayPromise';

export const label = 'Location';
export const key = LOC;
export const required = true;

const geoCodingClient = mbxGeoCoding({
  accessToken: process.env.MapboxAccessToken as string
});

const GeoLabel: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  latitude: number;
  longitude: number;
}> = props => {
  const {className, style, latitude, longitude} = props;

  const promiseRef0 = React.useRef();
  const [name, setName] = useState();

  useEffect(() => {
    const pr0Current = promiseRef0.current as PromiseType | undefined;
    if (pr0Current) pr0Current.cancel();

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
              mode: 'mapbox.places',
              query: [longitude, latitude]
            })
            .send()
            .then((response: any) => {
              const match = response.body;
              return match;
            })
        )
        .then((res: any) => {
          setName(res.features[0].place_name);
        })
    );
  }, []);
  return (
    <div className={className} style={style}>
      {name}
    </div>
  );
};

type EditLocationMapType = {
  modalProps: ModalProps;
  onChange: Function;
  disabled: boolean;
};

export const ModalContent: React.FC<
  EditLocationMapType & Card
> = props => {
  const {modalProps, onChange, disabled} = props;

  return (
    <ModalBody {...modalProps} className="flex flex-col flex-grow">
      {disabled ? (
        <ViewLocationMap {...props} className="flex-grow" />
      ) : (
        <EditLocationMap
          className="w-full flex-grow"
          {...props}
          onChange={(loc: object): void =>
            onChange({key, label, value: loc})
          }
        />
      )}
    </ModalBody>
  );
};

type ViewType = {
  modalProps: ModalProps;
  onClose: Function;
};

export const View: React.FC<Card & ViewType> = props => {
  const {modalProps, onClose, loc} = props;

  return (
    <ModalBody
      {...modalProps}
      onClose={onClose}
      className="flex flex-col flex-grow"
      header={<GeoLabel className="text-lg" {...loc.value} />}>
      <ViewLocationMap className="flex-grow" {...props} />
    </ModalBody>
  );
};

export const Preview: React.FC<{onClick: Function; loc: Loc}> = ({
  onClick,
  loc
}) => {
  const [locLabel, setLocLabel] = useState(null);

  const {hidden, radius} = loc.value;

  useEffect(() => {
    if (loc.value) {
      const lngLat = [loc.value.longitude, loc.value.latitude] as [
        number,
        number
      ];

      const pr = makeCancelable(
        delay(500)
          .then(() =>
            fetch(reverseGeoCoding(lngLat)).then(function(response) {
              return response.json();
            })
          )
          .then(function(resp: {results: any[]}) {
            const {formatted_address} = resp.results[0];
            if (formatted_address) setLocLabel(formatted_address);
          })
      );
      return (): void => pr.cancel();
    }
    return () => null;
  }, [useDeepCompareMemoize(loc.value)]);

  // TODO
  return (
    <PreviewFrame
      onClick={onClick}
      placeholder="GeoLocation"
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
