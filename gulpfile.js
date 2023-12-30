const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

gulp.task('scss:compile', function () {
        return gulp.src('./public/view-social-icon/view-social-icon.scss')
                .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
                .pipe(autoprefixer())
                .pipe(gulp.dest('./public/view-social-icon/'));
});

gulp.task('watch', function () {
        gulp.watch('./public/view-social-icon/**/*.scss', gulp.series('scss:compile'));
});
