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
var min						= require('gulp-minify-css');
var concatCSS 		= require('gulp-concat-css');
var concat				= require('gulp-concat');
var lint					= require('gulp-jshint');
var uglify				= require('gulp-uglify');
var notify        = require('gulp-notify');
var sync 					= require('browser-sync').create();

// *************************************
//
//	File constants
//
// *************************************

var	ALL_HTML 			= './public/**/*.html';

var	ALL_SASS 			= './app/styles/sass/**/*.scss'; 
var ALL_CSS				= './app/styles/css/*.css'; // probably not needed
var DEST_CSS			= './app/styles/css/';			// probably not needed
var	DIST_CSS			= './public/css/';

var ALL_JS				= './public/*.js';	
var DIST_JS				= './public/';

// *************************************
//
//	Tasks
//
// *************************************

// concat & min css, pipe to dist
gulp.task('css', ['sass'],  function(){
	gulp.src(ALL_CSS)
  	.pipe(concatCSS('bundle.min.css'))
  	.pipe(min())
  	.pipe(gulp.dest(DIST_CSS))
  	.pipe(notify({ message: 'css complete' }));
});

// lint js
gulp.task('lint', function(){
	gulp.src(ALL_JS)
		.pipe(lint())
		.pipe(lint.reporter('default'))
		.pipe(notify({ message: 'lint complete' }));
});

// concat & uglify js, pipe to dist/js
gulp.task('js', ['lint',], function(){
	gulp.src(ALL_JS) 
  	.pipe(concat('bundle.min.js'))		// probably not needed
  	.pipe(uglify())
  	.pipe(gulp.dest(DIST_JS))
    .pipe(notify({ message: 'js complete' }));
});
	
// setup browser sync
gulp.task('sync', function() {
	sync.init({
		server: { baseDir: "./public" },
    reloadDelay: 1000
	});
	gulp.watch(ALL_SASS).on('change', sync.reload);
	gulp.watch(ALL_JS).on('change', sync.reload);
	gulp.watch(ALL_HTML).on('change', sync.reload);
});

gulp.task('prod', ['css','js']); 
gulp.task('serve', ['sync']);