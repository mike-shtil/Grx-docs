var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

//default task
gulp.task('default', ['demo', 'watch']);

//watch Files For Changes
gulp.task('watch', function() {
  return gulp.watch('style/**/*.scss', ['demo']);
});

gulp.task('demo', function(){
  return gulp.src('style/**/*.scss')
     .pipe($.plumber({errorHandler: function(error){
        console.log(error);
        this.emit('end');
     }}))
     .pipe($.sourcemaps.init())
     .pipe($.sass({errLogToConsole: true, sourcemap: true, style: 'compact'}))
     .pipe($.autoprefixer({browsers: ['last 1 version', 'iOS 6'], cascade: false}))
     .pipe($.sourcemaps.write({includeContent: false, sourceRoot: '.'}))
     //.pipe($.cssnano({discardDuplicates: false})) //optional minification
     .pipe(gulp.dest('style/'));
});
