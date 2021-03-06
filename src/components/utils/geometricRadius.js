const metersPerPixel = function (latitude, zoomLevel) {
    const earthCircumference = 40075017;
    const latitudeRadians = latitude * (Math.PI / 180);
    return ((earthCircumference * Math.cos(latitudeRadians)) /
        2 ** (zoomLevel + 8));
};
export const geometricRadius = (latitude, meters, zoomLevel) => meters / metersPerPixel(latitude, zoomLevel);
export const distanceLoc = ({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 }) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    // const radlon1 = (Math.PI * lon1) / 180;
    // const radlon2 = (Math.PI * lon2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist *= 1.609344;
    return dist * 1000;
};
