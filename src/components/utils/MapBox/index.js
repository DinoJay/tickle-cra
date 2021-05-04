import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';
import 'mapbox-gl/dist/mapbox-gl.css';
import Marker from './Marker';
import Directions from './Directions';
import Feature from './Feature';
import Circle from './Circle';
export const MapContext = React.createContext({
    map: null,
    updateMap: () => null,
    layers: []
});
mapboxgl.accessToken = process.env.MapboxAccessToken;
function withinRadius({ x: x0, y: y0 }, { x: x1, y: y1 }, r) {
    const dist = (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
    r *= r;
    if (dist < r) {
        return true;
    }
    return false;
}
export const getViewport = (m) => {
    // TODO
    const { lng, lat } = m.getCenter();
    return {
        zoom: +m.getZoom(),
        longitude: +lng,
        latitude: +lat,
        width: 664,
        height: 1000 // m.getCanvas().height
    };
};
export const shiftCenterMap = ({ map, latitude: oldLat, longitude: oldLong }) => {
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
const useResetUpdate = (fn, arr, wait) => {
    const timeoutRef = useRef();
    useDidUpdateEffect(() => {
        const id = timeoutRef.current;
        clearTimeout(id);
        const newId = setTimeout(() => fn(), wait);
        if (newId)
            timeoutRef.current = newId;
        return () => clearTimeout(id);
    }, arr);
};
const MapBox = (props, ref) => {
    const { style, className, zoom = 12, longitude = 0, latitude = 0, 
    // onViewportChange,
    children, cursor, onClick, open = false } = props;
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const contDomRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    // const [dim, setDim] = useState([0, 0]);
    useEffect(() => {
        if (cursor && mapRef.current)
            mapRef.current.getCanvas().style.cursor = cursor;
    }, [cursor]);
    const layersRef = useRef([]);
    const flyingRef = useRef();
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
        if (!contDomRef.current)
            return () => null;
        const m = new mapboxgl.Map({
            container: contDomRef.current,
            style: 'mapbox://styles/mapbox/streets-v9',
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
            .on('click', (e) => {
            const { lng, lat } = e.lngLat;
            // TODO
            const positions = layersRef.current.map(d => d._pos);
            if (positions.find(p => withinRadius(p, e.point, 20)))
                return;
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
        if (ref)
            ref.current = m;
        layersRef.current = [];
        return () => {
            map && map.remove();
            setMap(null);
        };
    }, []);
    useResetUpdate(() => {
        const m = mapRef.current;
        if (!m)
            return () => null;
        const vp = getViewport(m);
        if (vp.longitude !== longitude ||
            vp.latitude !== latitude ||
            vp.zoom !== zoom) {
            m.flyTo({ center: [longitude, latitude] });
        }
        return () => null;
    }, [longitude, latitude, zoom], 200);
    return (React.createElement(MapContext.Provider, { value: {
            map,
            updateMap: () => null,
            layers: layersRef.current
        } },
        React.createElement("div", { ref: contDomRef, style: { ...style }, className: className }),
        loaded && children));
};
export default React.forwardRef(MapBox);
