'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'app',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e-tests'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
