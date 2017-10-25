'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject:build', ['styles'], function () {
    var injectStyles = gulp.src(
        paths.dist + '/styles/*.css',
        {read: false}
    );

    var injectScripts = gulp.src([
        paths.dist + '/js/*.js'
    ]).pipe($.angularFilesort());

    var injectOptions = {
        ignorePath: [paths.dist],
        addRootSlash: false
    };

    var wiredepOptions = {
        fileTypes: {
            html: {
                replace: {
                    js: function(filePath) {
                        return '<script src="' + 'vendor/' + filePath.split('/').pop() + '"></script>';
                    },
                    css: function(filePath) {
                        return '<link rel="stylesheet" href="' + 'vendor/' + filePath.split('/').pop() + '"/>';
                    }
                }
            }
        }
    };

    return gulp.src(paths.src + '/*.html')
        .pipe(wiredep(wiredepOptions))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('inject', ['styles'], function () {

    var injectStyles = gulp.src([
        paths.tmp + '/serve/**/*.css',
        '!' + paths.tmp + '/serve/app/vendor.css'
    ], {read: false});

    var injectScripts = gulp.src([
        paths.src + '/**/*.js',
        '!' + paths.src + '/src/**/*.spec.js',
        '!' + paths.src + '/src/**/*.mock.js'
    ]).pipe($.angularFilesort());

    var injectOptions = {
        ignorePath: [paths.src, paths.tmp + '/serve'],
        addRootSlash: false
    };

    var wiredepOptions = {
        directory: 'bower_components',
        exclude: [/bootstrap\.css/, /foundation\.css/]
    };

    return gulp.src(paths.src + '/*.html')
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(paths.tmp + '/serve'));

});
