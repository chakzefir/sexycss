var gulp = require('gulp'),

    connect = require('gulp-connect'),

    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),

    stylus = require('gulp-stylus'),
    prefix = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),


    jade = require('gulp-jade'),

    concat = require('gulp-concat'),

    browserify = require('browserify'),
    source = require('vinyl-source-stream'),


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
    gulp.src(srcFolder + "/**/[^_]*.styl")
        .pipe(plumber({errorHandler: notify.onError("Css error: <%= error.message %>")}))
        .pipe(stylus({'include css': true}))
        .pipe(concat('style.css'))
        .pipe(prefix('> 1%'))
        .pipe(gulp.dest(buildFolder+'/css'))
        .pipe(connect.reload())
        .pipe(notify("Css succeed"));
});

gulp.task('html', function() {
    gulp.src(srcFolder + "/[^_]*.jade")
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
    browserify({
        entries: ['./'+srcFolder+'/app.js']
    }).bundle().on('error', function(error){
        console.log(error.toString());
        this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest(buildFolder))
    .pipe(connect.reload())

});


gulp.task('default', ['css', 'html'], function( ) {
    gulp.watch([srcFolder + "/**/*.jade"], ['html']);
    gulp.watch([srcFolder + "/**/*.styl"], ['css']);
//    gulp.watch([srcFolder + "/**/*.js"], ['js']);
});

gulp.task('build', ['css', 'html', 'js']);