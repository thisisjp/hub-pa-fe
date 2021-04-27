// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// eslint-disable-next-line functional/immutable-data,no-undef
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      // eslint-disable-next-line no-undef
      require('karma-jasmine'),
      // eslint-disable-next-line no-undef
      require('karma-chrome-launcher'),
      // eslint-disable-next-line no-undef
      require('karma-jasmine-html-reporter'),
      // eslint-disable-next-line no-undef
      require('karma-coverage'),
      // eslint-disable-next-line no-undef
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
        random: false
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
      dir: require('path').join(__dirname, './coverage/hub-pa-fe'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
