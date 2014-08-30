module.exports = function(config) {
  'use strict';

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '37'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '31'
    },
    sl_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.9',
      version: '7'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '10'
    },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_8: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '8'
    },
    sl_ios_safari_7: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    sl_ios_safari_6: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.8',
      version: '6.1'
    },
    sl_android_4_4: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '4.4'
    },
    sl_android_4_3: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '4.3'
    }
  };

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
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
