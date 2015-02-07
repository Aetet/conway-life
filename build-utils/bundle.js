module.exports = function bundle(plugs, options, cb) {
	options = options || {};
	var release = options.release;
	cb = cb || function () {};
	return function (err, stats) {
		if (err) {
			throw new plugs.util.PluginError('webpack', err);
		}
		!release && plugs.util.log('[webpack]', stats.toString({colors: true}));
		return cb(null, stats);
	} 
};
