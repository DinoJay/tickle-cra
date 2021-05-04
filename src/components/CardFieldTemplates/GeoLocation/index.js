import React, { useEffect, useState } from 'react';
import mbxGeoCoding from '@mapbox/mapbox-sdk/services/geocoding';
import { ModalBody } from '~/components/utils/Modal';
import { LOC } from '~/constants/cardFields';
import PreviewFrame from '../PreviewFrame';
import { EditLocationMap, ViewLocationMap } from './LocationMap';
import { reverseGeoCoding } from '~/components/utils/geocoding';
import makeCancelable from '~/components/utils/abortPromise';
import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';
import delay from '~/components/utils/delayPromise';
export const label = 'Location';
export const key = LOC;
export const required = true;
const geoCodingClient = mbxGeoCoding({
    accessToken: process.env.MapboxAccessToken
});
const GeoLabel = props => {
    const { className, style, latitude, longitude } = props;
    const promiseRef0 = React.useRef();
    const [name, setName] = useState();
    useEffect(() => {
        const pr0Current = promiseRef0.current;
        if (pr0Current)
            pr0Current.cancel();
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=poi&access_token=${process.env.MapboxAccessToken}`).then(res => res.json().then(data => console.log('data', data)));
        promiseRef0.current = makeCancelable(delay(400)
            .then(() => geoCodingClient
            .reverseGeocode({
            mode: 'mapbox.places',
            query: [longitude, latitude]
        })
            .send()
            .then((response) => {
            const match = response.body;
            return match;
        }))
            .then((res) => {
            setName(res.features[0].place_name);
        }));
    }, []);
    return (React.createElement("div", { className: className, style: style }, name));
};
export const ModalContent = props => {
    const { modalProps, onChange, disabled } = props;
    return (React.createElement(ModalBody, Object.assign({}, modalProps, { className: "flex flex-col flex-grow" }), disabled ? (React.createElement(ViewLocationMap, Object.assign({}, props, { className: "flex-grow" }))) : (React.createElement(EditLocationMap, Object.assign({ className: "w-full flex-grow" }, props, { onChange: (loc) => onChange({ key, label, value: loc }) })))));
};
export const View = props => {
    const { modalProps, onClose, loc } = props;
    return (React.createElement(ModalBody, Object.assign({}, modalProps, { onClose: onClose, className: "flex flex-col flex-grow", header: React.createElement(GeoLabel, Object.assign({ className: "text-lg" }, loc.value)) }),
        React.createElement(ViewLocationMap, Object.assign({ className: "flex-grow" }, props))));
};
export const Preview = ({ onClick, loc }) => {
    const [locLabel, setLocLabel] = useState(null);
    const { hidden, radius } = loc.value;
    useEffect(() => {
        if (loc.value) {
            const lngLat = [loc.value.longitude, loc.value.latitude];
            const pr = makeCancelable(delay(500)
                .then(() => fetch(reverseGeoCoding(lngLat)).then(function (response) {
                return response.json();
            }))
                .then(function (resp) {
                const { formatted_address } = resp.results[0];
                if (formatted_address)
                    setLocLabel(formatted_address);
            }));
            return () => pr.cancel();
        }
        return () => null;
    }, [useDeepCompareMemoize(loc.value)]);
    // TODO
    return (React.createElement(PreviewFrame, { onClick: onClick, placeholder: "GeoLocation", type: label, empty: loc.value === null, content: () => (React.createElement("div", { className: "text-grey-dark" },
            React.createElement("div", { className: "text-truncate" }, locLabel),
            React.createElement("div", { className: "italic" },
                React.createElement("div", { className: "" },
                    React.createElement("div", null, hidden ? 'hidden' : 'visible'),
                    radius !== null && (React.createElement("div", { className: "ml-1 hidden" },
                        "radius: ",
                        radius,
                        "m")))))) }));
};
