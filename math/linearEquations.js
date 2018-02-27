'use strict';
var Fraction = require('./fraction');

// Finds the distance between two points in 2D space with
// the Pythagorean theorem.
// Takes two objects with x and y values, which must be numbers.
// Returns the distance as a number.
var distance = function(point1, point2) {
	var deltaX = point1.x - point2.x;
	var deltaY = point1.y - point2.y;

	return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
};

// Finds the slope of a line defined by two points in 2D space.
// Takes two objects with x and y values, which must be numbers.
// Returns the distance as a number.
var calcSlope = function(point1, point2) {
	var deltaX = point1.x - point2.x;
	var deltaY = point1.y - point2.y;

	if (deltaY == 0) {
		throw new Error('Devision by 0. Line is vertical.');
	}

	return deltaY / deltaX;
};

var slopeAsFraction = function(point1, point2) {
	var deltaX = point1.x - point2.x;
	var deltaY = point1.y - point2.y;

	if (deltaY == 0) {
		throw new Error('Devision by 0. Line is vertical.');
	}

	return new Fraction(Math.round(deltaY), Math.round(deltaX));
};

// Finds the value in which the line crosses the Y axis.
var lineInterceptWithY = function(point1, point2) {
	var slope = calcSlope(point1, point2);
	var yIntercept = point1.y - point1.x * slope;
	return yIntercept;
};

// Finds the value in which the line crosses the X axis.
var lineInterceptWithX = function(point1, point2) {
	var yIntercept = lineInterceptWithY(point1, point2);
	var slope = calcSlope(point1, point2);
	var xIntercept = -(yIntercept / slope);
	return xIntercept;
};

var lineInterceptWithX_2 = function (slope, yIntercept) {
	var xIntercept = -(yIntercept / slope);		
	return xIntercept;
};

// Returns the equation of a line as a string.
var lineToEquation = function(point1, point2) {
	var slope = calcSlope(point1, point2);
	var yIntercept = lineInterceptWithY(point1, point2);
	return 'y = '+slope.toString()+' * x + '+yIntercept;
};


// Test objects :
var Point = (function (){
	function Point (x, y) {
		this.x = x;
		this.y = y;
	}

	return Point;
}());

var Line = (function (){
	function Line (point1, point2) {
		this.point1 = point1;
		this.point2 = point2;
	}

	return Line;
}());

var point1 = new Point(0, 12);
var point2 = new Point(1, 7);

console.log(lineToEquation(point1, point2));
console.log(lineInterceptWithX_2(-3, 27).toString());