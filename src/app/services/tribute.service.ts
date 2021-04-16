import { Injectable } from '@angular/core';
import { IbanList } from '../models/iban-list';
import { SelectOptionList } from '../models/select-option-list';
import { SelectOption } from '../models/select-option';
import { CreditorList } from '../models/creditor-list';
import { ServiceConfiguratedResponse } from '../models/service-configurated-response';
import { Tribute } from '../models/tribute';

@Injectable({
  providedIn: 'root'
})
export class TributeService {
  isServiceConfigurated(idCreditor: string): boolean {
    const response = new ServiceConfiguratedResponse();
    // eslint-disable-next-line functional/immutable-data
    response.result = false;
    return response.result;
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  saveService(request: Tribute): boolean {
    const response = new ServiceConfiguratedResponse();
    // eslint-disable-next-line functional/immutable-data
    response.result = true;
    return response.result;
  }

  getService(idCreditor: string): Tribute {
    return {
      idPrimaryCreditor: '1',
      idSecondaryCreditor: '2',
      ibanPrimary: '123456789012345678901234567',
      ibanSecondary: '123456789012345678901234568',
      percentageSecondary: 22.01,
      fiscalCodePrimaryCreditor: '82001760675',
      fiscalCodeSecondaryCreditor: '82001760676',
      abilitaUnica: true,
      abilitaRate: true,
      dueDateUnique: '2021-08-14',
      installments: [
        { dueDate: '2021-09-14', percentagePrimary: 20, percentageSecondary: 50 },
        { dueDate: '2021-10-14', percentagePrimary: 30.5, percentageSecondary: 20 },
        { dueDate: '2021-11-14', percentagePrimary: 49.5, percentageSecondary: 30 }
      ],
      denomination: 'TariTefa2021',
      creditorList: [
        {
          id: '1',
          denominazioneEnte: 'Comune di Controguerra',
          codiceFiscale: '82001760675',
          codiceInterbancario: 'BD1GH'
        },
        { id: '2', denominazioneEnte: 'Comune di Pisa', codiceFiscale: '82001760676', codiceInterbancario: 'BD2GH' },
        { id: '3', denominazioneEnte: 'Comune di Firenze', codiceFiscale: '82001760677', codiceInterbancario: 'BD3GH' }
      ]
    };
  }

  getIbans(idCreditor: string): SelectOptionList {
    const response = new IbanList();
    // eslint-disable-next-line functional/immutable-data
    response.ibanList = ['123456789012345678901234567', '123456789012345678901234568', '123456789012345678901234569'];

    const selectOptionList = new SelectOptionList();
    for (const elem of response.ibanList) {
      const selectedOption = new SelectOption(elem, elem);
      // eslint-disable-next-line functional/immutable-data
      selectOptionList.options.push(selectedOption);
    }
    return selectOptionList;
  }

  getCreditors(): CreditorList {
    const response = new CreditorList();
    // eslint-disable-next-line functional/immutable-data
    response.creditorList = [
      {
        id: '1',
        denominazioneEnte: 'Comune di Controguerra',
        codiceFiscale: '82001760675',
        codiceInterbancario: 'BD1GH'
      },
      {
        id: '2',
        denominazioneEnte: 'Comune di Pisa',
        codiceFiscale: '82001760676',
        codiceInterbancario: 'BD2GH'
      },
      {
        id: '3',
        denominazioneEnte: 'Comune di Firenze',
        codiceFiscale: '82001760677',
        codiceInterbancario: 'BD3GH'
      }
    ];
    return response;
  }
}
