var		gulp    	= require('gulp'),
		scss        = require('gulp-sass'),
		browserSync = require('browser-sync'),
		uglify      = require('gulp-uglifyjs'),
		concat      = require('gulp-concat'),
		cssnano     = require('gulp-cssnano'),
		rename      = require('gulp-rename'),
		del         = require('del'),
		imagemin    = require('gulp-imagemin'),
		pngquant    = require('imagemin-pngquant'),
		autoprefixer= require('gulp-autoprefixer'),
		nunjucks 	= require('gulp-nunjucks'),
		svgSprite   = require('gulp-svg-sprite'),
		cheerio     = require('gulp-cheerio'),
		replace     = require('gulp-replace');

var config = {
	shape: {
		dimension: {         // Set maximum dimensions
			maxWidth: 500,
			maxHeight: 500
		},
		spacing: {         // Add padding
			padding: 0
		}
	},
	mode: {
		symbol: {
			dest : '.'
		}
	}
};

gulp.task('svg-sprite', function (cb) {
	return   gulp.src('assets/img/del/*.svg')
			.pipe(svgSprite(config))	
			.pipe(cheerio({
				run: function($, file) {
					$('[fill]:not([fill="currentColor"])').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
				},
				parserOptions: { xmlMode: true }
			}))
			.pipe(replace('&gt;', '>'))
			.pipe(rename({ basename: 'svgSprite' }))
			.pipe(gulp.dest('assets/img'))
});			

gulp.task('nunjucks', function () {
	return   gulp.src('assets/templates/index.html')
			.pipe(nunjucks.compile())
			.pipe(gulp.dest(''))
			.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scss', function() {
	return   gulp.src('assets/scss/style.scss')
			.pipe(scss().on( 'error', function( error )
			{console.log( error );} )
			)
			.pipe(autoprefixer(['last 4 versions'], {cascade:true}))
			.pipe(gulp.dest(''))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
	return   gulp.src('assets/js/include.js')
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify()) 
			.pipe(gulp.dest('assets/js/min'))
			.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('img', function(){
	return   gulp.src('asetsp/img/**/*')
			.pipe(imagemin({
				interlaced: true,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('assets/img'));
});

gulp.task('watch', ['browser-sync', 'nunjucks', 'scss', 'js'], function() {
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('app/templates/*.html', ['nunjucks']);
	gulp.watch('app/js/layout/*.js', ['js']);
});

gulp.task('build', ['nunjucks', 'scss', 'img', 'js'], function() {	
	var buildSvgSprite = gulp.src('app/img/svg/sprite.svg')
	.pipe(gulp.dest('dist/img/svg'));
});


// Default Task
gulp.task('default', ['watch']);