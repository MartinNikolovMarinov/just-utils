class StaticInject {
  constructor() {
    this._registry = {}
  }

  register(key, instance) {
    this._registry[key] = instance
  }

  getInstance(key) {
    return this._registry[key]
  }
}

class CtorInject {
  constructor() {
    this._registry = {}
  }

  register(key, ctor) {
    this._registry[key] = ctor
  }

  getCtor(key, args) {
    if (this._registry[key])
      return new this._registry[key](args)
    else
      return null
  }
}