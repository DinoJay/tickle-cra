import React, { useState, useEffect, useRef } from 'react';
import Geocoding, { BoundingBox } from '@mapbox/mapbox-sdk/services/geocoding';
import { theme } from 'Tailwind';
import { Marker } from '~/components/utils/MapBox';
import { BlackModal } from '~/components/utils/Modal';
import ConnectedEditCard from '~/components/cards/ConnectedEditCard';

interface MapPOIType {
  bounds: any;
  mapRef: any;
  cards: any;
}

const { colors } = theme;

const MapPOI: React.FC<MapPOIType> = props => {
  const { bounds, mapRef, cards } = props;

  const cardLocations = cards.map(c => [
    c.loc.value.longitude,
    c.loc.value.latitude
  ]);

  console.log(cardLocations);

  const placeTypes = ['museum', 'cinema', 'concert hall', 'park'];
  const [bnds, setBnds] = useState(bounds);
  const [places, setPlaces] = useState([]);
  const [selectedType, setSelectedType] = useState(placeTypes[0]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const mbxGeocoding = Geocoding({
    accessToken: process.env.MapboxAccessToken as string
  });

  const getPlaces = (type, bounds: any) =>
    mbxGeocoding
      .forwardGeocode({
        mode: 'mapbox.places',
        // @ts-ignore
        bbox: [
          bounds.getSouthWest().lng,
          bounds.getSouthWest().lat,
          bounds.getNorthEast().lng,
          bounds.getNorthEast().lat
        ],
        countries: ['BE'],
        types: ['poi'],
        query: type
      })
      .send();

  useEffect(() => {
    if (bounds) {
      getPlaces(selectedType, bounds).then(response => {
        setPlaces(response.body.features);
        setBnds(bounds);
      });
    }
  }, [bounds]);

  useEffect(() => {
    if (bnds) {
      getPlaces(selectedType, bnds).then(response =>
        setPlaces(response.body.features)
      );
    }
  }, [selectedType]);

  useEffect(() => {
    mapRef.current.on('moveend', e => {
      const bounds = e.target.getBounds();
      getPlaces(selectedType, bounds).then(response => {
        setPlaces(response.body.features);
        setBnds(bounds);
      });
    });

    return () => { };
  }, [mapRef]);

  return (
    <div>
      <BlackModal className="flex-grow m-auto" visible={showCard}>
        <ConnectedEditCard
          title={{ key: 'title', value: selectedPlace?.text }}
          loc={{
            key: 'loc',
            value: {
              latitude: selectedPlace?.center[1],
              longitude: selectedPlace?.center[0],
              radius: Infinity
            }
          }}
          onClose={() => setShowCard(false)}
        />
      </BlackModal>
      <div className="absolute bg-white px-4 py-4 top-0 right-0">
        {placeTypes.map(pt => (
          <div key={pt} className="flex flex-row items-center">
            <input
              className="mr-4"
              type="radio"
              name="radio"
              defaultChecked={pt === selectedType}
              onChange={() => setSelectedType(pt)}
            />
            <p>{pt.replace(/^\w/, c => c.toUpperCase())}</p>
          </div>
        ))}

        {places
          .filter(
            p =>
              !cardLocations.some(
                cl => cl[0] === p.center[0] && cl[1] === p.center[1]
              )
          )
          .map(p => (
            <Marker
              key={p.id}
              onClick={() => {
                setSelectedPlace(p);
                setShowCard(true);
              }}
              popupEl={<p>{p.text}</p>}
              color={colors.blue[600]}
              longitude={p.center[0]}
              latitude={p.center[1]}
            />
          ))}
      </div>
    </div>
  );
};

export default MapPOI;
