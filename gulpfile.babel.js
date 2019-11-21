const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('babel', function () {
  gulp.src('src/js/*.js')
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
const postcss = require('gulp-postcss');
  const processors = [cssnext({
    browsers: ['last 2 version']
  })]

  gulp.src("src/scss/**/*.scss")
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest("assets/css"));
});

gulp.task('build', gulp.parallel('babel', 'scss'));

gulp.task('watch', () => {
  gulp.watch('src/**/*', gulp.parallel('babel', 'scss'));
});

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
  gulp.watch('./*.html', browserReload)
  gulp.watch('./src/scss/*.scss', gulp.series('scss'));
  gulp.watch('./src/js/*.js', gulp.series('babel'));
})

gulp.task('default', gulp.series('build', 'serve'));
