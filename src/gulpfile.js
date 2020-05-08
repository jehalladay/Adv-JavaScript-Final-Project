const {parallel, task } = require('gulp'),
		nodemon = require('gulp-nodemon'),
		browserSync = require('browser-sync').create();

const PORT = 3002;
var hostName = '127.0.0.1';
var browserName = 'chrome'


function callHello() {
	console.log('hello world');
}; 

function serverHandler() {
    nodemon({
		script: 'app.js',
		args: [hostName],
        watch: ["app.js", "routes/", "models/", "config/"],
        ext: 'js'
    }).on('restart', () => {
		console.log('Changes Detected: Restarting app.js')
  });
};

function reloadPage() {
	setTimeout( ()=>
		browserSync.init(null, {
			proxy: `http://${hostName}:${PORT}`,
			files: ['public/js/*.js', "public/js/views/*.js", "public/js/models/*.js", 'views/*.ejs', 'public/css/*.css'],
			browser: browserName,
			port: 7000,
			host: hostName}),
		15000 // wait for server to finish loading
	)
};



task('reload', reloadPage);
task('server', serverHandler);
task('hello', callHello);

exports.default = parallel(['server', 'reload']);
exports.IP = (function() {
	hostName = '192.168.1.13'
	browserName = 'firefox'

	return  parallel(['server', 'reload'])
}())