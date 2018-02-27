Array.prototype.equals = function (other) {
	if (this === other) { 
		return true;
	}
	if (this == null || other == null || this.length != other.length) { 
		return false;
	}

	for (var i = 0; i < this.length; ++i) {
		if (this[i] !== other[i]) {
			return false;
		}
	}

	return true;
};

var MatrixWrap = require('./../Matrix'),
	assert = require('./lib/assertModule');

var m1, m2, mWrapper1, mWrapper2;

describe('Matrix class tests: ', function () {
	describe('rotate90(\'right\'): ', function () {
		it('When cols > rows', function () {
			m1 = [[1, 2, 3], [4, 5, 6]],
			mWrapper1 = new MatrixWrap(m1);
			
			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([4, 1]));
			assert.isTrue(mWrapper1.getValue()[1].equals([5, 2]));
			assert.isTrue(mWrapper1.getValue()[2].equals([6, 3]));

			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([6, 5, 4]));
			assert.isTrue(mWrapper1.getValue()[1].equals([3, 2, 1]));

			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([3, 6]));
			assert.isTrue(mWrapper1.getValue()[1].equals([2, 5]));
			assert.isTrue(mWrapper1.getValue()[2].equals([1, 4]));
		});

		it('When rows > cols', function () {
			m1 = [[1, 2], [3, 4], [5, 6]],
			mWrapper1 = new MatrixWrap(m1);

			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([5, 3, 1]));
			assert.isTrue(mWrapper1.getValue()[1].equals([6, 4, 2]));

			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([6, 5]));
			assert.isTrue(mWrapper1.getValue()[1].equals([4, 3]));
			assert.isTrue(mWrapper1.getValue()[2].equals([2, 1]));

			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([2, 4, 6 ]));
			assert.isTrue(mWrapper1.getValue()[1].equals([ 1, 3, 5 ]));
		})

		it('When rows == cols', function () {
			m1 = [[1, 2], [3, 4]];
			mWrapper1 = new MatrixWrap(m1);

			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([3, 1]));
			assert.isTrue(mWrapper1.getValue()[1].equals([4, 2]));

			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([4, 3]));
			assert.isTrue(mWrapper1.getValue()[1].equals([2, 1]));

			mWrapper1.rotate90('right');
			assert.isTrue(mWrapper1.getValue()[0].equals([2, 4]));
			assert.isTrue(mWrapper1.getValue()[1].equals([1, 3]));			
		})
	});
	describe('rotate90(\'left\'): ', function () {
		it('When cols > rows', function () {
			m1 = [[1, 2, 3], [4, 5, 6]],
			mWrapper1 = new MatrixWrap(m1);

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([3, 6]));
			assert.isTrue(mWrapper1.getValue()[1].equals([2, 5]));
			assert.isTrue(mWrapper1.getValue()[2].equals([1, 4]));

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([6, 5, 4]));
			assert.isTrue(mWrapper1.getValue()[1].equals([3, 2, 1]));

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([4, 1]));
			assert.isTrue(mWrapper1.getValue()[1].equals([5, 2]));
			assert.isTrue(mWrapper1.getValue()[2].equals([6, 3]));	
		})

		it('When rows > cols', function () {
			m1 = [[1, 2], [3, 4], [5, 6]],
			mWrapper1 = new MatrixWrap(m1);

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([2, 4, 6]));
			assert.isTrue(mWrapper1.getValue()[1].equals([1, 3, 5]));

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([6, 5]));
			assert.isTrue(mWrapper1.getValue()[1].equals([4, 3]));
			assert.isTrue(mWrapper1.getValue()[2].equals([2, 1]));

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([5, 3, 1]));
			assert.isTrue(mWrapper1.getValue()[1].equals([6, 4, 2]));
		})

		it('When rows == cols', function () {
			m1 = [[1, 2], [3, 4]],
			mWrapper1 = new MatrixWrap(m1);

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([2, 4]));
			assert.isTrue(mWrapper1.getValue()[1].equals([1, 3]));

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([4, 3]));
			assert.isTrue(mWrapper1.getValue()[1].equals([2, 1]));

			mWrapper1.rotate90('left');
			assert.isTrue(mWrapper1.getValue()[0].equals([3, 1]));
			assert.isTrue(mWrapper1.getValue()[1].equals([4, 2]));
		})
	});
	describe('multByVector()', function () {
		it('m = [[0, 3, 5], [5, 5, 2]]; v = [[3], [4], [3]]', function () {
			m1 = [[0, 3, 5], [5, 5, 2]],
			m2 = [[3], [4], [3]],
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.multByVector(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([27]));
			assert.isTrue(mWrapper1.getValue()[1].equals([41]));
		});
		it('m = [[0], [5]]; v = [[3]]', function () {
			m1 = [[0], [5]],
			m2 = [[3]],
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.multByVector(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([0]));
			assert.isTrue(mWrapper1.getValue()[1].equals([15]));
		});
		it('m = [[1, 2]]; v = [[1], [2]]', function () {
			m1 = [[1, 2]],
			m2 = [[1], [2]],
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.multByVector(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([5]));
		});
		it('m = [[1, 2], [3, 4]]; v = [[3], [4], [3]] --> throws Error', function () {
			m1 = [[1, 2], [3, 4]];
			m2 = [[3], [4], [3]];
			mWrapper1 = new MatrixWrap(m1);
			mWrapper2 = new MatrixWrap(m2);

			var wrapperFunc = function () {
				mWrapper1.multByVector(mWrapper2);
			}

			assert.throwsError(wrapperFunc);
		});
	});
	describe('mult()', function () {
		it('m1 = [[1, 2], [1, 2]]; m2 = [[1, 2], [1, 2]]', function () {
			m1 = [[1, 2], [1, 2]],
			m2 = [[1, 2], [1, 2]],
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.mult(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([3, 6]));
			assert.isTrue(mWrapper1.getValue()[1].equals([3, 6]));
		});
		it('m1 = [[1, 2, 3], [4, 5, 6]]; m2 = [[1, 2], [3, 4], [5, 6]]', function () {
			m1 = [[1, 2, 3], [4, 5, 6]],
			m2 = [[1, 2], [3, 4], [5, 6]],
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.mult(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([22, 28]));
			assert.isTrue(mWrapper1.getValue()[1].equals([49, 64]));
		});
		it('m1 = [[1, 2, 3, 4], [1, 2, 3, 4]; [1, 2, 3, 4], [1, 2, 3, 4]]; m2 = m1', function () {
			m1 = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
			m2 = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.mult(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([10, 20, 30, 40]));
			assert.isTrue(mWrapper1.getValue()[1].equals([10, 20, 30, 40]));
			assert.isTrue(mWrapper1.getValue()[2].equals([10, 20, 30, 40]));
			assert.isTrue(mWrapper1.getValue()[3].equals([10, 20, 30, 40]));
		});
		it('m1 = [[1, 2], [1, 2], [1, 2]]; m2 = [[1, 0], [0, 1]]', function () {
			m1 = [[1, 2], [1, 2], [1, 2]],
			m2 = [[1, 0], [0, 1]],
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.mult(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([1, 2]));
			assert.isTrue(mWrapper1.getValue()[1].equals([1, 2]));
			assert.isTrue(mWrapper1.getValue()[2].equals([1, 2]));
		});
		it('m1 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; m2 = [[1, 2], [1, 2], [1, 2]]', function () {
			m1 = [[ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ]],
			m2 = [[1, 2], [1, 2], [1, 2]],
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.mult(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([1, 2]));
			assert.isTrue(mWrapper1.getValue()[1].equals([1, 2]));
			assert.isTrue(mWrapper1.getValue()[2].equals([1, 2]));
		});
		it('big matrix performance test 15x15 * 15x15', function () {
			m1 = [
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
				],
			m2 = m1,
			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1 = new MatrixWrap(m1),
			mWrapper2 = new MatrixWrap(m2);

			mWrapper1.mult(mWrapper2);
			assert.isTrue(mWrapper1.getValue()[0].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[1].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[2].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[3].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[4].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[5].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[6].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[7].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[8].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[9].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[10].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[11].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[12].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[13].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
			assert.isTrue(mWrapper1.getValue()[14].equals([120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800]));
		});
	});
});