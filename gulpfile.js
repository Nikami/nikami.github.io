const conf = require('./variables.js');
const gulp = require('gulp');
const argv = require('yargs').argv;
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const print = require('gulp-print');
const del = require('del');
const vfs = require('vinyl-fs');
const gulpSequence = require('run-sequence');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 2 versions']});
const preprocess = require('gulp-preprocess');
const rename = require('gulp-rename');
const zip = require('gulp-zip');
const fs = require('graceful-fs');
const uglify = require('gulp-uglify-es').default;
const connect = require('gulp-connect');

const appVersion = require('./package.json').version;
const symlinkCreator = function(root, dest) {
  return gulp.src(root)
    .pipe(print())
    .pipe(vfs.symlink(dest || conf.MERGED));
};

gulp.task('connect', function() {
  connect.server();
});

gulp.task('symlink', function() {
  // Создаем symlink на все файлы в папке и вложеных папках
  return symlinkCreator(['./src/**/*.*', '!./src/**/*.js', '!./src/**/*.js.map']);
});

const compileLess = function(root, config) {
  gutil.log('Compiling LESS start for root \n\t' + root);
  return gulp.src(root)
    .pipe(gulpif(!config.isProd, sourcemaps.init()))
    .pipe(less({
      plugins: [autoprefix],
      compress: config.isProd
    }))
    .pipe(gulpif(!config.isProd, sourcemaps.write()))
    .pipe(gulp.dest(config.dest || function(file) {
      return file.base;
    }))
    .pipe(print())
    .on('end', () => gutil.log(gutil.colors.green('Compilation of LESS done.')));
};

const htmlProcess = function(isProd) {
  return gulp.src(conf.MERGED + 'index.html')
    .pipe(preprocess({context: {MODE: isProd ? 'prod': 'dev', BASE_URL: conf.BASE_URL, APP_VERSION: appVersion}}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(isProd ? conf.DIST_DIR : conf.MERGED));
};

gulp.task('watch', function() {
  gulp.watch(conf.MERGED + '**/*.less', ['less_dev']);
  gulp.watch(conf.MERGED + '**/*.html', ['html_dev']);
});

gulp.task('prepare_prod', ['clean'], function(done) {
  return gulpSequence(['less_prod', 'common_prod', 'html_prod', 'media_prod'], done);
});

gulp.task('prepare_dev', ['clean'], function(done) {
  return gulpSequence(['less_dev', 'html_dev'], done);
});

gulp.task('html_prod', function() {
  return htmlProcess(true);
});

gulp.task('html_dev', function() {
  return htmlProcess(false);
});

gulp.task('less_prod', ['less_app_prod', 'less_common_prod'], function() {
});

gulp.task('less_app_prod', function() {
  return compileLess(conf.MERGED + 'std/**/*.less', {isProd: true});
});

gulp.task('less_common_prod', function() {
  gutil.log('Compiling LESS for production');
  return compileLess(conf.MERGED + 'assets/styles/styles.less', {isProd: true, dest: conf.DIST_DIR + 'assets/styles/'});
});

gulp.task('less_dev', function() {
  return compileLess([conf.MERGED + 'std/**/*.less', conf.MERGED + 'assets/styles/styles.less'], {isProd: false});
});

gulp.task('lib_prod', function() {
  const commonLibs = [
    {name: 'shim', path: 'node_modules/core-js/client/shim.min.js'},
    {name: 'zone', path: 'node_modules/zone.js/dist/zone.min.js'}
  ];

  for (let file of commonLibs) {
    gulp.src(file.path)
      .pipe(rename(file.name + '.' + appVersion + '.js'))
      .pipe(gulp.dest(conf.DIST_DIR));
  }
});

gulp.task('media_prod', function() {
  const directories = [
    'src/assets/*fonts/**/*',
    'src/assets/*images/**/*'
  ];

  return gulp.src(directories)
    .pipe(gulp.dest(conf.DIST_DIR + 'assets/'));
});

gulp.task('common_prod', function() {
  const commonFiles = [conf.MERGED + 'favicon.ico'];

  return gulp.src(commonFiles)
    .pipe(gulp.dest(conf.DIST_DIR));
});


gulp.task('clean', function(done) {
  del([conf.MERGED, conf.DIST_DIR, conf.AOT_DIR]).then(paths => {
    gutil.log(gutil.colors.gray('Deleted folders:\n\t', paths.join('\n\t')));
    done();
  });
});

gulp.task('clean_src', function(done) {
  del(['./src/**/*.js', './src/**/*.js.map']).then(paths => {
    gutil.log(gutil.colors.gray('Deleted files:\n\t', paths.join('\n\t')));
    done()
  });
});

gulp.task('zip', function() {
  return gulp.src([conf.DIST_DIR + '**/*.*', '!' + conf.DIST_DIR + '**/build.zip'])
    .pipe(zip('./build.' + appVersion + '.zip'))
    .pipe(gulp.dest(conf.DIST_DIR));
});