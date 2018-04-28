'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var hash = require('gulp-hash-filename');

var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

gulp.task('partials', function () {
    return gulp.src([
        paths.src + '/src/**/*.html',
        paths.tmp + '/src/**/*.html'
    ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'selfService',
            root: 'src/'
        }))
        .pipe(hash({
            "format": "{name}.{hash:8}{ext}"
        }))
        .pipe(gulp.dest(paths.dist + '/js'))
});

gulp.task('html', ['partials'], function () {

    return gulp.src(paths.src + '/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size({title: paths.dist + '/', showFiles: true}));
});

gulp.task('vendor', function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src($.mainBowerFiles())
        .pipe(jsFilter)
        .pipe($.angularFilesort())
        .pipe(gulp.dest(paths.dist + '/vendor'))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(gulp.dest(paths.dist + '/vendor'))
        .pipe(cssFilter.restore())
});

gulp.task('app-js', function () {
    return gulp.src(paths.src + '/*.js')
        .pipe(gulp.dest(paths.dist));
})

gulp.task('js', ['vendor', 'partials', 'app-js'], function () {

    return gulp.src([
        paths.src + '/src/**/*.js',
        '!' + paths.src + '/src/**/*.spec.js',
        '!' + paths.src + '/src/**/*.mock.js'
    ])
        .pipe($.angularFilesort())
        .pipe($.concat('app.js'))
        .pipe(hash({
            "format": "{name}.{hash:8}{ext}"
        }))
        .pipe(gulp.dest(paths.dist + '/js'));
})

gulp.task('images', function () {
    return gulp.src(paths.src + '/assets/images/**/*')
        .pipe(gulp.dest(paths.dist + '/assets/images/'));
});

gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('misc', function () {
  return gulp.src([
        paths.src + '/**/*.ico',
        paths.src + '/**/locale-*.json'
    ])
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('clean', function (done) {
    $.del([paths.dist + '/', paths.tmp + '/'], done);
});

gulp.task('build', function (callback) {
    runSequence('clean',
        'js', 'inject:build',
        'images', 'fonts', 'misc',
        callback);
});
