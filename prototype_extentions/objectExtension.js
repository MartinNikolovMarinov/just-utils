// Globals
function sortObjectByKeys(obj, sortFn) {
  let ret = {}
  let keys = []

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) keys.push(key)
  }

  if (sortFn === undefined) keys.sort()
  else sortFn(keys)

  let len = keys.length
  for (let i = 0; i < len; i++) {
    ret[keys[i]] = obj[keys[i]]
  }

  return ret
}

function cloneObject(obj) {
  if (['undefined', 'boolean', 'number', 'string', 'symbol'].indexOf(typeof obj) > 0) {
    return obj;
  }

  const clone = {};
  _cloneObject(obj, clone);
  return clone;
}

const _cloneObject = (obj, clone) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        clone[key] = [];
        _cloneObject(value, clone[key]);
      } else if (value !== null && typeof value === 'object') {
        clone[key] = {};
        _cloneObject(value, clone[key]);
      } else {
        clone[key] = value;
      }
    }
  }
}
