var webpack = require('webpack');
module.exports = function (config) {
	var release = config.release;

	// Добавить поддержку hyper-config
	return {
		entry: config.entry,
		output: {
			filename: '[name].js',
			path: config.path,
			publicPath: config.publicPath,
			library: config.name || "isomorphic"
		},
		cache: !release,
		watch: true,
		debug: !release,
		// Посмотреть внимательнее
		devtool: false,
		stats: {
			colors: true,
			reasons: !release
		},
		plugins: release ? [
			new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.AggressiveMergingPlugin()
		] : [],
		resolve: {
			extensions: ['', '.js'],
			modulesDirectories: ['node_modules', 'bower_components']
		},
		module: {
			loaders: []
		}
	}
};
