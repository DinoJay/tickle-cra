import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl, {Marker as MapboxMarker} from 'mapbox-gl';
import uuidv1 from 'uuid/v1';
import {theme} from 'Tailwind';
import {LngLat} from '~/constants/typeUtils';

// import MarkerElement from './MarkerElement';

import {MapContext} from './index';

import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

interface MyMarker extends MapboxMarker {
  _id: string;
}

// const noop = () => false;

const Marker: React.FC<{
  longitude: number;
  latitude: number;
  className?: string;
  draggable?: boolean;
  onClick?: ({latitude, longitude, id}: LngLat & {id: string}) => any;
  onDragEnd?: (a: LngLat) => any;
  // onDrag?: Function;
  color?: string;
  element?: React.ReactNode;
  id?: string;
  popupEl?: JSX.Element;
}> = props => {
  const {
    longitude,
    className,
    draggable,
    latitude,
    onClick = () => null,
    onDragEnd = () => null,
    // onDrag = d => d,
    color = theme.colors.yellow[500],
    element,
    id = uuidv1(),
    popupEl
  } = props;

  const {map} = React.useContext(MapContext);
  const {layers} = React.useContext(MapContext);

  const markerRef = React.useRef<MapboxMarker | null>(null);

  const createMarker = () => {
    let outerEl: HTMLDivElement | null = null;

    if (element) {
      outerEl = document.createElement('div');
      if (outerEl) {
        (outerEl as any).className = `marker${className}`;
        (outerEl as any).id = id;
        ReactDOM.render(element as JSX.Element, outerEl);
      }
    }

    const marker = new mapboxgl.Marker({
      element: outerEl as any,
      draggable,
      color
    })
      .on('dragend', () => {
        const {lng: longitude, lat: latitude} = marker.getLngLat();
        onDragEnd({longitude, latitude});
      })
      // .on('drag', () => {
      //   const {lng, lat} = marker.getLngLat();
      //   onDrag({longitude: lng, latitude: lat});
      // })
      .setLngLat({lng: longitude, lat: latitude});
    // .setPopup(popup)
    if (map) marker.addTo(map);

    if (popupEl) {
      const popup = new mapboxgl.Popup({offset: 25});

      const pEL = document.createElement('div');
      const att = document.createAttribute('class');
      att.value = 'z-50';
      pEL.setAttributeNode(att);
      ReactDOM.render(popupEl, pEL);

      popup.setDOMContent(pEL);

      marker.setPopup(popup);

      marker
        .getElement()
        .addEventListener('click', () =>
          onClick({latitude, longitude, id})
        );
    }

    if (!popupEl) {
      marker
        .getElement()
        .addEventListener('click', () =>
          onClick({latitude, longitude, id})
        );
    }
    return marker as MyMarker;
  };

  useEffect(() => {
    if (!map) return () => null;

    const marker = createMarker();
    // TODO check if this works
    // TODO check if this works
    // TODO check if this works
    // TODO check if this works
    marker._id = id;
    // marker.type='marker';
    markerRef.current = marker;

    layers.push(marker);

    return () => {
      marker.remove();
      layers.current = layers.filter((d: MyMarker) => d._id !== id);
    };
    // TODO does it really work with element check???
    // TODO does it really work with element check???
  }, [color, useDeepCompareMemoize(element), id]);

  useEffect(() => {
    const marker = markerRef.current;

    marker && marker.setLngLat([longitude, latitude]);

    // return () =>{
    //   layers.current = layers.current.filter(d => d.id !== id);
    // }
  }, [latitude, longitude]);

  return <></>;
};
export default Marker;
