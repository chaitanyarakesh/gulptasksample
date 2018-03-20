const gulp = require('gulp');
const minifyCss = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec
gulp.task('nodestart',  (cb) =>
  exec('nodemon server.js',  (err, stdout, stderr) =>
    cb(err)
  )
);
gulp.task('minify-css',function(){
  gulp.src('./public/css/*.css')
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(livereload())
});

gulp.task('minify-js',function(){
  gulp.src(['./public/angularapp/*.js','./public/angularapp/**/*.js'])
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('./public/dist/js'))
  .pipe(livereload())
});
gulp.task('watch', function() {
  gulp.watch(['./public/angularapp/*.js','./public/angularapp/**/*.js'], ['minify-js']);
  gulp.watch(['./public/css/*.css'], ['minify-css']);
//  gulp.watch(['./public/assets/img/*'], ['minify-images']);
});
gulp.task('default',['minify-css','minify-js','watch','nodestart'])
