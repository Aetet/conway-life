/**
 * Module for calculating conway's life game
 */

var bigInt = require("big-integer");

var UBig = {
	val: function (v) {
		return bigInt(v);
	},
	sub: function(v, u) {
		u = bigInt(u);
		return v.subtract(u);
	},
	add: function (v, u) {
		u = bigInt(u);
		return v.add(u);
	}
};

var UNative = {
	val : function (v) {
		return +(v);
	},
	sub: function(v, u) {
		return v - u;
	},
	add: function (v, u) {
		return v + u;
	}
};

// var u = UNative;
var u = UBig;




/**
 * Dummy hash function for key
 * @param  {Array} mas 
 * @return {String} hash
 */
function hashing(mas) {
	return mas.join(':');
}

/**
 * Calculate data for the game
 * @param  {Object} data initial data for life
 * @return {Object} result
 */
function calculate (data) {
	var res = {live: {}, empty: {}};

	var points = Object.keys(data.live);

	// @TODO remove dehashing algo and replace it with proper data-structure:
	// {'3:4':[3,4]} ?
	points.forEach(function (hash) {
		var point = dehashing(hash);
		var neighbors = findNeighbor(point);

		var sum = 0;
		neighbors.forEach(function (nei) {
			var key = hashing(nei);
			if (!data.live[key]) {
				var empty = findEmptyNeighbor(nei, data, res);
				if (empty) {
					res.live[hashing(empty)] = true;
				}			
			} else {
				sum+=1;
			}
		});

		if (sum === 2 || sum === 3) {
			res.live[hash] = true;
		} else {
			res.empty[hash] = true;
		}
	});

	return res;

}

/**
 * Dummy dehashing algo
 * @param  {String} val 
 * @return {Array} 
 */
function dehashing(val) {
	return val.split(':');
}

/**
 * Find neighbor for the point
 * We store only current data on each iteration to prevent memory overflow
 * @param  {Array} point Array contains coords for point
 * @return {Array}       All neighbors for point
 */
function findNeighbor(point) {
	var x = u.val(point[0]);
	var y = u.val(point[1]);

	return [
		[u.sub(x, 1).toString(), u.sub(y, 1).toString()],
		[u.sub(x, 1).toString(), y.toString()],
		[u.sub(x, 1).toString(), u.add(y, 1).toString()],
		[x.toString(), u.sub(y, 1).toString()],
		[x.toString(), u.add(y, 1).toString()],
		[u.add(x, 1).toString(), u.sub(y, 1).toString()],
		[u.add(x, 1).toString(), y.toString()],
		[u.add(x, 1).toString(), u.add(y, 1).toString()],
	];
}

/**
 * Find empty neighbor that must be live cell on next round
 * @param  {Array} point   
 * @param  {Object} data    state for previous round
 * @param  {Object} tmpData incomplete state for current round
 * @return {Array}         empty neighbor
 */
function findEmptyNeighbor(point, data, tmpData) {
	var key = hashing(point);
	if (tmpData.live[key]) {
		return null;
	}
	var neighbors = findNeighbor(point);
	var sum = 0;
	neighbors.forEach(function (nei) {
		var key = hashing(nei);
		if (data.live[key]) {
			sum+=1;
		}
	});
	if (sum === 3) {
		return point;
	} else {
		return null;
	}
}

var exports = module.exports;
exports.findNeighbor = findNeighbor;
exports.findEmptyNeighbor = findEmptyNeighbor;
exports.calculate = calculate;
