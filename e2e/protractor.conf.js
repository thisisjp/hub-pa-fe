// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
// eslint-disable-next-line functional/immutable-data,no-undef
exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print() {
      //
    }
  },
  onPrepare() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
    require('ts-node').register({
      // eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
      project: require('path').join(__dirname, './tsconfig.json')
    });
    // eslint-disable-next-line no-undef
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY
        }
      })
    );
  }
};
