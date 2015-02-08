var webpack = require('webpack');
var webpackConfigFactory = require('./webpack.config');
var bundle = require('./bundle');
var queue = require('streamqueue');
var through = require('through2');

module.exports = function (gulp, plugs, config) {
	var webpackConfig = webpackConfigFactory(config);
	var release = config.release;

	return {
		scripts: function (cb) {
			return webpack(webpackConfig).run(bundle(plugs, {
				release: release,
				started: false
			}, cb));
		},

		scriptsWatch: function () {
			var ts = through.obj(function (chunk, enc, cb) {
				var self = this;


				webpack(webpackConfig).watch(200, bundle(plugs, {
					release: release, 
					started: false
				}, function (err, stats) {
					self.push({});
				}));
				cb();

			});
			ts.write('begin');

			return ts;
		},

		styles: function () {
			return queue({objectMode: true},
				gulp.src(config.paths.css)
			).pipe(plugs.concat('main.css'))
			.pipe(gulp.dest(config.paths.destStyles))
		}
	};
};
