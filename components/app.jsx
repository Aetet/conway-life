var React = require('react');
var Conway = require('../client/js/conway');
var Field = require('./field');
var Controls = require('./controls');
var Hello = React.createClass({
	render: function () {
		return <div>
			<Field />
			<Controls />
		</div>
	}
});

module.exports = Hello;
