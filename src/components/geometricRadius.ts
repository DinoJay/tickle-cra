const metersPerPixel = function(latitude: number, zoomLevel: number) {
  const earthCircumference = 40075017;
  const latitudeRadians = latitude * (Math.PI / 180);
  return (
    (earthCircumference * Math.cos(latitudeRadians)) /
    2 ** (zoomLevel + 8)
  );
};

export default function geometricRadius(
  latitude: number,
  meters: number,
  zoomLevel: number
) {
  return meters / metersPerPixel(latitude, zoomLevel);
}
