const conf = require('./variables.js');
const gulp = require('gulp');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const print = require('gulp-print');
const del = require('del');
const gulpSequence = require('run-sequence');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 2 versions']});
const preprocess = require('gulp-preprocess');
const rename = require('gulp-rename');
const zip = require('gulp-zip');
const uglify = require('gulp-uglify-es').default;
const connect = require('gulp-connect');

const appVersion = require('./package.json').version;

gulp.task('connect', function() {
  connect.server();
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
  return gulp.src(conf.SRC + 'index_template.html')
    .pipe(preprocess({context: {MODE: isProd ? 'prod': 'dev', BASE_URL: conf.BASE_URL, APP_VERSION: appVersion}}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(isProd ? conf.DIST_DIR : conf.SRC));
};

gulp.task('watch', function() {
  gulp.watch(conf.SRC + '/**/*.less', ['less_dev']);
  gulp.watch(conf.SRC + '/**/*.html', ['html_dev']);
});

gulp.task('prod', ['clean'], function(done) {
  return gulpSequence(['less_prod', 'html_prod', 'media_prod', 'lib_prod', 'api'], done);
});

gulp.task('dev', ['clean'], function(done) {
  return gulpSequence(['less_dev', 'html_dev'], done);
});

gulp.task('html_prod', function() {
  return htmlProcess(true);
});

gulp.task('html_dev', function() {
  return htmlProcess(false);
});

gulp.task('less_dev', function() {
  return compileLess([conf.SRC + 'assets/styles/styles.less'], {isProd: false});
});

gulp.task('less_prod', function() {
  gutil.log('Compiling LESS for production');
  return compileLess(conf.SRC + 'assets/styles/styles.less', {isProd: true, dest: conf.DIST_DIR + 'assets/styles/'});
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

gulp.task('api', function() {
  return gulp.src(conf.SRC + 'api/**').pipe(gulp.dest(conf.DIST_DIR + 'api/'));
});

gulp.task('clean', function(done) {
  del([conf.DIST_DIR, conf.AOT_DIR]).then(paths => {
    gutil.log(gutil.colors.gray('Deleted folders:\n\t', paths.join('\n\t')));
    done();
  });
});

gulp.task('clean_src', function(done) {
  del(['./src/**/*.js', './src/**/*.js.map', '!systemjs.config.js']).then(paths => {
    gutil.log(gutil.colors.gray('Deleted files:\n\t', paths.join('\n\t')));
    done()
  });
});

gulp.task('uglify', function () {
  gulp.src(conf.DIST_DIR + 'app.' + appVersion + '.js')
    .pipe(uglify({mangle: true, compress: true}))
    .pipe(gulp.dest(conf.DIST_DIR));
});

gulp.task('zip', function() {
  return gulp.src([conf.DIST_DIR + '**/*.*', '!' + conf.DIST_DIR + '**/build.zip'])
    .pipe(zip('./build.' + appVersion + '.zip'))
    .pipe(gulp.dest(conf.DIST_DIR));
});