const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', () => {
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
        .pipe(cleanCSS({
            compatibility: 'ie9'
        }))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('babel', () => {
    const babel = require('gulp-babel')
    return gulp
        .src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./dist'))
})

gulp.task('serve', done => {
    browserSync.init({
        server: {
            baseDir: './dist',
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
    gulp.watch('./dist/**/*', browserReload)
    gulp.watch('./src/scss/*.scss', gulp.series('sass'))
    gulp.watch('./src/js/*.js', gulp.series('babel'))
})

gulp.task('default', gulp.series('serve', 'watch'))
