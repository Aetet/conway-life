var React = require('react');
var Field = require('./field');
var Controls = require('./controls');
var Hello = React.createClass({
	render: function () {
		return <div className="container">
			<Controls />
			<Field />
		</div>
	}
});

module.exports = Hello;
