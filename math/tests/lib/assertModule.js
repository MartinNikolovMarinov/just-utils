var AssertModule = (function(){

	function AssertModule () {}
	
	AssertModule.prototype.isNumber = function(num, errMessage) {
		if (typeof num !== 'number' || isNaN(num)) {
			throw new Error(errMessage);
		}
		
		return true;
	};
	AssertModule.prototype.isInt = function(num, errMessage) {
		if (typeof num !== 'number' || num % 1 !== 0){
			throw new Error(errMessage);
		}
		
		return true;
	};
	AssertModule.prototype.isTrue = function(expression, errMessage) {
		if (!expression) {
			throw new Error(errMessage);
		}

		return true;
	};
	AssertModule.prototype.isFalse = function(expression, errMessage) {
		if (expression) {
			throw new Error(errMessage);
		}

		return true;
	};

	// If the wrapperFunc throws an Error this functions returns true.
	// If the wrapperFunc executes with no Error this function throws an Error.
	// @wrapperFunc is always parameterless. If the function we want to test
	// has parameters we wrap it in a 'wrapper' function.
	// example:
	// 		function wrapperFunc () {
	// 			someFunction(1, 2, 3);
	// 		}
	AssertModule.prototype.throwsError = function(wrapperFunc, errMessage) {
		try {
			wrapperFunc();
		} 
		catch(err) {
			return true;
		}

		throw new Error(errMessage);
	};

	return AssertModule;
})();

var assert = new AssertModule();
module.exports = assert;

assert.isNumber(1, 'err msg');
assert.isNumber(1.2, 'err msg');
// assert.isNumber(NaN, 'err msg'); //ERR

assert.isInt(1, 'err msg');
// assert.isInt(1.2, 'err msg');
// assert.isInt(NaN, 'err msh'); // ERR

function foo (a, b) {
	if (b === 0) {
		throw new Error('Division by zero');
	}

	return a / b;
}

var wrapperFunc = function (){
	foo(1, 0);
};

// Division by zero Error thrown so this is true :
assert.throwsError(wrapperFunc, 'Doesn\'t throw an error');