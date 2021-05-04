import React, { useEffect } from 'react';
import uuidv1 from 'uuid/v1';
import { MapContext } from './index';
const createGeoJSONCircle = (center, radiusInM, points = 64) => {
    const coords = {
        latitude: center[1],
        longitude: center[0]
    };
    const km = radiusInM / 1000;
    const ret = [];
    const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;
    let theta;
    let x;
    let y;
    for (let i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);
        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);
    return {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [ret]
                    }
                }
            ]
        }
    };
};
const Circle = props => {
    const { latitude, longitude, paint = {
        'fill-color': '#38c172',
        'fill-opacity': 0.3
    }, radiusInM = 500, id: initId } = props;
    const { map } = React.useContext(MapContext);
    const id = initId || uuidv1();
    const createLayerAndSource = () => {
        if (map) {
            map.addSource(id, createGeoJSONCircle([longitude, latitude], radiusInM));
            map.addLayer({
                id,
                type: 'fill',
                source: id,
                layout: {},
                paint
            });
        }
    };
    useEffect(() => {
        createLayerAndSource();
        return () => {
            if (map) {
                map.removeLayer(id);
                map.removeSource(id);
            }
        };
    }, [longitude, latitude, radiusInM]);
    return null;
};
export default Circle;
