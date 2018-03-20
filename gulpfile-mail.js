var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
gulp.task('nodestart',  (cb) =>
  exec('nodemon server.js',  (err, stdout, stderr) =>
    cb(err)
  )
);

gulp.task('minify-images', () =>
    gulp.src('./public/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/dist/img'))
        .pipe(livereload())
);

gulp.task('minify-css',  () =>
    gulp.src('./public/assets/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(livereload())
);

gulp.task('minify-js', () =>  //default is a task name, we can give any name.
	gulp.src('./public/app/ctrl.js')
	.pipe(concat('angularRouting.min.js'))
	.pipe(uglify())
  .pipe(gulp.dest('./public/dist/'))
  .pipe(livereload())
);
gulp.task('watch', function() {
  gulp.watch(['./public/app/ctrl.js'], ['minify-js']);
  gulp.watch(['./public/assets/css/*.css'], ['minify-css']);
  gulp.watch(['./public/assets/img/*'], ['minify-images']);
});
gulp.task('default', ['nodestart','minify-images','minify-css','minify-js','watch']);
