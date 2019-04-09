const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// Copies all HTML files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimises images
gulp.task('imagemin', function(){
    gulp.src('src/img/**/*')
        .pipe(imagemin())
            .pipe(gulp.dest('dist/img'));
});

// Transpiles & Minifies JS
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
            .pipe(uglify().on('error', function(e){
                console.log(e);
            }))
                .pipe(gulp.dest('dist/js'));
});

// Transpiles Sass
gulp.task('sass', function(){
    gulp.src('src/scss/**/*scss')
        .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['copyHtml', 'imagemin', 'minify', 'sass']);

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['minify']);
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/img/**/*', ['imagemin']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});
