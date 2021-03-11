# HubPaFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## How To Contribute

### Branching workflow

- Each branch must be tied to a JIRA task/user story and must be named PTT-yy-meaningful-branch-name, where PTT-yy is the ID of the branch/user story in JIRA
- Each commit must have a meaningful commit message in the form "[PTT-yy] descriptive message"

### Quality Assessment

Opening a PR triggers a code review pipeline which automatically executes static checks on code and all test suites, so before committing please check that

- the code lints correctly with `yarn lint`
- the tests are passed with `yarn test:pipe`

If the coverage is reduced the test will fail.

### Code style

- try to follow a functional / declarative programming style
- prefer immutability

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
