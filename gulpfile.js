const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const purify = require('gulp-purifycss');
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();


gulp.task('default', ['purifycss', 'uglifycss', 'sass-compiler', 'uglifyjs', 'watch'], () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Uglifies JS
gulp.task('uglifyjs', () => {
  gulp.src('js/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js/min'))
    .pipe(browserSync.stream());
});

gulp.task('purifycss', function() {
  gulp.src('./css/bootstrap.css')
    .pipe(purify(['./js/**/*.js', './index.html']))
    .pipe(gulp.dest('./css/'));
});

// Uglifies CSS
gulp.task('uglifycss', () => {
  gulp.src('css/*.css')
    .pipe(purify(['./js/**/*.js', './*.html']))
    .pipe(uglifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/min'))
    .pipe(browserSync.stream());
});

// Watch for saves
gulp.task('watch', () => {
  gulp.watch('js/*.js', ['uglifyjs']);
  gulp.watch('css/*.css', ['uglifycss']);
  gulp.watch('sass/**/*.scss', ['sass-compiler']);
  gulp.watch('**/*.html').on('change', browserSync.reload);
});

// Minify images
gulp.task('images', () => {
  gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images/'));
});


// Compile Sass
gulp.task('sass-compiler', () => {
  gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
    .pipe(gulp.dest('./css'));
});
