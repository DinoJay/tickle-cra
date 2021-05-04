import React, { useEffect } from 'react';
import uuidv1 from 'uuid/v1';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';
import { MapContext } from './index';
const Line = props => {
    const { coordinates, paint = {}, id, color, layer = {} } = props;
    const { map } = React.useContext(MapContext);
    const idRef = React.useRef();
    useEffect(() => {
        idRef.current = id || uuidv1();
        // map.removeLayer(idRef.current);
        map &&
            map.addLayer({
                id: idRef.current,
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates
                        }
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': color || '#4882c5',
                    'line-width': 7,
                    ...paint
                },
                // paint: {
                //   'line-color': '#3887be',
                //   'line-width': 5,
                //   'line-opacity': 0.75
                // },
                ...layer
            });
        return () => {
            if (map && idRef.current) {
                map.removeSource(idRef.current);
                map.removeLayer(idRef.current);
            }
        };
    }, [useDeepCompareMemoize(coordinates)]);
    // useEffect(() => () => map.removeLayer(idRef.current));
    return React.createElement(React.Fragment, null);
};
export default Line;
