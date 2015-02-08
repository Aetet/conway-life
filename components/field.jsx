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
    var conway = new Conway($canvas, {
    	cellSize: 32,
    	rows: 100,
    	columns: 100,
    });
    conway.createGrid();
    conway.load(fixtures.hash10.data)
    conway.run(1000, 500);
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
