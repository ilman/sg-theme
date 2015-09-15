/*global -$ */
'use strict';
// generated on 2015-04-29 using generator-sgtheme 0.0.1
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('frontless', function () {

  return gulp.src(['assets/less/front.less', 'assets/less/front-bootstrap.less'])
    .pipe($.debug())
    .pipe($.plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe($.less())
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe(gulp.dest('assets/css')); 
});

gulp.task('adminless', function () {

  return gulp.src(['packages/scienceguard/quizapp/assets/less/bootstrap.less','packages/scienceguard/quizapp/assets/less/admin.less', 'packages/scienceguard/quizapp/assets/less/app.less'])
    .pipe($.debug())
    .pipe($.plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe($.less())
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe(gulp.dest('packages/scienceguard/quizapp/assets/css')); 
});

gulp.task('scripts', function () {

  return gulp.src([
      'assets/js/front-vendors.js', 
      'assets/js/admin-vendors.js', 
    ])
    .pipe($.debug())
    .pipe($.plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe($.uglify())
    .pipe($.rename(function(path){
      path.extname = ".min.js";
    }))
    .pipe(gulp.dest('assets/js')); 
});


gulp.task('adminscripts', function () {

  return gulp.src(['packages/scienceguard/quizapp/assets/js/vendors.js'])
    .pipe($.debug())
    .pipe($.plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe($.uglify())
    .pipe($.rename(function(path){
      path.extname = ".min.js";
    }))
    .pipe(gulp.dest('packages/scienceguard/quizapp/assets/js')); 
});

gulp.task('cleanzip', function () {
  return gulp.src('code.zip', {read: false})
    .pipe($.clean());
});

gulp.task('zip', ['cleanzip'], function () {

  return gulp.src([
      '!**/node_modules/', 
      '!**/bower_components/', 
      '!**/.git/', 
      '!app/storage', 
      '!code.zip',
      '!package.json',
      '!gulpfile.js',
      '*',
      'app/**/*',
      'assets/**/*',
      'bootstrap/**/*',
      'packages/**/*',
      'uploads/**',
      'vendor/**/*',
      'workbench/**/*',
    ], {base: '.'})
    .pipe($.ignore.exclude('node_modules/'))
    .pipe($.ignore.exclude('bower_components/'))
    .pipe($.ignore.exclude('.git/'))
    .pipe($.ignore.exclude('app/storage/'))
    // .pipe($.debug())
    .pipe($.plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe($.vinylZip.dest('code.zip')); 
});


gulp.task('jshint', function () {
  return gulp.src('assets/js/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('images', function () {
  return gulp.src('assets/raw_images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('assets/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('assets/raw_fonts/**/*'))
    .pipe(gulp.dest('assets/fonts'));
});

gulp.task('clean', require('del').bind(null, ['assets/dist']));

gulp.task('build', ['jshint', 'images', 'fonts'], function () {
  return gulp.src('assets/dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
