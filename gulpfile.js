var gulp = require('gulp');
// clean
var clean = require('gulp-clean');
// concat
var concat = require('gulp-concat');
// rename
var rename = require("gulp-rename");

// js
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var config = {
  dist: './dist'
    // dist: '../front/bower_components/front-angular-blocks/dist'
}

// clean
gulp.task('clean', function () {
  return gulp.src(config.dist, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

// js
gulp.task('js', ['clean'], function () {
  return gulp.src([
      // tool
      './src/**/*.extends.js',
      // angular blocks
      './src/**/*.module.js',
      './src/**/*.provider.js',
      './src/**/*.factory.js',
      './src/**/*.service.js',
      './src/**/*.decorator.js',
      './src/**/*.interceptor.js'
    ])
    .pipe(concat('front-angular-blocks.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(config.dist))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist));
});


// default
gulp.task('default', function () {
  return gulp.start('js');
});