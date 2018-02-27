// To run the following tests you need nodejs and
// the mocha test framework -> http://mochajs.org/ 
// npm install mocha

var Fraction = require('./../fraction'),
	assert = require('./lib/assertModule');


describe('Fraction class tests: ', function () {

	var f1, f2, f3, f4, result;

	describe('initialization', function () {
		// Test 1
		it('Should throw error, because devision by zero: ( new Fraction(0, 0) )', function () {
			var wrapper = function () {
				f1 = new Fraction(0, 0);
			}

			assert.throwsError(wrapper);
		});
	});

	describe('add()', function () {
		// Test 1
		it('Should correctly add two fractions: ( 1/4 + 3/8 = 5/8 )', function () {
			f1 = new Fraction(1, 4);
			f2 = new Fraction(3, 8);

			result = f1.add(f2); // 1/4 + 3/8 = 5/8
			assert.isTrue(result.numerator === 5);
			assert.isTrue(result.denominator === 8);
		});
		// Test 2
		it('Should correctly add three fractions: ( 1/4 + 3/8 + 5/25 = 33/40 )', function () {
			f1 = new Fraction(1, 4);
			f2 = new Fraction(3, 8);
			f3 = new Fraction(5, 25);

			result = f1.add(f2).add(f3); // 1/4 + 3/8 + 5/25 = 33/40
			assert.isTrue(result.numerator === 33);
			assert.isTrue(result.denominator === 40);
		});
		// Test 3
		it('Should correctly represent zero fraction: ( 0 + 3/8 = 3/8 )', function () {
			f1 = new Fraction(0, 200);
			f2 = new Fraction(0, -4);
			f3 = new Fraction(3, 8);

			assert.isTrue(f1.numerator === 0);
			assert.isTrue(f1.denominator === 1);
			assert.isTrue(f2.numerator === 0);
			assert.isTrue(f2.denominator === 1);

			result = f1.add(f3); // 0 + 3/8 = 3/8

			assert.isTrue(result.numerator === 3);
			assert.isTrue(result.denominator === 8);
		});
		// Test 4
		it('Should correctly add negative fraction: ( -1/-2 + -1/4 = 1/4 )', function () {
			f1 = new Fraction(-1, -2);
			f2 = new Fraction(1, -4);

			result = f1.add(f2); // -1/-2 + -1/4 = 1/4
		
			assert.isTrue(result.numerator === 1);
			assert.isTrue(result.denominator === 4);
		});
		// Test 5
		it('Should correctly add negative fraction: ( -1/-5 - -1/3 = -2/15 )', function () {
			f1 = new Fraction(-1, -5);
			f2 = new Fraction(-1, 3);

			result = f1.add(f2); // -1/-5 - -1/3 = -2/15
		
			assert.isTrue(result.numerator === -2);
			assert.isTrue(result.denominator === 15);
		});
	});

	describe('sub()', function () {
		// Test 1
		it('Should correctly subtract fractions: ( 1/24 - 19/15 = -49/40 )', function () {
			f1 = new Fraction(1, 24);
			f2 = new Fraction(19, 15);

			result = f1.sub(f2); // 1/24 - 19/15 = -49/40
		
			assert.isTrue(result.numerator === -49);
			assert.isTrue(result.denominator === 40);
		});
		// Test 1
		it('Should correctly subtract negative fractions: ( 1/2 - 1/-2 = 1/1 )', function () {
			f1 = new Fraction(1, 2);
			f2 = new Fraction(1, -2);

			result = f1.sub(f2); // 1/2 - 1/-2 = 1/1
		
			assert.isTrue(result.numerator === 1);
			assert.isTrue(result.denominator === 1);
		});
	});

	describe('equals()', function () {
		// Test 1
		it('Equate two fractions: ( F1(1, -1) equals F2(-1, 1) is true )', function () {
			f1 = new Fraction(1, -1);
			f2 = new Fraction(-1, 1);
			assert.isTrue(f1.equals(f2)); // 1/-1 equals -1/1 -> true
		});
		// Test 2
		it('Equate two fractions: ( F1(4, 4) equals F2(-1, 1) is false )', function () {
			f1 = new Fraction(4, 4);
			f2 = new Fraction(-1, 1);
			assert.isFalse(f1.equals(f2)); // 1/-1 equals -1/1 -> true
		});
		// Test 3
		it('Equate two fractions: ( F1(4, 4) equals F2(3, 4) is false )', function () {
			f1 = new Fraction(4, 4);
			f2 = new Fraction(3, 4);
			assert.isFalse(f1.equals(f2)); // 1/-1 equals -1/1 -> true
		});
	});

	describe('mult()', function () {
		it('Should correctly multiply fractions: ( 1/2 * 1/5 = 1/10 )', function () {
			f1 = new Fraction(1, 2);
			f2 = new Fraction(1, 5);
			result = f1.mult(f2); // 1/2 * 1/5 = 1/10

			assert.isTrue(result.numerator === 1);
			assert.isTrue(result.denominator === 10);
		});
	});

	describe('div()', function () {
		it('Should correctly divide fractions: ( 1/2 / 1/5 = 1/2 * 5/1 = 5/2 )', function () {
			f1 = new Fraction(1, 2);
			f2 = new Fraction(1, 5);
			result = f1.div(f2); // 1/2 * 5/1 = 5/2

			assert.isTrue(result.numerator === 5);
			assert.isTrue(result.denominator === 2);
		});
	});
});