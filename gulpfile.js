var gulp = require('gulp'),

    connect = require('gulp-connect'),

    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),

    stylus = require('gulp-stylus'),
    prefix = require('gulp-autoprefixer'),

    jade = require('gulp-jade'),

    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),

    buildFolder = './',
    srcFolder = 'src';

gulp.task('connect', function() {
    return connect.server({
        port: 63342,
        livereload: true,
        root: buildFolder
    });
});

gulp.task('css', function() {
    gulp.src(srcFolder + "/styles/[^_]*.styl")
        .pipe(plumber({errorHandler: notify.onError("Css error: <%= error.message %>")}))
        .pipe(stylus({'include css': true}))
        .pipe(concat('style.css'))
        .pipe(prefix('> 1%'))
        .pipe(gulp.dest(buildFolder+'/css'))
        .pipe(connect.reload())
        .pipe(notify("Css succeed"));
});

gulp.task('html', function() {
    gulp.src(srcFolder + "/pages/[^_]*.jade")
        .pipe(plumber({errorHandler: notify.onError("Html error: <%= error.message %>")}))
        .pipe(jade())
        .pipe(gulp.dest(buildFolder))
        .pipe(connect.reload())
        .pipe(notify({
            message: "Html succeed",
            onLast: true
        }));
});

gulp.task('js', function(){
    gulp.src(srcFolder + "/js/[^_]*.js")
        .pipe(plumber({errorHandler: notify.onError("Js error: <%= error.message %>")}))
        .pipe(uglify())
        .pipe(gulp.dest(buildFolder + "/js"))
        .pipe(connect.reload())
        .pipe(notify({
            message: "Js succeed",
            onLast: true
        }));
});


gulp.task('default', ['css', 'html', 'js'], function( ) {
    gulp.watch([srcFolder + "/**/*.jade"], ['html']);
    gulp.watch([srcFolder + "/**/*.styl"], ['css']);
    gulp.watch([srcFolder + "/**/*.js"], ['js']);
});

gulp.task('build', ['css', 'html', 'js']);