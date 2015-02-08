function hashing(mas) {
	return mas.join(':');
}

function calculate (data) {
	var res = {live: {}, empty: {}};

	var points = Object.keys(data.live);

	points.forEach(function (hash) {
		var point = dehashing(hash);
		var neubours = findNeubor(point);

		var sum = 0;
		neubours.forEach(function (neu) {
			var key = hashing(neu);
			if (!data.live[key]) {
				var empty = findEmptyNeubor(neu, data, res);
				if (empty) {
					res.live[hashing(empty)] = true;
				}			
			} else {
				sum+=1;
			}
		});

		if (sum === 2 || sum === 3) {
			res.live[hashing(point)] = true;
		} else {
			res.empty[hashing(point)] = true;
		}
	});

	return res;

}

function dehashing(val) {
	return val.split(':');
}

function findNeubor(point) {
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

function findEmptyNeubor(point, data, tmpData) {
	var key = hashing(point);
	if (tmpData.live[key]) {
		return null;
	}
	var neubours = findNeubor(point);
	var sum = 0;
	neubours.forEach(function (neu) {
		var key = hashing(neu);
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
exports.findNeubor = findNeubor;
exports.findEmptyNeubor = findEmptyNeubor;
exports.calculate = calculate;
