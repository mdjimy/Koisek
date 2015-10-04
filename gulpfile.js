// Basic Gulp File
//
var del = require('del'),
    gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp),
    bower = require('gulp-bower'),
    notify = require("gulp-notify"),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    sass = require('gulp-ruby-sass'),
    autoprefix = require('gulp-autoprefixer');

var config = {
    nodeDir: './node_modules',
    bowerDir: './bower_components',
    cssDir: './www/css',
    sassDir: './www/scss',
    fontsDir: './www/fonts',
    jsDir: './www/js',
    jsSrcDir: './www/js-src',
    jsVendorDir: './www/js/vendor'
};

/************************************ Bower ***********************************/

// Bower
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

/************************************ Icons ***********************************/

// Font awesome
gulp.task('fontawesome-icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest(config.fontsDir + '/fontawesome'));
});

// Bootstrap icons
gulp.task('bootstrap-icons', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass-official/assets/fonts/bootstrap/**.*')
        .pipe(gulp.dest(config.fontsDir + '/bootstrap'));
});

gulp.task('icons', ['fontawesome-icons', 'bootstrap-icons']);


/********************************* Stylesheets ********************************/

// Stylesheets
gulp.task('scss', function() {
    return gulp.src(config.sassDir + '/main.scss')
        .pipe(sass({
                style: 'compressed'
            })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            }))
        )
        .pipe(autoprefix('last 4 versions'))
        .pipe(gulp.dest(config.cssDir));
});

/********************************* JavaScript *********************************/

// Angular JS
gulp.task('angular-js', function() {
    return gulp.src(config.bowerDir + '/angularjs/angular.min.js')
        .pipe(gulp.dest(config.jsVendorDir));
});

// Bootstrap JS
gulp.task('bootstrap-js', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest(config.jsVendorDir));
});

// Fastclick JS
gulp.task('fastclick-js', function() {
    return gulp.src(config.bowerDir + '/fastclick/lib/fastclick.js')
        .pipe(uglify())
        .pipe(rename('fastclick.min.js'))
        .pipe(gulp.dest(config.jsVendorDir));
});

// Jquery JS
gulp.task('jquery-js', function() {
    return gulp.src(config.bowerDir + '/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(config.jsVendorDir));
});

// Cordova JS
gulp.task('cordova-js', function() {
    return gulp.src(config.bowerDir + '/cordova/**/*.js')
        .pipe(gulp.dest(config.jsVendorDir + '/cordova'));
});

// Vendor JS
gulp.task('js-vendor', ['angular-js', 'bootstrap-js', 'fastclick-js', 'jquery-js', 'cordova-js']);

// Src JS
gulp.task('js-src', function() {
    return gulp.src(config.jsSrcDir + '/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.jsDir));
});

gulp.task('js', ['js-src', 'js-vendor']);

/************************************ Main ************************************/

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassDir + '/**/*.scss', ['scss']);
    gulp.watch(config.jsSrcDir + '/**/*.js', ['js-src']);
});

// Clean folders
gulp.task('clean', function(cb) {
  return del([
        '.sass-cache',
        config.cssDir + '/*',
        config.fontsDir + '/bootstrap/*',
        config.fontsDir + '/fontawesome/*',
        config.jsDir + '/*'
    ], cb);
});

// Build
gulp.task('build', ['bower', 'icons', 'scss', 'js']);

// Clen build
gulp.task('clean-build', gulpsync.sync(['clean', 'build']));

// Default -> Clean build
gulp.task('default', ['clean-build']);