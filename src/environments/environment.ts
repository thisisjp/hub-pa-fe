// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'SVILUPPO',
  API_URL: 'http://localhost:4200',
  cvsMaxRows: 500,
  positionsItemsPerPage: 3,
  PREFIX_URL_ENTE: '/dev',
  PREFIX_URL_SERVICE_MANAGEMENT: '/dev',
  PREFIX_URL_UPLOAD_PAYMENTS: '/dev',
  PREFIX_URL_PAYMENTS: '/dev',
  PREFIX_URL_SUPPORT: '/dev',
  PREFIX_URL_IDP: '/dev',
  PREFIX_URL_AUTH: '/dev'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
