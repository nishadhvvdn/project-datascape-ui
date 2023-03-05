var gulp = require('gulp');
//const zip = require('gulp-zip');
//var Server = require('karma').Server;

/**
 * Run test once and exit
 */
// gulp.task('test', function (done) {
//   new Server({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });

// gulp.task('default', () =>
//     gulp.src('dataScape/**/*')
//         .pipe(zip('archive.zip'))
//         .pipe(gulp.dest('/'))
// );

'use strict';

var gulp = require('gulp');
var terser = require('gulp-terser');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var ngAnnotate = require('gulp-ng-annotate');
var jsonminify = require('gulp-jsonminify');
var inject = require('gulp-inject');

var devMode = false;

// gulp.task('build', gulp.series(
//   clean
// ));

gulp.task('css', function() {
  return gulp.src('./public/stylesheets/css/**/*.css')
   .pipe(concat('styles.css'))
   .pipe(cssmin())
   .pipe(gulp.dest('./build/stylesheets/css'));
 });

 gulp.task('configJson', function() {
  return gulp.src('./public/configuration.json')
  .pipe(jsonminify())
   .pipe(gulp.dest('./build/'));
 });

gulp.task('controllers', function() {
  //return gulp.src('./public/js/controllers**/*.js')
  return gulp.src(['./public/js/controllers/dataSCAPEController.js',
    './public/js/controllers/homePageCtrl.js',
    './public/js/controllers/networkStatisticsCtrl.js',
    './public/js/controllers/networkStatisticsMeterCtrl.js',
    './public/js/controllers/billingReportCtrl.js',
    './public/js/controllers/openUploadBillingReportCtrl.js',
    './public/js/controllers/openExportBillingReportCtrl.js',
    './public/js/controllers/dbStatisticsCtrl.js',
    './public/js/controllers/nonTechnicalLossCtrl.js',
    './public/js/controllers/onlineHelpCtrl.js',
    './public/js/controllers/inValidAccessCtrl.js',
    './public/js/controllers/networkResponseReportCtrl.js',
    './public/js/controllers/solarPanelReportCtrl.js',
    './public/js/controllers/batteryLifeReportCtrl.js',
    './public/js/controllers/deviceErrorReportCtrl.js',
    './public/js/controllers/delayedResponseReportCtrl.js',
    './public/js/controllers/outageReportCtrl.js',
    './public/js/controllers/phaserGraphsCtrl.js',
    './public/js/controllers/dataRateCtrl.js',
    './public/js/controllers/deltaLinkDataRateCtrl.js',
    './public/js/controllers/meterDataRateCtrl.js',
    './public/js/controllers/deviceDataRateReportCtrl.js'
  ])
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(terser()) 
  .pipe(gulp.dest('./build/js'));
});

gulp.task('directives', function() {
  return gulp.src('./public/js/directives**/*.js')
  .pipe(ngAnnotate())
  .pipe(concat('directives.js'))
  .pipe(terser())
  .pipe(gulp.dest('./build/js'));
});


gulp.task('models', function() {
  return gulp.src('./public/js/model**/*.js')
   .pipe(terser())
  .pipe(gulp.dest('./build/js'));
});

gulp.task('services', function() {
  return gulp.src('./public/js/services**/*.js')  
   .pipe(ngAnnotate())
   .pipe(concat('services.js'))
   .pipe(terser())
  .pipe(gulp.dest('./build/js'));
});

gulp.task('templates', function() {
  return gulp.src('./public/templates/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./build/templates'));
});

gulp.task('pagesJs', function() {
  return gulp.src('./public/pages/**/*.js')
  .pipe(terser())
  .pipe(gulp.dest('./build/pages'));
});

gulp.task('pagesHtml', function() {
  return gulp.src('./public/pages/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./build/pages'));
});

gulp.task('onlineHelpHtml', function() {
  return gulp.src('./public/online_Help/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./build/online_Help'));
});

gulp.task('tabsHtml', function() {
  return gulp.src('./public/tabs/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./build/tabs'));
});



//===========================================
// gulp.task('injectFile', function() {
//   return gulp.src('./views/index.html')
//   .pipe(htmlmin({ collapseWhitespace: true }))
//   .pipe(gulp.dest('../build-datascape-ui/views/build.html'));
// });


/* ==================== COPY FILES AND FOLDERS ================*/
gulp.task('copyAssets', function() {
  return gulp.src('./public/assets/**/*')
  .pipe(gulp.dest('./build/assets'));
});


gulp.task('copyJsLib', function() {
  return gulp.src('./public/js/lib/**/*')
  .pipe(gulp.dest('./build/js/lib'));
});

gulp.task('copyTest', function() {
  return gulp.src('./public/test/**/*')
  .pipe(gulp.dest('./build/test'));
});


gulp.task('copyStylesheetsFonts', function() {
  return gulp.src('./public/stylesheets/fonts/**/*')
  .pipe(gulp.dest('./build/stylesheets/fonts'));
});


gulp.task('copyStylesheetsFontAwesome', function() {
  return gulp.src('./public/stylesheets/font-awesome/**/*')
  .pipe(gulp.dest('./build/stylesheets/font-awesome'));
});


gulp.task('copyStylesheets:style.styl', function() {
  return gulp.src('./public/stylesheets/style.styl')
  .pipe(gulp.dest('./build/stylesheets'));
});


gulp.task('copyStylesheetsLib', function() {
  return gulp.src('./public/stylesheets/lib/**/*')
  .pipe(gulp.dest('./build/stylesheets/lib'));
});


gulp.task('copy', function(){
  gulp.start(['copyAssets', 'copyJsLib', 'copyTest', 'copyStylesheetsFonts', 'copyStylesheetsFontAwesome',
    'copyStylesheetsLib', 'copyStylesheets:style.styl']);  
});


/**
 * BUILD FOR START COMMAND
 * Run gulp run  command to start
 */
gulp.task('build', function(){
  devMode = true;
  gulp.start([ 'copy', 'css', 'services','configJson', 'directives', 'models', 'controllers', 'templates', 'pagesHtml', 'pagesJs', 'onlineHelpHtml', 'tabsHtml']);
 });