var path = require('path');
module.exports = function (options) {
	var cwd = options.cwd;
	var env = options.env;
	var release = env === 'production';

	return {
		entry: path.join(cwd, 'client.js'),
		path: path.join(cwd, 'public', 'js'),
		publicPath: path.join(cwd, 'public'),
		name: 'isomorhic',
		moduleStyle: 'umd',
		filename: 'app.js',
		release: release,
		paths: {
			dest: path.join(cwd, 'public'),
			destStyles: path.join(cwd, 'public', 'css'),
			css: ['client/style/**/*.css'],
			stylus: ['client/style/**/*.styl'],
			styles: ['client/**/*.css', 'client/**/*.styl']
		}
	};
};
