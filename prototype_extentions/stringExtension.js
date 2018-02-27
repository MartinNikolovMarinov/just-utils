// MEX from 'my extensions'.
String.prototype.mex_isLetter = function() {
  const isLower = (this >= 'a' && this <= 'z')
  const isUpper = (this >= 'A' && this <= 'Z')

  if ((isLower || isUpper) && this.length === 1) return true
  else return false
}

String.prototype.mex_isDigit = function() {
  if (this.length === 1 && this.match(/\d/)) return true
  else return false
}

String.prototype.mex_isEmptySpace = function() {
  if (this.match(/\S/)) return false
  else return true
}

String.prototype.mex_repeat = function(n) {
  let charBuffer = new Array(n)
  for (let i = 0; i < n; i++) {
    charBuffer[i] = this
  }

  return charBuffer.join('')
}

String.prototype.mex_reverse = function () {
  let charBuffer = new Array(this.length)
  for (let i = 0, j = this.length - 1; j >= 0; i++, j--) {
    charBuffer[i] = this[j]
  }

  return charBuffer.join('')
}

String.prototype.mex_replaceAll = function (strToReplace, replaceWith) {
  return this.replace(new RegExp(strToReplace, 'g'), replaceWith)
}

String.prototype.mex_replaceAllNonLetters = function (str) {
  return this.replace(/\W|[0-9]/g, '')
}

String.prototype.mex_startsWith = function(startsWith) {
  let strLen = startsWith.length
  if (startsWith.length === 0) throw new Error("startsWith with is empty.");

  for (let i = 0; i < strLen; i++) {
    if (startsWith[i] !== this[i]) return false
  }

  return true
}

String.prototype.mex_endsWith = function(endsWith) {
  if (endsWith.length === 0) throw new Error("endsWith is empty.");

  let len = this.length
  let endsWithLen = endsWith.length
  for (let i = 0; i < endsWithLen; i++) {
    if (this[len - 1 - i] !== endsWith[endsWithLen - 1 - i]) return false
  }

  return true
}

String.prototype.mex_left = function(n) {
  if (n <= 0) return this
  else return this.substring(0, n)
}

String.prototype.mex_right = function(n) {
  if (n >= this.length || n <= 0) return this.toString()
  else return this.slice(this.length - n)
}