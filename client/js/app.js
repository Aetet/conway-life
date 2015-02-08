var $ = require('jquery');
var Conway = require('./conway');
var fixtures = require('./fixtures');

function App() {
};

App.prototype = {
	init: function () {
		this.initCanvas();
		this.initControls();

		return this;
	},
	initCanvas: function () {
		var $canvas = document.getElementById("conway");
		this._rows = 100;
		this._columns = 100;
		var conway = new Conway($canvas, {
			cellSize: 16,
			rows: this._rows,
			columns: this._columns,
		});
		this._conway = conway;
		conway.createGrid();
	},
	initControls: function () {
		var self = this;
		this._input = $('.input-data');
		this._input.val(JSON.stringify(fixtures.presets.gliders(self._rows, self._columns), null, 4));

		$('.run').click(this.onRun.bind(this));
		$('.stop').click(this.onStop.bind(this));
		$('.save').click(this.onSave.bind(this));
	},
	onRun: function () {
		var conway = this._conway;
		conway.stop();
		var data;
		try {
			var data = JSON.parse(this._input.val())
		}
		catch(e) {
			return ;
		}
		conway.load(data);
		conway.run(500, 100);

	},
	onStop: function () {
		this._conway.stop();
	},
	onSave: function () {
		this._input.val(JSON.stringify(this._conway.save(), null, 4));
	}
}

module.exports = App;
