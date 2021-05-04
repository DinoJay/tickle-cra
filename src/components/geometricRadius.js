const metersPerPixel = function (latitude, zoomLevel) {
    const earthCircumference = 40075017;
    const latitudeRadians = latitude * (Math.PI / 180);
    return ((earthCircumference * Math.cos(latitudeRadians)) /
        2 ** (zoomLevel + 8));
};
export default function geometricRadius(latitude, meters, zoomLevel) {
    return meters / metersPerPixel(latitude, zoomLevel);
}
