class Guard {
  /**
   * Is NOT undefined or null
   *
   * @param {any} val
   * @returns {boolean}
   */
  isDefined(val) {
    return !this.isNotDefined(val)
  }

  /**
   * Is undefined or null
   *
   * @param {any} val
   * @returns {boolean}
   */
  isNotDefined(val) {
    return typeof val === typeof undefined || val === null
  }

  /**
   * Is number and is NOT NaN, Infinity, or negative Infinity !
   *
   * @param {string} val
   * @returns {boolean}
   */
  isNumber(val) {
    return typeof val === 'number' && isFinite(val)
  }

  /**
   * Is integer number and is NOT NaN, Infinity, or negative Infinity !
   *
   * @param {string} val
   * @returns {boolean}
   */
  isInteger(val) {
    return this.isNumber(val) && Math.floor(value) === value
  }

  /**
   * Is string or object with prototype String.
   *
   * @param {any} val
   * @returns {boolean}
   */
  isString(val) {
    return typeof val === 'string' || val instanceof String
  }

  /**
   * Is array.
   * The Polyfill that Mozilla developers recommend.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
   *
   * @param {any} val
   * @returns {boolean}
   */
  isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  }

  /**
   * Simples assert - check if predicate is true and if it is false
   * throw an Error with errMessage
   *
   * @param {boolean} predicate
   * @param {string} errMessage
   */
  assert(predicate, errMessage) {
    if (!predicate) throw new Error(errMessage)
  }

  /**
   * Assert intended for arguments in methods of classes.
   * Checks the predicate and if it fails throws an Error,
   * with descriptive information. If class not provided
   * global is used.
   *
   * Example use : assertArg(arg === 5, 'arg', this.fn, this)
   *
   * @param {boolean} predicate
   * @param {string} argName The name of the argument that was been checked.
   * @param {string} method The method that the error happened in.
   * @param {string} [thisParam=null] The class that the error happened in.
   * @param {string} [errMsg=null] Custom message.
   */
  assertArg(predicate, argName, method, thisParam=null, errMsg=null) {
    if (!predicate) {
      let className = thisParam ? thisParam.__proto__.constructor.name : 'global'
      let methodName = method.name
      let errMessage = errMsg ? errMsg :
        `Invalid argument - ${argName} in ${className}.${methodName}`
      throw new Error(errMessage)
    }
  }
}
