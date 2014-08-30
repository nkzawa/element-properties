module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'bower_components/expect/index.js',
      'lib/index.js',
      'test/*.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false
  });
};
