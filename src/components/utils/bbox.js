export default function(coords) {
  const xcoords = coords.map(d => d[0]);
  const ycoords = coords.map(d => d[1]);

  const minX = Math.min(...xcoords);
  const minY = Math.min(...ycoords);
  const maxX = Math.max(...xcoords);
  const maxY = Math.max(...ycoords);

  return [[minX, minY], [maxX, maxY]];
}
