import React, { useEffect } from 'react';
import uuidv1 from 'uuid/v1';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';
import { MapContext } from './index';
const Feature = props => {
    const { coordinates = [], geometry = {} } = props;
    const { map } = React.useContext(MapContext);
    useEffect(() => {
        const id = uuidv1();
        map &&
            // Error in typechecking geojson
            // @ts-ignore
            map.addLayer({
                id,
                type: 'fill',
                // type: 'LineString',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coordinates]
                            // properties: {
                            //   stroke: '#00aedb',
                            //   'stroke-width': 2,
                            //   'fill-opacity': 0
                            // },
                        },
                        ...geometry
                    }
                },
                layout: {},
                paint: {
                    'fill-color': '#f2d024',
                    // 'stroke-color': '#088',
                    'fill-opacity': 0.2
                }
            });
        // layers.current = [...layers.current, {id}];
        return () => {
            map && map.removeLayer(id);
        };
    }, [useDeepCompareMemoize(props)]);
    return null;
};
export default Feature;
