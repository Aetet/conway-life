function Canvas(canvas, options) {
	this._canvas = canvas;
	this._ctx = canvas.getContext('2d');

	this._parseOptions(options);
};

Canvas.prototype = {
	paint: function () {
		var ctx = this._ctx;
		ctx.strokeStyle = '#B70A02'; // меняем цвет рамки
		ctx.strokeRect(15, 15, 266, 266);
		ctx.strokeRect(18, 18, 260, 260);
		ctx.fillStyle = '#AF5200'; // меняем цвет клеток
		ctx.fillRect(20, 20, 256, 256);
		for (i = 0; i < 8; i += 2) {
			for (j = 0; j < 8; j += 2) {
				ctx.clearRect(20 + i * 32, 20 + j * 32, 32, 32);
				ctx.clearRect(20 + (i + 1) * 32, 20 + (j + 1) * 32, 32, 32);
			}
		}
	},
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
	_parseOptions: function (options) {
		options = options || {};
		console.log('options:', options);
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
