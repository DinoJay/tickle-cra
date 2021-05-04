import React, { useEffect, useState } from 'react';
import X from 'react-feather/dist/icons/x';
import { Img } from '~/constants/typeUtils';

import delay from '~/components/utils/delayPromise';
import ABC from '~/components/utils/abc';

import makeCancelable from '~/components/utils/abortPromise';

import { reverseGeoCoding } from '~/components/utils/geocoding';

// import {BlackModal, ModalBody} from '~/components/utils/Modal';

const locField = 'formatted_address';

export const ATTRACTION = 'ATTRACTION';
export const STAR = 'STAR';
export const ANIMAL = 'ANIMAL';
export const DEFAULT = 'DEFAULT';

export const wpTypes = [ATTRACTION, STAR, ANIMAL, DEFAULT];

export type WPtype = typeof ATTRACTION | typeof STAR | typeof ANIMAL | typeof DEFAULT;

export type WP = {
  text?: string;
  img?: Img;
  type: WPtype;
  loc: [number, number];
  label: string;
  id: string;
  order: number;
};

type LocBtnType = {
  className: string;
  onClick: Function;
  loc: [number, number];
  style?: React.CSSProperties;
};

export const useGetLocName = ({
  latitude,
  longitude,
  onChange
}: {
  latitude: number | null;
  longitude: number | null;
  onChange: Function; // (a: string) => any;
}) => {
  const promiseRef0 = React.useRef<{ cancel: Function }>();
  useEffect(() => {
    if (latitude && longitude) {
      if (promiseRef0.current) promiseRef0.current.cancel();
      promiseRef0.current = makeCancelable(
        delay(400)
          .then(() =>
            fetch(reverseGeoCoding([longitude, latitude])).then(
              function (response) {
                return response.json();
              }
            )
          )
          .then(res => {
            const name = Array.isArray(res.results)
              ? res.results[0][locField]
              : '';
            onChange(name);
          })
      );
    }
  }, [latitude, longitude]);
};

const LocBtn: React.FC<LocBtnType> = props => {
  const { className, onClick, loc, style } = props;
  const [longitude, latitude] = loc;
  const [label, setLabel] = useState(null);

  useGetLocName({ latitude, longitude, onChange: setLabel });

  return (
    <button
      onClick={() => onClick(label)}
      disabled={!label}
      type="button"
      className={className}
      style={style}>
      {label}
    </button>
  );
};

type WaypointsType = {
  waypoints: WP[];
  onClick: (a: string) => any;
  removeWayPoint: Function;
  style?: React.CSSProperties;
  className: string;
  disabled: boolean;
};

const WayPoints: React.FC<WaypointsType> = props => {
  const {
    waypoints,
    onClick,
    // updateWayPoint,
    removeWayPoint,
    className,
    style,
    disabled
  } = props;

  return (
    <div className={className} style={style}>
      {waypoints.map((w: WP, i: number) => (
        <div
          key={w.id}
          className="flex items-center text-base bg-white border-b-2 p-1">
          <div className="mr-2">{ABC[i]}</div>
          <LocBtn
            onClick={() => onClick(w.id)}
            className="truncate flex-grow"
            style={{
              // TODO
              maxWidth: 250
            }}
            key={w.id}
            loc={w.loc}
          />
          <div className="ml-auto items-center ">
            <button
              disabled={disabled}
              type="button"
              className={`text-white btn bg-black ${disabled &&
                'disabled'}`}
              onClick={() => removeWayPoint(w.id)}>
              <X />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default WayPoints;
