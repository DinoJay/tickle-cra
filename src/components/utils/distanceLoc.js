// export default function distance(
//   { latitude: lat1, longitude: lon1 },
//   { latitude: lat2, longitude: lon2 }
// ) {
//   const radlat1 = (Math.PI * lat1) / 180;
//   const radlat2 = (Math.PI * lat2) / 180;
//   // const radlon1 = (Math.PI * lon1) / 180;
//   // const radlon2 = (Math.PI * lon2) / 180;
//   const theta = lon1 - lon2;
//   const radtheta = (Math.PI * theta) / 180;
//   let dist =
//     Math.sin(radlat1) * Math.sin(radlat2) +
//     Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//   dist = Math.acos(dist);
//   dist = (dist * 180) / Math.PI;
//   dist = dist * 60 * 1.1515;
//   dist *= 1.609344;
//   return dist * 1000;
// }

const earthRadius = 6371;

export default function calculateDistance(posA, posB) {
  const lat = posB.latitude - posA.latitude; // Difference of latitude
  const lon = posB.longitude - posA.longitude; // Difference of longitude

  const disLat = (lat * Math.PI * earthRadius) / 180; // Vertical distance
  const disLon = (lon * Math.PI * earthRadius) / 180; // Horizontal distance

  let ret = Math.pow(disLat, 2) + Math.pow(disLon, 2);
  ret = Math.sqrt(ret); // Total distance (calculated by Pythagore: a^2 + b^2 = c^2)

  return ret;
}
