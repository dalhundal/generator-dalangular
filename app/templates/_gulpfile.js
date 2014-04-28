/* === VARS === */
var configFile = "./gulpfile.json";
var configFileLocal = "./gulpfile.local.json";

var paths = {
	viewTemplates: 'application/views/**/*.html',
	directiveTemplates: 'application/directives/**/*.html',
	styles: [
		'application/styles/*.less',
		'application/directives/**/*.less',
		'application/views/**/*.less',
		'application/layouts/**/*.less'
	],
	build: 'application/build'
};

/* === DEPENDENCIES === */

var colors = require('colors');
var extend = require('extend');
var fs = require('fs');

var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpLess = require('gulp-less');
var gulpLiveReload = require('gulp-livereload');
var gulpMinifyCSS = require('gulp-minify-css');
var gulpPrefix = require('gulp-autoprefixer');
var gulpTemplateCache = require('gulp-angular-templatecache');

/* === LOAD CONFIG === */

var gulpConfig = require(configFile);
if (fs.existsSync(configFileLocal)) extend(true,gulpConfig,require(configFileLocal));
if (process.argv[2]=='build') gulpConfig.liveReload.enabled = false;
console.log();
console.log(gulpConfig);
console.log();

/* ====== */
var errorHandler = function (err) {
	console.log("\x07");
	console.log(("ERROR: "+err.plugin).red.inverse.bold);
	if (err.plugin=='gulp-less') {
		err.message = err.message.replace(/ in file.*/,'');
	}
	console.log(err.message.red.inverse);
	console.log("\x07");
}
/* ====== */

var buildCount = 1;
gulp.task('message',function() {
	console.log("<%= appName.toUpperCase() %> BUILD %d ".blue.inverse,buildCount++);
	console.log(new Date().toString().blue.inverse);
})

gulp.task('viewTemplates',function() {
	fs.writeFileSync(paths.build+'/viewTemplates.js','angular.module("app.viewTemplates", []);',{flag:'w'});
	var stream = gulp.src(paths.viewTemplates)
		.pipe(gulpTemplateCache('viewTemplates.js',{
			root: 'application/views',
			module: 'app.viewTemplates',
			standalone: true
		}))
		.pipe(gulp.dest(paths.build));
	if (gulpConfig.liveReload.enabled) stream.pipe(gulpLiveReload(gulpConfig.liveReload.port));
});

gulp.task('directiveTemplates',function() {
	fs.writeFileSync(paths.build+'/directiveTemplates.js','angular.module("app.directiveTemplates", []);',{flag:'w'});
	var stream = gulp.src(paths.directiveTemplates)
		.pipe(gulpTemplateCache('directiveTemplates.js',{
			root: 'application/directives',
			module: 'app.directiveTemplates',
			standalone: true
		}))
		.pipe(gulp.dest(paths.build));
	if (gulpConfig.liveReload.enabled) stream.pipe(gulpLiveReload(gulpConfig.liveReload.port));
});

gulp.task('templates', ['viewTemplates','directiveTemplates']);

gulp.task('styles',function() {
	var stream = gulp.src(paths.styles)
		.pipe(gulpConcat('application.less'))
		.pipe(gulpLess().on('error',errorHandler))
		.pipe(gulpPrefix())
		.pipe(gulp.dest(paths.build))
		.pipe(gulpMinifyCSS({
			removeEmpty: true
		}))
		.pipe(gulpConcat('application.min.css'))
		.pipe(gulp.dest(paths.build));
	if (gulpConfig.liveReload.enabled) stream.pipe(gulpLiveReload(gulpConfig.liveReload.port));
})

gulp.task('build',['message','templates','styles']);

gulp.task('watch', function () {
	gulp.watch(paths.viewTemplates, ['message','styles','templates']);
	gulp.watch(paths.directiveTemplates, ['message','styles','templates']);
	gulp.watch(paths.styles, ['message','styles']);
});

gulp.task('default', ['build','watch']);
