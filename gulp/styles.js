'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {

    var sassOptions = {
        style: 'expanded',
        'sourcemap=none': true
    };

    var injectFiles = gulp.src([
        paths.src + '/assets/stylesheets/**/*.scss',
        '!' + paths.src + '/index.scss'
    ], {read: false});

    var injectOptions = {
        transform: function (filePath) {
            filePath = filePath.replace(paths.src + '/', '');
            filePath = filePath.replace(paths.src + '/components/', '../components/');
            return '@import \'' + filePath + '\';';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    var indexFilter = $.filter('index.scss');

    return gulp.src(paths.src + '/index.scss')
        .pipe(indexFilter)
        .pipe($.inject(injectFiles, injectOptions))
        .pipe(indexFilter.restore())
        .pipe($.rubySass(sassOptions)
            .on('error', function (err) {
                console.error('Error!', err.message);
            })
        )

        .pipe($.autoprefixer())
        .on('error', function handleError(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(paths.tmp + '/serve/styles/'))
        .pipe(gulp.dest(paths.dist + '/styles/'));
});
