/** @jsx React.DOM */

var React = require('react');
var Conway = require('../client/js/conway');

var Field = React.createClass({
	componentDidMount: function () {
	  var $canvas = document.getElementById("conway");
    var conway = new Conway($canvas, {
    	cellSize: 32,
    	rows: 10,
    	columns: 10
    });
    conway.createGrid();
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
