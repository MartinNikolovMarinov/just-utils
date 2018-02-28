'use strict';
var assert = require('./tests/lib/assertModule');

var MatrixWrap = (function (){
	// Constructor
	function MatrixWrap (arrOfArrays) {
		this.setValue(arrOfArrays);
	}

	// Getters/Setters
	MatrixWrap.prototype.setValue = function(matrix) {
		assert.isTrue(isValidMatrix(matrix),
			'MatrixWrap.setValue() ==> Invalid matrix');
		this._value = matrix;
		this._rows = this._value.length;
		this._cols = this._value[0].length;
	};
	MatrixWrap.prototype.getValue = function() {
		return this._value;
	};

	// private Methods :

	// A valid matrix is an array with arrays, consisting of
	// at least one array and all columns must have the same
	// amount of items (no jagged arrays allowed).
	// @matrix the array to be checked.
	// returns true or false.
	var isValidMatrix = function (matrix) {
		if (!(matrix instanceof Array && matrix[0] instanceof Array)) {
			return false;
		}

		var rowsLen = matrix.length,
			firstColLen = matrix[0].length;

		for (var i = 0; i < rowsLen; i++) {
			if (matrix[i].length !== firstColLen) {
				return false;
			}
		}

		return true;
	};
	// Only matrices of the same dimensions can be added.
	// NxK + NxK --> valid.
	// returns true or false.
	var canAddMatrices = function (matrix1, matrix2) {
		if (matrix1._rows !== matrix2._rows ||
			matrix1._cols !== matrix2._cols) {
			return false;
		}

		return true;
	};
	// Rotations to the right means that the rows become
	// cols and the last index is taken as the new first.
	// @matrix input matrix.
	// returns @resultMatrix of type array of arrays.
	var rotateRight =  function (matrix) {
		var resultMatrix = [];
		for (var i = matrix._cols - 1; i >= 0; i--) {

			resultMatrix[i] = [];
			for (var j = matrix._rows - 1; j >= 0; j--) {
				resultMatrix[i].push(matrix._value[j][i]);
			}
		}

		return resultMatrix;
	};
	// Rotations to the left is a bit harder to explain..
	// 1 2	  		   6 4
	// 3 4 => 2 4 6 => 4 3 => 5 3 1
	// 5 6	  1 3 5    2 1    6 4 2
	// @matrix input matrix.
	// returns @resultMatrix of type array of arrays.
	var rotateLeft = function (matrix) {
		var resultMatrix = [],
			lastCol;

		for (var i = 0; i <  matrix._cols; i++) {

			lastCol = matrix._cols - i - 1;
			resultMatrix[lastCol] = [];
			for (var j = 0; j <  matrix._rows; j++) {
				resultMatrix[lastCol].push(matrix._value[j][i]);
			}
		}

		return resultMatrix;
	};
	// Finds determinant of a 2x2 matrix.
	// @matrix input matrix.
	// return value as Number.
	var detOfTwoByTwo = function (matrix) {
		var denominator = matrix._value[0][0] * matrix._value[1][1] - matrix._value[1][0] * matrix._value[0][1];
		return 1 / denominator;
	};
	// Finds determinant of a 3x3 matrix.
	// @matrix input matrix.
	// return value as Number.
	var detOfThreeByТhree = function (matrix) {
		var leftSide =  matrix._value[0][0] * matrix._value[1][1] * matrix._value[2][2] +
						matrix._value[0][1] * matrix._value[1][2] * matrix._value[2][0] +
						matrix._value[0][2] * matrix._value[1][0] * matrix._value[2][1];

		var rightSide = matrix._value[0][1] * matrix._value[1][0] * matrix._value[2][2] +
						matrix._value[0][0] * matrix._value[1][2] * matrix._value[2][1] +
						matrix._value[0][2] * matrix._value[1][1] * matrix._value[2][0];

		return leftSide - rightSide;
	};

	// Methods on the prototype :

	// Clones the current MatrixWrap object.
	MatrixWrap.prototype.clone = function() {
		var resultMatrix = [];

		for (var i = 0; i < this._rows; i++) {

			resultMatrix[i] = [];
			for (var j = 0; j < this._cols; j++) {
				resultMatrix[i][j] = this._value[i][j];
			}
		}

		return new MatrixWrap(resultMatrix);
	};
	// Adds two MatrixWrap objects.
	// @other input MatrixWrap
	// This method changes the current object
	// and returns this object!
	MatrixWrap.prototype.add = function (other) {
		assert.isTrue((other instanceof MatrixWrap),
			'MatrixWrap.add() ==> other must be an instance of MatrixWrap');
		assert.isTrue(canAddMatrices(this, other),
			'MatrixWrap.add() ==> only matrices with the same dimensions can be added');

		for (var i = 0; i < this._rows; i++) {
			for (var j = 0; j < this._cols; j++) {
				this._value[i][j] += other._value[i][j];
			}
		}

		return this;
	};
	// Subtracts two MatrixWrap objects.
	// @other input MatrixWrap
	// This method changes the current object
	// and returns this!
	MatrixWrap.prototype.sub = function (other) {
		assert.isTrue((other instanceof MatrixWrap),
			'MatrixWrap.sub() ==> other must be an instance of MatrixWrap');
		assert.isTrue(canAddMatrices(this, other),
			'MatrixWrap.sub() ==> only matrices with the same dimensions can be subtracted.');

		for (var i = 0; i < this._rows; i++) {
			for (var j = 0; j < this._cols; j++) {
				this._value[i][j] -= other._value[i][j];
			}
		}

		return this;
	};
	// Transpose of a matrix changes the rows to cols
	// and the cols to rows.
	// This method changes the current object
	// and return this!
	MatrixWrap.prototype.transpose = function () {
		var resultMatrix = [];
		for (var i = 0; i < this._cols; i++) {

			resultMatrix[i] = [];
			for (var j = 0; j < this._rows; j++) {
				resultMatrix[i][j] = this._value[j][i];
			}
		}

		this.setValue(resultMatrix);
		return this;
	};
	// Multiplies a matrix by a scalar.
	// Every element is multiplied by the scalar.
	// @n the input scalar.
	// This method changes the current object and
	// returns this.
	MatrixWrap.prototype.scale = function (n) {
		assert.isNumber(n, 'MatrixWrap.scale() ==> the scalar must be a number.');

		for (var i = 0; i < this._rows; i++) {
			for (var j = 0; j < this._cols; j++) {
				this._value[i][j] *= n;
			}
		}

		return this;
	};
	// This function rotates the current MatrixWrap in
	// left or right direction depending on the user input
	// @direction - valid directions are the following strings :
	// 'left' and 'right'.
	// This function changes the current object and
	// returns this.
	MatrixWrap.prototype.rotate90 = function (direction) {
		var resultMatrix = [];

		if (direction === 'right') {
			resultMatrix = rotateRight(this);
		}
		else if (direction === 'left') {
			resultMatrix = rotateLeft(this);
		}
		else {
			throw new Error('MatrixWrap.rotate90() ==> wrong direction.');
		}

		this.setValue(resultMatrix);
		return this;
	};
	// This function rotates the current MatrixWrap 180 degrees
	// and returns this.
	MatrixWrap.prototype.rotate180 = function () {
		var index = 0,
			matrixCenter = parseInt(this._rows * this._cols / 2);

		for (var i = 0; i < this._rows; i++) {
			for (var j = 0; j < this._cols; j++) {
				var lastRow = this._rows - i - 1,
					lastCol = this._cols - j - 1,
					temp = this._value[i][j];

				this._value[i][j] = this._value[lastRow][lastCol];
				this._value[lastRow][lastCol] = temp;

				index++;
				if (index === matrixCenter) {
					return this;
				}
			}
		}

		return this;
	}
	// This function multiplies this object by a vector,
	// where a vector is considered to be only column vector.
	// @vector the input MatrixWrap object.
	// This function changes the current Object and
	// returns this.
	MatrixWrap.prototype.multByVector = function (vector) {
		assert.isTrue(vector instanceof MatrixWrap,
			'MatrixWrap.multByVector() ==> the vector must be an instance of MatrixWrap');
		assert.isTrue(vector._cols === 1,
			'MatrixWrap.multByVector() ==> a column vector is a MatrixWrap with exactly 1 col and n rows.');
		assert.isTrue(this._cols === vector._rows,
			'MatrixWrap.multByVector() ==> this MatrixWrap columns must be equal to the vector rows');

		var resultMatrix = [],
			currRowSum;

		for (var i = 0; i < this._rows; i++) {

			currRowSum = 0;
			for (var j = 0; j < this._cols; j++) {
				currRowSum += this._value[i][j] * vector._value[j];
			}

			resultMatrix[i] = [];
			resultMatrix[i][0] = currRowSum;
		}

		this.setValue(resultMatrix);
		return this;
	};
	// This function multiplies this object by a matrix.
	// Valid multiplication can happen if this object @_cols
	// are equal to the matrix @_rows.
	// @matrix the input MatrixWrap.
	// This function changes the current Object and
	// returns this.
	MatrixWrap.prototype.mult = function (matrix) {
		assert.isTrue(matrix instanceof MatrixWrap,
			'MatrixWrap.mult() ==> the matrix must be an instance of MatrixWrap');
		assert.isTrue(this._cols === matrix._rows,
			'MatrixWrap.mult() ==> this MatrixWrap columns must be equal to the matrix rows');

		var resultMatrix = [],
			resultCols = Math.min(this._cols, matrix._cols),
			currRowSum;

		for (var i = 0; i < this._rows; i++) {

			resultMatrix[i] = [];
			for (var j = 0; j < resultCols; j++) {

				currRowSum = 0;
				for (var k = 0; k < matrix._rows; k++) {
					currRowSum += this._value[i][k] * matrix._value[k][j];
				}

				resultMatrix[i].push(currRowSum);
			}
		}

		this.setValue(resultMatrix);
		return this;
	};
	// Returns the determinant of the current object.
	// Only matrices of 2x2 or 3x3 are supported for now.
	MatrixWrap.prototype.det = function () {
		if (this._rows === this._cols && this._rows === 2) {
			return detOfTwoByTwo(this);
		}
		if (this._rows === this._cols && this._rows === 3) {
			return detOfThreeByТhree(this);
		}
		else {
			throw new Error('MatrixWrap.det ==> Not supported matrix size');
		}
	};
	// Finds the right Identity matrix for the current object,
	// where an identity matrix satisfies A * I = A.
	// returns a MatrixWrap object.
	MatrixWrap.prototype.rightMultIdentity = function () {
		var resultMatrix = [];
		for (var i = 0; i < this._cols; i++) {

			resultMatrix[i] = [];
			for (var j = 0; j < this._cols; j++) {
				if (i === j) {
					resultMatrix[i][j] = 1;
				}
				else {
					resultMatrix[i][j] = 0;
				}
			}
		}

		return new MatrixWrap(resultMatrix);
	};
	// Finds the left Identity matrix for the current object,
	// where an identity matrix satisfies I * A = A.
	// returns a MatrixWrap object.
	MatrixWrap.prototype.leftMultIdentity = function () {
		var resultMatrix = [];
		for (var i = 0; i < this._rows; i++) {

			resultMatrix[i] = [];
			for (var j = 0; j < this._rows; j++) {
				if (i === j) {
					resultMatrix[i][j] = 1;
				}
				else {
					resultMatrix[i][j] = 0;
				}
			}
		}

		return new MatrixWrap(resultMatrix);
	};
	// Finds the right zero matrix for the current object,
	// where the zero matrix satisfies A * O = 0.
	// returns a MatrixWrap object.
	MatrixWrap.prototype.zeroMatrixRight = function () {
		var resultMatrix = [];
		for (var i = 0; i < this._cols; i++) {

			resultMatrix[i] = [];
			for (var j = 0; j < this._cols; j++) {
				resultMatrix[i][j] = 0;
			}
		}

		return new MatrixWrap(resultMatrix);
	};
	// Finds the left zero matrix for the current object,
	// where the zero matrix satisfies O * A = 1.
	// returns a MatrixWrap object.
	MatrixWrap.prototype.zeroMatrixLeft = function () {
		var resultMatrix = [];
		for (var i = 0; i < this._rows; i++) {

			resultMatrix[i] = [];
			for (var j = 0; j < this._rows; j++) {
				resultMatrix[i][j] = 0;
			}
		}

		return new MatrixWrap(resultMatrix);
	};
	MatrixWrap.prototype.toString = function() {
		var result = '{\n';
		for (var i = 0; i < this._rows; i++) {

			result += '\t[ ';
			for (var j = 0; j < this._cols; j++) {

				result += this._value[i][j];
				if (j !== this._cols - 1) {
					result += ', ';
				}
			}

			result += ' ],\n';
		}

		return result + '}';
	};

	return MatrixWrap;
}());

module.exports = MatrixWrap;

var m1 = [[1, 2], [3, 4], [5, 6]],
m2 = [[2]],
mWrapper1 = new MatrixWrap(m1),
mWrapper2 = mWrapper1.clone();