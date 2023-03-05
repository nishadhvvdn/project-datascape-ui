module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'public/js/lib/jquery.min.js',
      'public/js/lib/angular.min.js',
      'public/js/lib/angular-mocks.js',
      'public/js/lib/angular-ui-router.min.js',
      'public/js/lib/angularjs-datetime-picker.js',
      'public/js/lib/angular-animate.min.js',
      'public/js/lib/ui-bootstrap-tpls.min.js',
      'public/js/lib/ui-grid.min.js',
      'public/js/lib/angular-touch.min.js',
      'public/js/lib/pdfmake.js',
      'public/js/lib/csv.js',
      'public/js/lib/vfs_fonts.js',
      'public/js/lib/angular-messages.min.js',
      'public/js/lib/angular-sanitize.min.js',
      'public/js/lib/bootstrap-treeview.min.js',
      'public/js/lib/angular-ui-switch.min.js',
      'public/js/lib/ng-file-upload.min.js',
      'public/js/lib/ng-file-upload-shim.min.js',
      'public/js/lib/moment.js',
      'public/js/lib/datetimepicker.js',
      'public/js/lib/datetimepicker.templates.js',
      'public/js/lib/sweetalert.min.js',
      'public/js/lib/bootstrap.min.js',
      'public/js/lib/csvparser.js',
      'public/js/lib/angular-breadcrumb.min.js',
      'public/js/controllers/dataSCAPEController.js',
      'public/js/services/*.js',
      'public/js/controllers/*.js',
      'public/pages/*.html',
      'public/test/homePageCtrlSpec.js',
      'public/test/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,
    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // Code coverage report
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'public/js/controllers/*.js': ['coverage'],
      'public/js/services/*.js': ['coverage'],
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher',
      // 'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor'
      // required for coverage
    ],
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
  });
};