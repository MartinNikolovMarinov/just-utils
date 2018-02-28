'use strict';
// Globals
var assert = require('./tests/lib/assertModule'),
	roundRealNumber = function (number, precision) {
		number =  number * Math.pow(10, precision);
		number = Math.round(number);
		number = number / Math.pow(10, precision);
		return number;
	},
	calcGCD = function (a, b) {
		a = Math.abs(a);
		b = Math.abs(b);
		var remainder = a % b;
		var	devidedValue = parseInt(a / b);

		while (remainder > 0)
		{
			a = b;
			b = remainder;
			remainder = a % b;
			devidedValue = parseInt(a / b);
		}

		return b;
	},
	calcLCD = function (a, b, gcd) {
		a = Math.abs(a);
		b = Math.abs(b);
		return Math.floor(a / gcd) * b;
	},
	toFraction = function (realNumber) {
		assert.isNumber(realNumber, "realNumber must be a number");

		var intPart = parseInt(realNumber);
		var	count = 0;

		while(parseInt(realNumber) !== realNumber) {
			realNumber *= 10;
			count++;
		}

		return new Fraction(realNumber, Math.pow(10, count));
	};

// Fraction object
var Fraction = (function(){

	// @numerator: top part of a fraction
	// @denominator:  bottom part of a fraction
	function Fraction (numerator, denominator) {
		this._toLowestTerm(numerator, denominator);
		this._setFractionSign();
		this.result = roundRealNumber(numerator / denominator, 10);
	}

	Fraction.prototype._setFractionSign = function() {
		if (this.numerator > 0 && this.denominator > 0 ||
			this.numerator < 0 && this.denominator < 0) {

			this.numerator = Math.abs(this.numerator);
			this.denominator = Math.abs(this.denominator);
		} else {
			this.numerator = -Math.abs(this.numerator);
			this.denominator = Math.abs(this.denominator);
		}
	};
	Fraction.prototype._toLowestTerm = function(numerator, denominator) {
		assert.isInt(numerator, 'Numerator must be integer.');
		assert.isInt(denominator, 'Denominator must be integer.');
		if (denominator === 0){
			throw new Error('Can\'t divide by zero.');
		}

		// This is the best way to represent zero and
		// not break calculations with this fraction.
		if (numerator === 0){
			this.numerator = 0;
			this.denominator = 1;
			return;
		}

		var gcd = calcGCD(numerator, denominator);
		this.numerator = numerator / gcd;
		this.denominator = denominator / gcd;
	};
	Fraction.prototype.equals = function(other) {
		if (!(other instanceof Fraction)) {
			throw new Error('equals can be used only with Fraction objects.');
		}

		var numeratorCmp = this.numerator - other.numerator,
			denominatorCmp = this.denominator - other.denominator;

		return Math.abs(numeratorCmp) - Math.abs(denominatorCmp) === 0;
	};
	Fraction.prototype.add = function(other) {
		if (!(other instanceof Fraction)) {
			throw new Error('other must be a Fraction object.');
		}

		var gcd = calcGCD(this.denominator, other.denominator),
			lcd = calcLCD(this.denominator, other.denominator, gcd);

		var leftSide = this.numerator * (lcd / this.denominator),
			rightSide = other.numerator * (lcd / other.denominator),
			newNumberator = leftSide + rightSide;

		var additionResult = new Fraction(newNumberator, lcd);
		return additionResult;
	};
	Fraction.prototype.sub = function(other) {
		if (!(other instanceof Fraction)) {
			throw new Error('other must be a Fraction object.');
		}

		var gcd = calcGCD(this.denominator, other.denominator),
			lcd = calcLCD(this.denominator, other.denominator, gcd);

		var leftSide = this.numerator * (lcd / this.denominator),
			rightSide = other.numerator * (lcd / other.denominator),
			newNumberator = leftSide - rightSide;

		var subtractionResult = new Fraction(newNumberator, lcd);
		return subtractionResult;
	};
	Fraction.prototype.mult = function(other) {
		if (!(other instanceof Fraction)) {
			throw new Error('other must be a Fraction object.');
		}

		var numberatorMult = this.numerator * other.numerator,
			denominatorMult = this.denominator * other.denominator,
			multiplicationResult = new Fraction(numberatorMult, denominatorMult);

		return multiplicationResult;
	};
	Fraction.prototype.div = function(other) {
		if (!(other instanceof Fraction)) {
			throw new Error('other must be a Fraction object.');
		}

		var numberatorMult = this.numerator * other.denominator,
			denominatorMult = this.denominator * other.numerator,
			multiplicationResult = new Fraction(numberatorMult, denominatorMult);

		return multiplicationResult;
	};
	Fraction.prototype.toString = function() {
		return this.numerator + '/' + this.denominator;
	};

	return Fraction;
})();

module.exports = Fraction;