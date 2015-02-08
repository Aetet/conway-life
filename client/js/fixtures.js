var bigInt = require("big-integer");

var fixtures = {
	'hash10': {
		data: {
			live: {
				'3:5': true,
				'4:5': true,
				'3:7': true,
				'4:4': true,
				'4:8': true,
				'5:5': true,
				'5:7': true
			}
		},
		format: 'hash10'
	},
	'array10': {
		data: [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,1,0,0],
		[0,0,0,0,1,0,0,0,1,0],
		[0,0,0,0,0,1,0,1,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		],
		format: 'array'
	},
	'points10': {
		data: [[3,5],[3,7],[4,4],[4,8],[5,5],[5,7]],
		format: 'points'
	},
	presets: {
		gliders: function (width, height) {
			var center = [Math.floor(width/2), Math.floor(height/2)];

			// first
			var x1st = center[0] + 3; 
			var y1st = center[1] - 2;

			var x2st = x1st + 1;
			var y2st = y1st - 1;

			var x3st = x2st;
			var y3st = y2st - 1;

			var x4st = x3st - 1;
			var y4st = y3st;

			var x5st = x4st - 1;
			var y5st = y4st;

			// second
			var x1nd = center[0] + 3;
			var y1nd = center[1] + 2;

			var x2nd = x1nd + 1;
			var y2nd = y1nd + 1;

			var x3nd = x2nd;
			var y3nd = y2nd + 1;

			var x4nd = x3nd - 1;
			var y4nd = y3nd;

			var x5nd = x4nd - 1;
			var y5nd = y4nd;


			// third
			var x1rd = center[0] - 3;
			var y1rd = center[1] + 2;

			var x2rd = x1rd - 1;
			var y2rd = y1rd + 1;

			var x3rd = x2rd;
			var y3rd = y2rd + 1;

			var x4rd = x3rd + 1;
			var y4rd = y3rd;

			var x5rd = x4rd + 1;
			var y5rd = y4rd;



			// fourth
			var x1th = center[0] - 3; 
			var y1th = center[1] - 2;

			var x2th = x1th - 1;
			var y2th = y1th - 1;

			var x3th = x2th;
			var y3th = y2th - 1;

			var x4th = x3th + 1;
			var y4th = y3th;

			var x5th = x4th + 1;
			var y5th = y4th;

			var gliders = {
				first:  [[x1st, y1st], [x2st, y2st], [x3st, y3st], [x4st, y4st], [x5st, y5st]],
				second: [[x1nd, y1nd], [x2nd, y2nd], [x3nd, y3nd], [x4nd, y4nd], [x5nd, y5nd]],
				third:  [[x1rd, y1rd], [x2rd, y2rd], [x3rd, y3rd], [x4rd, y4rd], [x5rd, y5rd]],
				fourth: [[x1th, y1th], [x2th, y2th], [x3th, y3th], [x4th, y4th], [x5th, y5th]],
			};

			var names = ['first', 'second', 'third', 'fourth'];

			var res = {live: {}, empty: {}};
			names.forEach(function (name) {
				var coords = gliders[name];
				coords.forEach(function (coord) {
					res.live[coord.join(':')] = true;
				});
			});

			return res;
		}
	}
};



module.exports = fixtures;
