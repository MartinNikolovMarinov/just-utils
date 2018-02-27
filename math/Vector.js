function isNumber(n) {
	return typeof n == 'number' && !isNaN(n);
}

var Vector = (function(){

	// constructor
	function Vector (config) {
		if (config instanceof Array && config.length !== 0) {
			this._dimensions = config;
			this.dimLen = config.length;
		} else if (config instanceof Vector) {
			this._dimensions = new Array(config.dimLen);
			this.dimLen = config.dimLen;

			for (var i = 0; i < config.dimLen; i++) {
				this._dimensions[i] = config._dimensions[i];
			}
		} else {
			throw new Error("Bad config variable");
		}
	}

	// Scaling a vector means multiplying all 
	// dimensions by a number(scalar). 
	Vector.prototype.scale = function(scalar) {
		for (var i = 0; i < this.dimLen; i++) {
			this._dimensions[i] *= scalar;
		}

		return this;
	};

	// Add two vectors.
	Vector.prototype.add = function(other) {
		var otherLen;

		if (other instanceof Vector){
			otherLen = other.dimLen;

			if (otherLen === this.dimLen){
				for (var i = 0; i < this.dimLen; i++) {
					this._dimensions[i] += other._dimensions[i];
				}
			} else {
				throw new Error("Can't add vectors of different dimensions.");
			}
		} else if (isNumber(other)){
			for (var i = 0; i < this.dimLen; i++) {
				this._dimensions[i] += other;
			}
		} else {
			throw new Error("other must be a Vector or an number.");
		}

		return this;
	};

	// Subtract two vectors.
	Vector.prototype.subtract = function(other) {
		var otherLen;

		if (other instanceof Vector){
			otherLen = other.dimLen;

			if (otherLen === this.dimLen){
				for (var i = 0; i < otherLen; i++) {
					this._dimensions[i] -= other._dimensions[i];
				}
			} else {
				throw new Error("Can't subtract vectors of different dimensions.");
			}
		} else if (isNumber(other)){
			for (var i = 0; i < this.dimLen; i++) {
				this._dimensions[i] -= other;
			}
		} else {
			throw new Error("other must be a Vector or an number.");
		}

		return this;
	};

	// Dot vectors.
	Vector.prototype.dot = function(other) {
		var otherLen, 
			dotVal = 0;

		if (other instanceof Vector){
			otherLen = other.dimLen;

			if (otherLen === this.dimLen){
				for (var i = 0; i < otherLen; i++) {
					dotVal += this._dimensions[i] * other._dimensions[i];
				}
			} else {
				throw new Error("Can't add dot of different dimensions.");
			}
		} else if (isNumber(other)){
			for (var i = 0; i < this.dimLen; i++) {
				dotVal += this._dimensions[i] * other;
			}
		} else {
			throw new Error("other must be a Vector or an number.");
		}

		return dotVal;
	};

	// Normalize vectors.
	Vector.prototype.norm = function() {
		var normVal = 0;

		for (var i = 0; i < this.dimLen; i++) {
			normVal += this._dimensions[i] * this._dimensions[i];
		}

		return Math.sqrt(normVal);
	};

	// Override toString().
	Vector.prototype.toString = function() {
		var dimStr = this._dimensions.join(', ');
		return '{ ' + dimStr + ' }';
	};

	return Vector;
})();

var v = new Vector([2, 1, 1]);
