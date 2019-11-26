const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('babel', () => {
  return gulp
    .src('src/js/*.js')
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('scss', () => {
  const sass = require('gulp-sass')
  const cssnext = require('postcss-cssnext')
  const postcss = require('gulp-postcss')
  const processors = [cssnext({
    browsers: ['last 2 version']
  })]

  return gulp
    .src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('assets/css/'))
});

gulp.task('build',
  gulp.parallel('babel', 'scss')
);

gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: './',
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
  gulp.watch('./assets/**/*', browserReload);
  gulp.watch('./index.html', browserReload);
  gulp.watch('./src/js/*', gulp.series('babel'));
  gulp.watch('./src/scss/*', gulp.series('scss'));
})

gulp.task('default', gulp.series('serve', 'watch'))
