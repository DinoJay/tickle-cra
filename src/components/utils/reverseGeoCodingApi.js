export default function reverseGeoCodingApi(lngLat) {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${
    lngLat[0]
  },${lngLat[1]}.json?access_token=${
    process.env.MapboxAccessToken
  }&limit=1`;
}
