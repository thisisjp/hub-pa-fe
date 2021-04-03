import { Injectable } from '@angular/core';
import { IbanList } from '../models/iban-list';
import { SelectOptionList } from '../models/select-option-list';
import { SelectOption } from '../models/select-option';
import { CreditorList } from '../models/creditor-list';

@Injectable({
  providedIn: 'root'
})
export class TributeService {
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

  getCreditors(): SelectOptionList {
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

    const selectOptionList = new SelectOptionList();
    for (const elem of response.creditorList) {
      const text = elem.denominazioneEnte + ' (' + elem.codiceFiscale + ' - ' + elem.codiceInterbancario + ')';
      const selectedOption = new SelectOption(text, elem.id);
      // eslint-disable-next-line functional/immutable-data
      selectOptionList.options.push(selectedOption);
    }
    return selectOptionList;
  }
}
