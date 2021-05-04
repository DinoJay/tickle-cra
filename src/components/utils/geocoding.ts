export const forwardGeoCoding = (addr: string): string =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&region=be&key=${
    process.env.GoogleGeocoding
  }`;

export const reverseGeoCoding = (lngLat: [number, number]) =>
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
    lngLat[1]
  },${lngLat[0]}&key=${process.env.GoogleGeocoding}`;
