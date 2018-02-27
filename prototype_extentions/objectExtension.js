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

function cloneObj(obj) {
  let clonedObj = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) clonedObj[key] = obj[key]
  }

  return clonedObj
}

function extend(child, parent) {
  let hasProp = {}.hasOwnProperty
  for (let key in parent) {
    if (hasProp.call(parent, key)) child[key] = parent[key]
  }

  function ctor() {
    this.constructor = child
  }

  ctor.prototype = parent.prototype
  child.prototype = new ctor()
  child.__super__ = parent.prototype
  return child
}

Object.prototype.inherit = function (parent) {
  this.prototype = Object.create(parent.prototype)
  this.prototype.constructor = this
}