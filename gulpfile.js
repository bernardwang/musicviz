// *************************************
//
//	gulpfile.js
//
//	tasks:
//  	`gulp`
//   	`gulp sass`
//   	`gulp css`
//
// *************************************

// *************************************
//
//	Modules
//
// *************************************

var gulp					= require('gulp');
var sass					= require('gulp-sass');
var sourcemaps		= require('gulp-sourcemaps');
var min						= require('gulp-minify-css');
var concatCSS 		= require('gulp-concat-css');
var notify        = require('gulp-notify');
var sync 					= require('browser-sync').create();

// *************************************
//
//	File constants
//
// *************************************

var	ALL_HTML 			= './public/**/*.html';

var	ALL_SASS 			= './app/stylesheets/sass/**/*.scss'; 
var ALL_CSS				= './app/stylesheets/css/*.css'; 
var DEST_CSS			= './app/stylesheets/css/';
var	DIST_CSS			= './public/css/';
var DEST_SOURCEMAP= '../../../public/css/';

var ALL_JS				= './public/*.js';
var DIST_JS				= './public/';

// *************************************
//
//	Tasks
//
// *************************************

// convert sass to css
gulp.task('sass', function(){
	gulp.src(ALL_SASS)
		.pipe(sourcemaps.init())
  	.pipe(sass())
		.pipe(sourcemaps.write())
  	.pipe(gulp.dest(DEST_CSS))
  	.pipe(notify({ message: 'sass complete' }));
});

// concat & min css, pipe to dist
gulp.task('css', ['sass'],  function(){
	gulp.src(ALL_CSS)
  	.pipe(concatCSS('bundle.min.css'))
  	.pipe(min())
  	.pipe(gulp.dest(DIST_CSS))
  	.pipe(notify({ message: 'css complete' }));
});
	
// setup browser sync
gulp.task('sync', function() {
	sync.init({
		server: { baseDir: "./public" },
    reloadDelay: 1000
	});
	gulp.watch(ALL_SASS).on('change', sync.reload);
	gulp.watch(ALL_HTML).on('change', sync.reload);
});

gulp.task('style', ['css']); 
gulp.task('serve', ['sync']);