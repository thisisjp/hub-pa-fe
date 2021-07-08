// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'SVILUPPO',
  API_URL: 'http://localhost:4200',
  cvsMaxRows: 500,
  positionsItemsPerPage: 3,
  enableConfigureServiceDate: true,
  minDate: '2000-01-01',
  maxDate: '2099-12-31',
  configureServiceDate: '30/06/2021',
  isPostalIbanEnabled: false,
  denominationDefault: 'TARI/TEFA 2021',
  spidServeAiuto: 'https://www.spid.gov.it/serve-aiuto',
  supportMail: 'supporto.taritefa@eng.it',
  isPublishPaymentsEnabled: false,
  IDPS: {
    identityProviders: [
      {
        entityId: 'xx_testenv2',
        name: 'test',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Test-Logo.svg'
      },
      {
        entityId: 'lepidaid',
        name: 'Lepida ID',
        imageUrl: '/assets/img/spid/spid-idp-lepidaid.svg'
      },
      {
        entityId: 'infocertid',
        name: 'Infocert ID',
        imageUrl: '/assets/img/spid/spid-idp-infocertid.svg'
      },
      {
        entityId: 'sielteid',
        name: 'Sielte id',
        imageUrl: '/assets/img/spid/spid-idp-sielteid.svg'
      },
      {
        entityId: 'namirialid',
        name: 'Namirial ID',
        imageUrl: '/assets/img/spid/spid-idp-namirialid.svg'
      },
      {
        entityId: 'timid',
        name: 'TIM id',
        imageUrl: '/assets/img/spid/spid-idp-timid.svg'
      },
      {
        entityId: 'arubaid',
        name: 'Aruba.it ID',
        imageUrl: '/assets/img/spid/spid-idp-arubaid.svg'
      },
      {
        entityId: 'posteid',
        name: 'Poste ID',
        imageUrl: '/assets/img/spid/spid-idp-posteid.svg'
      },
      {
        entityId: 'intesaid',
        name: 'Intesa ID',
        imageUrl: '/assets/img/spid/spid-idp-intesaid.svg'
      },
      {
        entityId: 'spiditalia',
        name: 'SpidItalia',
        imageUrl: '/assets/img/spid/spid-idp-spiditalia.svg'
      }
    ],
    extraInfo: [
      { title: 'Maggiori informazioni', url: 'https://www.spid.gov.it/' },
      { title: 'Non hai SPID?', url: 'https://www.spid.gov.it/richiedi-spid' },
      { title: 'Serve aiuto?', url: 'https://www.spid.gov.it/serve-aiuto' }
    ]
  },
  PREFIX_URL_ENTE: '/dev',
  PREFIX_URL_SERVICE_MANAGEMENT: '/dev',
  PREFIX_URL_UPLOAD_PAYMENTS: '/dev',
  PREFIX_URL_PAYMENTS: '/dev',
  PREFIX_URL_SUPPORT: '/dev',
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
