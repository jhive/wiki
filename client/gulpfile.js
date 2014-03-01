'use strict';

var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    stylus  = require('gulp-stylus'),
    watch   = require('gulp-watch'),
    clean   = require('gulp-clean'),
    connect = require('gulp-connect'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    mocha   = require('gulp-mocha');

var dist = "dist/";

var paths = {
  templates:  "src/**/*.html",
  scripts:    "src/app/**/*.js",
  styl:       "src/styl/*.styl",
  assets:     "src/assets/**/*",
  vendor:     "vendor/**/*.min.js",
  tests:      "src/app/**/*.spec.js"
};

gulp.task('clean', function(cb){
  return gulp.src(dist + '/**', {read:false})
    .pipe(clean({force:true}));
});

gulp.task('copy', function(){
  return gulp.src(paths.vendor)
    .pipe(gulp.dest(dist + "/vendor"));
});

gulp.task('html', function(){
  return gulp.src(paths.templates)
    .pipe(gulp.dest(dist));
});

gulp.task('stylus', function(){
  return gulp.src(paths.styl)
    .pipe(stylus())
    .pipe(gulp.dest(dist+'/css'));
});

gulp.task('jshint', function(){
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function(){
  return gulp.src(paths.tests)
    .pipe(mocha({reporter: 'list'}));
});

gulp.task('compile', function(){
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dist));
});

gulp.task('watch', function(){
  gulp.watch(['src/**/*'], ['default']);
});
//'clean','html2js','concat','recess:build','copy:assets'

gulp.task('build', ['jshint', 'copy', 'stylus', 'html'], function(){
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dist));
});

gulp.task('compile', ['jshint', 'copy', 'stylus', 'html'], function(){
  return gulp.src(paths.scripts)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist));
});

gulp.task('release', ['clean'], function(){
  gulp.start('compile');
});

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});