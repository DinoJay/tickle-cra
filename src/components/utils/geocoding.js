export const forwardGeoCoding = (addr) => `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&region=be&key=${process.env.GoogleGeocoding}`;
export const reverseGeoCoding = (lngLat) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lngLat[1]},${lngLat[0]}&key=${process.env.GoogleGeocoding}`;
