var alg = require('./algo');
function Canvas(canvas, options) {
	this._canvas = canvas;
	this._ctx = canvas.getContext('2d');
	this._parseOptions(options);
};

Canvas.prototype = {
	createGrid: function () {
		var ctx = this._ctx;
		var columns = this._columns;
		var rows = this._rows;
		var cell = this._cellSize;
		var width = cell /2;
		var height = cell/2;

		// TODO Find right koefficient
		var k = 1/6;
		var width = height = k * 2 * cell;
		var part = k * cell * 2;

		ctx.strokeRect(0, 0, this._width, this._height);

		for (var i = 0; i < columns; i++) {
			for (var j = 0; j < rows; j++) {

				var x0 = (i * cell) + part;
				var y0 = (j * cell) + part;

				ctx.strokeRect(x0, y0, width, height);
			}
		}
	},
	stop: function () {
		clearInterval(this._intervalTimer);
	},
	run: function (steps, timeout) {
		var self = this;
		
		self._intervalTimer = setInterval(function () {
			if (self._steps <= 0) {
				clearInterval(self._intervalTimer);
				return;
			}
			var data = self._data;
			self.render();
			self.calculate();
			steps--;
		}, timeout);

	},
	calculate: function () {
		this._data = alg.calculate(this._data);
	},
	load: function (data) {
		this._data = data;
	},
	save: function () {
		return this._data;
	},
	render: function () {
		var data = this._data;
		var self = this;
		var liveKeys = Object.keys(data.live);
		for (var i = 0; i < liveKeys.length; i++) {
			var point = liveKeys[i].split(':');
			self.paintLive(point);
		}
		var emptyKeys = Object.keys(data.empty);
		for (var j = 0; j < emptyKeys.length; j++) {
			var point = emptyKeys[j].split(':');
			self.paintEmpty(point);
		}
	},
	paintEmpty: function (point) {
		var cell = this._cellSize;

		var width = cell /2;
		var height = cell/2;

		// TODO make this work by args
		// TODO Find right koefficient
		var k = 1/6;
		var width = height = k * 2 * cell;
		var part = k * cell * 2;

		var x0 = (point[0] * cell) + part;
		var y0 = (point[1] * cell) + part;

		this._ctx.clearRect(point[0] * cell, point[1] * cell, cell, cell);
		this._ctx.strokeRect(x0, y0, width, height);
	},
	paintLive: function (point) {
		var cell = this._cellSize;
		var x0 = (point[0] * cell);
		var y0 = (point[1] * cell);

		this._ctx.fillStyle = '#666';
		this._ctx.fillRect(x0, y0, cell, cell);
	},
	_parseOptions: function (options) {
		options = options || {};
		this._cellSize = options.cellSize || 16;
		this._rows = options.rows || 32;
		this._columns = options.columns || 32;
		this._width = this._cellSize * this._columns;
		this._height = this._cellSize * this._rows;

		this._canvas.width = this._width;
		this._canvas.height = this._height;
	}
};



module.exports = Canvas;
