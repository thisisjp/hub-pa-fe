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
        description: 'Comune di Controguerra (82001760675 - BD1GH)',
        id: '1'
      },
      {
        description: 'Comune di Pisa (82001760676 - BD2GH)',
        id: '2'
      },
      {
        description: 'Comune di Firenze (82001760677 - BD3GH)',
        id: '3'
      }
    ];

    const selectOptionList = new SelectOptionList();
    for (const elem of response.creditorList) {
      const selectedOption = new SelectOption(elem.description, elem.id);
      // eslint-disable-next-line functional/immutable-data
      selectOptionList.options.push(selectedOption);
    }
    return selectOptionList;
  }
}
