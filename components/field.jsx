/** @jsx React.DOM */

var React = require('react');
var Conway = require('../client/js/conway');
var fixtures = require('../client/js/fixtures');

var Field = React.createClass({
	onError: function (err) {
		console.log('err:', err);
		alert(err.message);
	},
	componentDidMount: function () {
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
    setTimeout(function () {
    	conway.stop();
    }, 1000);
	},
	render: function () {
		return (
			<div className="field">
				<canvas height='320' width='480' id='conway' >Обновите браузер</canvas>
			</div>
		);
	}
});

module.exports = Field;
