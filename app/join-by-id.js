
const joinById = (list, details) => {
  return list.map(obj => Object.assign({}, obj, { discovery: details.find(inner => inner.id === obj.id) }));  //joinById: 0.334ms
}

const joinById2 = (list, details) => {
  let result = {}, len = details.length;
  for (let ii = 0; ii < len; ii++) {
    result[details[ii].id] = details[ii]; //joinById2: 0.156ms
  }

  // result = Object.assign({}, ...details.map(itm => ({ [itm.id]: itm }))); // joinById2: 0.248ms
  return list.map(item => ({...item, discovery: result[item.id]}));
}

module.exports = {
  joinById,
  joinById2
}