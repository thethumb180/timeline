// Defining base paths
var basePaths = {
    js: './js/',
    css: './css/',
    node: './node_modules/',
    dev: './src/'
};

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var del = require('del');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            notify: false,
            browser: "chrome",
            baseDir: 'app'
        },
    })
});


gulp.task('clean-source', function () {
    return del(['src/**/*',]);
});

////////////////// All SASS  Assets /////////////////////////
gulp.task('copy-assets', ['clean-source'], function () {

// Copy all Font Awesome Fonts
    var stream = gulp.src(basePaths.node + 'font-awesome/fonts/*.{ttf,woff,woff2,eot,otf,svg}')
        .pipe(gulp.dest('./app/fonts'));

// Copy all Font Awesome SCSS files
    gulp.src(basePaths.node + 'font-awesome/scss/*.scss')
        .pipe(gulp.dest(basePaths.dev + '/sass/fontawesome'));

    return stream;
});

// Run
// gulp dist
// Copies the files to the /dist folder for distribution as simple theme
gulp.task('dist', ['clean-dist'], function () {
    gulp.src(['**/*', '!app/scss', '!app/scss/**', '!bower_components', '!bower_components/**', '!node_modules', '!node_modules/**', '!src', '!src/**', '!dist', '!dist/**', '!dist-product', '!dist-product/**', '!sass', '!sass/**', '!readme.txt', '!readme.md', '!package.json', '!gulpfile.js', '!CHANGELOG.md', '!.travis.yml', '!jshintignore', '!codesniffer.ruleset.xml', '*'])
        .pipe(gulp.dest('dist/'))
});

// Deleting any file inside the /src folder
gulp.task('clean-dist', function () {
    return del(['dist/**/*',]);
});