export default function lookUpByKey(arr, dict, key = 'id') {
  return arr ? arr.map(id => dict.find(t => t[key] === id)) : [];
}
