/**
 * Module for calculating conway's life game
 */


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
	x = +point[0];
	y = +point[1];
	// @TODO Add checks for border conditions
	return [
	[x-1, y-1],
	[x-1, y],
	[x-1, y+1],
	[x, y-1],
	[x, y+1],
	[x+1, y-1],
	[x+1, y],
	[x+1, y+1],
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
