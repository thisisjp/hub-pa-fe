export const environment = {
  production: true,
  environmentName: 'COLLAUDO',
  API_URL: 'https://api.hubpad.pagopa.it',
  cvsMaxRows: 200,
  positionsItemsPerPage: 50,
  enableConfigureServiceDate: true,
  minDate: '2000-01-01',
  maxDate: '2099-12-31',
  configureServiceDate: '30/06/2021',
  isPostalIbanEnabled: false,
  denominationDefault: 'TARI/TEFA 2021',
  spidServeAiuto: 'https://www.spid.gov.it/serve-aiuto',
  supportMail: 'supporto.taritefa@eng.it',
  isPublishPaymentsEnabled: true,
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
  PREFIX_URL_ENTE: '/creditor/v1',
  PREFIX_URL_SERVICE_MANAGEMENT: '/service/v1',
  PREFIX_URL_UPLOAD_PAYMENTS: '/job/v1',
  PREFIX_URL_PAYMENTS: '/payments/v1',
  PREFIX_URL_SUPPORT: '/support/v1',
  PREFIX_URL_AUTH: '/auth/v1'
};
