var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugs = gulpLoadPlugins();
var notifier = require('node-notifier');
var lr = require('tiny-lr')();
var http = require('http');
var ecstatic = require('ecstatic');

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));

var env = argv.ENV || 'development';
var config = require('./configs/build-config')({cwd: __dirname, env: env});
var tasks = require('./build-utils/tasks')(gulp, plugs, config);
var es = require('event-stream');


gulp.task('clean', function () {
	return gulp.src(config.publicPath).pipe(plugs.clean());
});


// script building by webpack
gulp.task('scripts', tasks.scripts);
gulp.task('scripts-clean', ['clean'], tasks.scripts);


// All styles concat
gulp.task('styles', tasks.styles);
gulp.task('styles-clean', ['clean'], tasks.styles);


gulp.task('build-clean', ['scripts-clean', 'styles-clean']);
gulp.task('build', ['scripts', 'styles']);


gulp.task('watch', function () {
	http.createServer(
		ecstatic({ root: __dirname + '/public' })
		).listen(9002);
	lr.listen(35729);
	gulp.watch(config.paths.styles, tasks.styles);

	// Dummy notify for app build. We assume that script building longer than style.
	tasks.scriptsWatch().pipe(es.map(function (data, cb) {
		lr.changed({body: {files: ['*']}});
		notifier.notify({title: 'Gulp:', message: 'App was built'});
		cb();
	}));

});

gulp.task('default', ['watch']);
