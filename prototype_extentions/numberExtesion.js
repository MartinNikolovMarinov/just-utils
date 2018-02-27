function fib(n) {
  if (n < 0) throw new Error("n can't be negative.")

  let prevNum = 0
  let currNum = 1
  for (let i = 0; i < n; i++) {
    let temp = prevNum
    prevNum = currNum
    currNum = temp + currNum
  }

  return currNum
}

// bad sad bad and slow, but example :
function fib2(n) {
  if (n === 0) return 1
  if (n < 0) return 0
  return fib(n - 1) + fib(n - 2)
}

function calcGCD(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  let remainder = a % b
  let devidedValue = parseInt(a / b)

  while (remainder > 0) {
    a = b
    b = remainder
    remainder = a % b
    devidedValue = parseInt(a / b)
  }

  return b
}

function calcLCD(a, b, gcd) { return Math.floor(Math.abs(a) / gcd) * Math.abs(b) }

// Work only on integers :
Number.prototype.isInteger = function () { return this % 1 === 0 }
Number.prototype.digitCount = function () { return Math.ceil(Math.log(Math.abs(this) + 1) / Math.LN10) }
Number.prototype.isNumberPrime = function () {
  if (this <= 3) {
    if (this <= 1) return false
    else return true
  }

  if (this % 2 == 0 || this % 3 == 0) return false

  let len = Math.sqrt(this) + 1
  for (let i = 5; i < len; i += 6) {
    if (this % i == 0 || this % (i + 2) == 0) return false
  }

  return true
}

// Work with real numbers :
Number.prototype.roundRealNumber = function (precision) {
  number = this * Math.pow(10, precision)
  number = Math.round(this)
  number = this / Math.pow(10, precision)
  return number
}