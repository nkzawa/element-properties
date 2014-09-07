module.exports = function(config) {
  'use strict';

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  if (!process.env.BROWSER_NAME || !process.env.BROWSER_VERSION) {
    console.log('Make sure the BROWSER_NAME and BROWSER_VERSION environment variables are set.');
    process.exit(1);
  }

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
    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    sauceLabs: {
      testName: 'element-properties unit tests'
    },
    captureTimeout: 0, // rely on SauceLabs timeout
    customLaunchers: {
      saucelabs: {
        base: 'SauceLabs',
        browserName: process.env.BROWSER_NAME,
        version: process.env.BROWSER_VERSION
      }
    },
    browsers: ['saucelabs'],
    singleRun: true
  });
};
