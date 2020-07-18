const gulp = require('gulp')
const less = require('gulp-less');
const bs = require('browser-sync').create()

gulp.task('styles', () => {
  return gulp.src('css/style.less')
    .pipe(less())
    .pipe(gulp.dest('.'))
    .pipe(bs.stream())
})

gulp.task('watch', () => {
  gulp.watch('**/*.less', gulp.series('styles'))
})

gulp.task('bs', () => {
  bs.init({
    server: { baseDir: '.' }
  })
})

gulp.task(
  'default',
  gulp.parallel(
    gulp.series('styles', 'watch'),
    'bs'
  )
)