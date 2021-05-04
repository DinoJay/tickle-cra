// export const geoProject = ({viewport, data}) => {
//   const {width, height} = viewport;
//   return data.reduce((acc, n) => {
//     const [x, y] = viewport.project([
//       n.loc.value.longitude,
//       n.loc.value.latitude
//     ]);
//     if (x > 0 && x < width && y > 0 && y < height) {
//       return [{...n, x, y}, ...acc];
//     }
//     return acc;
//   }, []);
// };
