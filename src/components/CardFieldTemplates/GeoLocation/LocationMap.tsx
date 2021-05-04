import React, { useState } from "react";
// import PropTypes from 'prop-types';
// import MapGL from '~/components/utils/Map';
import MapBox, { Marker, Circle } from "~/components/utils/MapBox";

import { Card, LngLat } from "~/constants/cardFields";
import DetailsFrame from "~/components/utils/DetailsFrame";
// import {parseTime, formatTime} from '~/components/utils/time';

import GoToPlace from "~/components/utils/GoToPlace";

const RADIUS_50 = 50;
const RADIUS_200 = 200;
const RADIUS_500 = 500;
const RADIUS_INFINITY = Infinity;

const GoToPlaceWrapper: React.FC<any> = props => {
  const [label, setLabel] = useState<string>("");

  return (
    <GoToPlace
      input
      {...props}
      onLabelChange={setLabel}
      label={label}
      inputClassName="form-input w-full"
    />
  );
};

type ContactFormType = {
  hidden?: boolean;
  radius?: number;
  emailContact?: string | null;
  lngLat?: LngLat;
  telephone?: string | null;
  comment?: string | null;
  untilCollected?: boolean;
  endDateTime?: string | null;
  startDateTime?: string | null;
  className?: string;
};

const ContactForm: React.FC<
  ContactFormType & {
    onChange: Function;
    onSelect: Function;
  }
> = props => {
  const {
    hidden,
    lngLat,
    radius = Infinity,
    emailContact,
    telephone,
    comment,
    untilCollected = false,
    endDateTime,
    startDateTime,
    className,
    onChange,
    onSelect
  } = props;

  const btnClass = (m: number): string =>
    `${m === radius && "btn-active"} btn p-1 flex-grow`;

  const radians = [RADIUS_50, RADIUS_200, RADIUS_500, RADIUS_INFINITY];
  const onChangeMerge = (opts: ContactFormType) => {

    onChange({
      radius,
      hidden,
      untilCollected,
      startDateTime,
      endDateTime,
      emailContact,
      telephone,
      comment,
      ...opts
    });
  };

  const [contactOpen, setContactOpen] = React.useState(false);
  const [showCardOpen, setShowCardOpen] = React.useState(false);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-4">
        <label className="form-label" htmlFor="search">
          Address
        </label>
        <GoToPlaceWrapper
          location={lngLat}
          className="w-full"
          inputClassName="border-2 w-full text-xl p-2 flex-grow"
          liClassName="text-xl"
          onSelect={onSelect}
        />
      </div>
      <DetailsFrame
        open={contactOpen}
        onClick={(): void => setContactOpen(!contactOpen)}
        header={<h2 className="p-1">Contact</h2>}
        className="mb-4 "
      >
        <div className="flex m-2 p-2 flex-wrap">
          <div className="mr-4">
            <label className="form-label" htmlFor="search">
              Email
            </label>
            <input
              className="form-input"
              id="email"
              type="email"
              placeholder="Email"
              value={emailContact || ""}
              onChange={(e): void =>
                onChangeMerge({ emailContact: e.target.value })
              }
            />
          </div>
          <div className="">
            <label className="form-label" htmlFor="search">
              Telephone
            </label>
            <input
              className="form-input"
              id="telephone"
              type="number"
              value={telephone || ""}
              placeholder="Telephone"
              onChange={e => onChangeMerge({ telephone: e.target.value })}
            />
          </div>
        </div>
      </DetailsFrame>

      <DetailsFrame
        className="mb-3"
        open={showCardOpen}
        onClick={() => setShowCardOpen(!showCardOpen)}
        header={<h2 className="p-1">Show Card</h2>}
      >
        <div className="flex flex-col flex-wrap ">
          <div className="flex">
            <div className="mb-4 mr-4">
              <label className="form-label">Until collected:</label>
              <input
                id="hidden"
                className="m-1"
                type="checkbox"
                checked={untilCollected}
                onChange={(): void => {
                  onChangeMerge({ untilCollected: !untilCollected });
                }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Until in range:</label>
              <div className="flex mb-1">
                {radians.map(r => (
                  <button
                    key={r}
                    type="button"
                    className={btnClass(r)}
                    onClick={(): void => onChangeMerge({ radius: r })}
                  >
                    {r}
                    {typeof r === "number" && "m"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4 w-full">
            <div>
              <label className="form-label">Start:</label>
              <input
                id="hidden"
                className="m-1 form-input"
                type="datetime-local"
                value={startDateTime || ""}
                onChange={(e): void => {
                  onChangeMerge({ startDateTime: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="form-label">End:</label>
              <input
                className="m-1 form-input"
                type="datetime-local"
                value={endDateTime || ""}
                onChange={(e): void => {
                  onChangeMerge({ endDateTime: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="Name">
            Comment
          </label>
          <textarea
            style={{ resize: "none" }}
            className="overflow-y-auto form-input w-full"
            id="comment"
            placeholder="Comment"
            onChange={(e): void => {
              onChangeMerge({ comment: e.target.value });
            }}
          >
            {comment}
          </textarea>
        </div>
      </DetailsFrame>
    </div>
  );
};

type EditLocationMapType = Card & {
  className?: string;
  onChange: Function;
};

export const EditLocationMap: React.FC<EditLocationMapType> = props => {
  const { loc, id, className, onChange } = props;

  const [mapViewport, setMapViewport] = useState<LngLat & { zoom: number }>({
    zoom: 14,
    ...loc.value
  });

  const { longitude, latitude, ...accOpts } = loc.value;
  const {
    emailContact = null,
    telephone = null,
    comment = null,
    startDateTime = null,
    endDateTime = null
  } = accOpts;

  const defaulAccOpts = {
    radius: RADIUS_INFINITY,
    hidden: false,
    untilCollected: false,
    ...accOpts
  };

  const lngLat = { longitude, latitude };

  // const cardDrop = (l: LngLat) => {
  //   onChange({...l, ...accOpts});
  // };

  // console.log('defaulAccOpts', defaulAccOpts);

  return (
    <div className={`${className} flex flex-col relative`}>
      <ContactForm
        {...defaulAccOpts}
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        emailContact={emailContact}
        telephone={telephone}
        comment={comment}
        lngLat={lngLat}
        onSelect={(l: LngLat): void => {
          onChange({ ...l, ...accOpts });
          setMapViewport({
            ...mapViewport,
            ...l
          });
        }}
        onChange={(acc: {
          radius: number;
          hidden: boolean;
          untilCollected: boolean;
        }): void => {
          onChange({ ...lngLat, ...acc });
        }}
      />
      <div className="flex flex-col flex-grow">
        <MapBox className="flex-grow" {...props} {...mapViewport}>
          <Marker
            color={accOpts.hidden ? "grey" : "#f2d024"}
            draggable
            {...loc.value}
            onDragEnd={(geoLoc: LngLat): void =>
              onChange({ ...geoLoc, ...accOpts })
            }
          />
          {accOpts !== null && (
            <Circle id={id} {...loc.value} radiusInM={accOpts.radius} />
          )}
        </MapBox>
      </div>
    </div>
  );
};

export const ViewLocationMap: React.FC<Card> = props => {
  const { loc, id } = props;
  const { longitude: _, latitude: __, ...accOpts } = loc.value;

  const { endDateTime, startDateTime, radius /* , hidden */ } = loc.value;
  const mvp = { zoom: 14, ...loc.value };
  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="flex flex-wrap justify-between mb-2">
        {endDateTime && startDateTime && (
          <>
            <div>
              <h2>Start:</h2>
              <div>{startDateTime}</div>
            </div>
            <div>
              <h2>End:</h2>
              <div>{endDateTime}</div>
            </div>
          </>
        )}
        {radius && (
          <div>
            <h2>Radius:</h2>
            <div>
              {radius} {typeof radius === "number" && "m"}
            </div>
          </div>
        )}
      </div>

      <MapBox className="relative z-40" {...props} {...mvp}>
        <Marker color={accOpts.hidden ? "grey" : "#f2d024"} {...loc.value} />
        {accOpts !== null && (
          <Circle id={id} {...loc.value} radiusInM={accOpts.radius} />
        )}
      </MapBox>
    </div>
  );
};
