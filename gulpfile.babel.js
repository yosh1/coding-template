const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('babel', () => {
  return gulp
    .src('src/js/**/*.js')
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('scss', () => {
  const sass = require('gulp-sass')
  const cssnext = require('postcss-cssnext')
  const postcss = require('gulp-postcss')
  const processors = [cssnext({
    browsers: ['last 2 version']
  })]

  return gulp
    .src('./src/style/**/*.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/style/'))
});

gulp.task('copy', function () {
  return gulp.src(
    ['src/**/*.html', 'src/img/**/*'],
    { base: 'src' }
  )
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: './dist/',
      index: 'index.html',
    },
  })
  done()
})

gulp.task('watch', () => {
  const browserReload = done => {
    browserSync.reload()
    done()
  }
  gulp.watch('./dist/**/*', browserReload);
  gulp.watch('./src/index.html', gulp.series(browserReload, 'copy'));
  gulp.watch('./src/js/**/*.js', gulp.series('babel'));
  gulp.watch('./src/style/**/*.scss', gulp.series('scss'));
})

gulp.task('build',
  gulp.parallel('copy', 'babel', 'scss')
);

gulp.task('default', gulp.series('serve', 'build', 'copy', 'watch'))
