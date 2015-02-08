module.exports = function () {
	var Conway = require('./conway');
	var fixtures = require('./fixtures');

	var $canvas = document.getElementById("conway");
	var rows = 100;
	var columns = 100;
	var data = fixtures.presets.gliders(rows, columns)
	var conway = new Conway($canvas, {
		cellSize: 32,
		rows: rows,
		columns: columns,
	});
	conway.createGrid();
	conway.load(data);
	conway.run(500, 100);
};
