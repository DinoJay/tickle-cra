import React, { useState, useEffect, useRef } from 'react';

import mapboxgl, { Map, MapMouseEvent } from 'mapbox-gl';
import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';

import 'mapbox-gl/dist/mapbox-gl.css';

import Marker from './Marker';
import Directions from './Directions';
import Feature from './Feature';
import Circle from './Circle';

export interface MapContextInterface {
  map: Map | null;
  updateMap: Function;
  layers: any;
}

export const MapContext = React.createContext<MapContextInterface>({
  map: null,
  updateMap: () => null,
  layers: []
});

mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken as string;

function withinRadius(
  { x: x0, y: y0 }: { x: number; y: number },
  { x: x1, y: y1 }: { x: number; y: number },
  r: number
): boolean {
  const dist = (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
  r *= r;
  if (dist < r) {
    return true;
  }
  return false;
}

export const getViewport = (
  m: Map
): {
  zoom: number;
  longitude: number;
  latitude: number;
  width: number;
  height: number;
} => {
  // TODO
  const { lng, lat } = m.getCenter();
  return {
    zoom: +m.getZoom(),
    longitude: +lng,
    latitude: +lat,
    width: 664, // m.getCanvas().width,
    height: 1000 // m.getCanvas().height
  };
};

export const shiftCenterMap = ({
  map,
  latitude: oldLat,
  longitude: oldLong
}: {
  map: Map;
  latitude: number;
  longitude: number;
}): { longitude: number; latitude: number } => {
  const vp = getViewport(map);

  const { height } = vp;
  const { x, y } = map.project([oldLong, oldLat]);

  const { lng: longitude, lat: latitude } = map.unproject([
    x,
    y - height / 8
  ]);

  return { longitude, latitude };
};

export { Marker, Directions, Feature, Circle };

const useResetUpdate = (fn: Function, arr: any[], wait: number) => {
  const timeoutRef = useRef<any>();
  useDidUpdateEffect(() => {
    const id = timeoutRef.current;
    clearTimeout(id);
    const newId = setTimeout(() => fn(), wait);
    if (newId) timeoutRef.current = newId;
    return () => clearTimeout(id);
  }, arr);
};


type MapBoxTypes = {
  style?: React.CSSProperties;
  className?: string;
  zoom: number;
  longitude: number;
  latitude: number;
  children: any;
  // onViewportChange:Function,
  cursor?: any;
  onClick?: Function;
  width?: number;
  height?: number;
  open?: boolean;

}

const MapBox = (props, ref: any) => {
  const {
    style,
    className,
    zoom = 12,
    longitude = 0,
    latitude = 0,
    // onViewportChange,
    children,
    cursor,
    onClick,
    open = false
  } = props;

  const mapRef = useRef<Map | null>(null);

  const [map, setMap] = useState<Map | null>(null);

  const contDomRef = useRef<HTMLDivElement | null>(null);

  const [loaded, setLoaded] = useState(false);
  // const [dim, setDim] = useState([0, 0]);

  useEffect(() => {
    if (cursor && mapRef.current)
      mapRef.current.getCanvas().style.cursor = cursor;
  }, [cursor]);

  const layersRef = useRef<any[]>([]);
  const flyingRef = useRef<boolean>();

  useEffect(() => {
    const resizeFn = () => {
      const resId = setTimeout(() => {
        if (mapRef.current && mapRef.current.resize)
          mapRef.current.resize();
      }, 300);
      return resId;
    };

    window.addEventListener('resize', resizeFn);

    const resizeId = resizeFn();
    return () => {
      window.removeEventListener('resize', resizeFn);
      clearTimeout(resizeId);
    };
  }, [open]);

  useEffect(() => {
    if (!contDomRef.current) return () => null;
    const m = new mapboxgl.Map({
      container: contDomRef.current,
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [longitude, latitude],
      dragRotate: false,
      zoom
    })

      .on('move', () => {
        if (m) {
          // TODO fix that
          // onViewportChange(getVp(m));
        }
      })
      .on('click', (e: MapMouseEvent) => {
        const { lng, lat } = e.lngLat;
        // TODO
        const positions = layersRef.current.map(d => d._pos);

        if (positions.find(p => withinRadius(p, e.point, 20))) return;

        onClick && onClick({ longitude: lng, latitude: lat });
      })
      .on('load', () => {
        mapRef.current = m;
        m.resize();
        setMap(m);
        setLoaded(true);
      })
      .on('flystart', function () {
        flyingRef.current = true;
      })
      .on('flyend', function () {
        flyingRef.current = false;
      });
    if (ref) ref.current = m;

    layersRef.current = [];

    return () => {
      map && map.remove();
      setMap(null);
    };
  }, []);

  useResetUpdate(
    () => {
      const m = mapRef.current;
      if (!m) return () => null;
      const vp = getViewport(m);

      if (
        vp.longitude !== longitude ||
        vp.latitude !== latitude ||
        vp.zoom !== zoom
      ) {
        m.flyTo({ center: [longitude, latitude] });
      }
      return () => null;
    },
    [longitude, latitude, zoom],
    200
  );

  return (
    <MapContext.Provider
      value={{
        map,
        updateMap: () => null,
        layers: layersRef.current
      }}>
      <div ref={contDomRef} style={{ ...style }} className={className} />
      {loaded && children}
    </MapContext.Provider>
  );
};

export default React.forwardRef(MapBox);
