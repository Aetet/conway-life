var React = require('react');
var Field = require('./field');
var Controls = require('./controls');
var Hello = React.createClass({
	render: function () {
		return <div className="container">
			<Field />
			<Controls />
		</div>
	}
});

module.exports = Hello;
