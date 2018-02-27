/* MEX from 'MY EXTENSION'. */

Array.prototype.mex_equals = function (other) {
  if (this === other) return true
  if (this == null || other == null || this.length != other.length) return false

  for (var i = 0; i < this.length; ++i) {
    if (this[i] !== other[i]) return false
  }

  return true
}

Array.prototype.mex_clone = function () { return this.slice() }
Array.prototype.mex_deepClone = function () { return JSON.parse(JSON.stringify(this)) }

Array.prototype.mex_findMinElement = function (cmpFn) {
  let min = this[0]
  let len = this.length
  for (let i = 1; i < len; i++) {
    if (cmpFn(this[i], min) < 0) min = this[i]
  }

  return min
}

Array.prototype.mex_findMaxElement = function (cmpFn) {
  let max = this[0]
  let len = this.length
  for (let i = 1; i < len; i++) {
    if (cmpFn(this[i], max) > 0) max = this[i]
  }

  return max
}

Array.prototype.mex_sum = function () {
  let sum = 0
  this.forEach(x => sum += x)
  return sum
}

Array.prototype.mex_maxSequenceOfEqualElements = function () {
  let maxSequenceStartIndex = 0
  let maxSequenceLen = 0
  let currSequenceLen = 0
  let result = []
  let len = this.length
  let i = 0

  if (len <= 1) return this

  for (i = 0; i < len; i++) {
    if (this[i] === this[i + 1]) {
      currSequenceLen++
    } else {
      if (currSequenceLen > maxSequenceLen) {
        maxSequenceLen = currSequenceLen
        maxSequenceStartIndex = i - maxSequenceLen
      }

      currSequenceLen = 0
    }
  }

  let count = 0
  for (let i = maxSequenceStartIndex; i <= maxSequenceStartIndex + maxSequenceLen; i++) {
    result[count] = this[i]
    count++
  }

  return result
}

Array.prototype.mex_maxIncreasingSequence = function () {
  let maxSequenceStartIndex = 0
  let maxSequenceLen = 0
  let currSequenceLen = 0
  let result = []
  let len = this.length
  let i = 0

  if (len <= 1) return this

  for (i = 0; i < len; i++) {
    if (this[i] < this[i + 1]) {
      currSequenceLen++
    } else {
      if (currSequenceLen > maxSequenceLen) {
        maxSequenceLen = currSequenceLen
        maxSequenceStartIndex = i - maxSequenceLen
      }

      currSequenceLen = 0
    }
  }

  var count = 0
  for (var i = maxSequenceStartIndex; i <= maxSequenceStartIndex + maxSequenceLen; i++) {
    result[count] = this[i]
    count++
  }

  return result
}

Array.prototype.mex_maxDecreasingSequence = function () {
  let maxSequenceStartIndex = 0
  let maxSequenceLen = 0
  let currSequenceLen = 0
  let result = []
  let len = this.length
  let i = 0

  if (len <= 1) return this

  for (i = 0; i < len; i++) {
    if (this[i] > this[i + 1]) {
      currSequenceLen++
    } else {
      if (currSequenceLen > maxSequenceLen) {
        maxSequenceLen = currSequenceLen
        maxSequenceStartIndex = i - maxSequenceLen
      }

      currSequenceLen = 0
    }
  }

  var count = 0
  for (var i = maxSequenceStartIndex; i <= maxSequenceStartIndex + maxSequenceLen; i++) {
    result[count] = this[i]
    count++
  }

  return result
}

Array.prototype.mex_findMostFrequentNumber = function () {
  let maxOccurrences = 0
  let number = this[0]
  let len = this.length

  for (var i = 0; i < len; i++) {
    var currentNumber = this[i]
    var currOccurences = 1

    for (var j = 0; j < len; j++) {
      if (j !== i && this[j] === currentNumber) currOccurences++
    }

    if (currOccurences > maxOccurrences) {
      maxOccurrences = currOccurences;
      number = currentNumber;
    }
  }

  return { number: number, occurrences: maxOccurrences }
}
