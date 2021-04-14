import { Component, OnInit } from '@angular/core';
import { Tribute } from '../../../models/tribute';
import { CreditorEntry } from '../../../models/creditor-entry';
import { CreditorList } from '../../../models/creditor-list';
import { TributeService } from '../../../services/tribute.service';

@Component({
  selector: 'app-tributi-step4-view',
  templateUrl: './tributi-step4-view.component.html',
  styleUrls: ['./tributi-step4-view.component.sass']
})
export class TributiStep4ViewComponent implements OnInit {
  compiledForm = new Tribute('', '', '', '', 0, '', '', [], true, true, '', [], '');
  primaryCreditor = new CreditorEntry();
  secondaryCreditor = new CreditorEntry();
  private creditorList = new CreditorList();

  constructor(private tributeService: TributeService) {}

  ngOnInit(): void {
    // eslint-disable-next-line functional/immutable-data
    this.creditorList = this.tributeService.getCreditors();
    // eslint-disable-next-line functional/immutable-data
    this.compiledForm = this.tributeService.getService('');

    // eslint-disable-next-line functional/immutable-data
    this.primaryCreditor = this.creditorList?.creditorList?.filter(
      elem => elem.id === this.compiledForm.idPrimaryCreditor
    )[0];
    // eslint-disable-next-line functional/immutable-data
    this.secondaryCreditor = this.creditorList?.creditorList?.filter(
      elem => elem.id === this.compiledForm.idSecondaryCreditor
    )[0];
  }

  getFormattedDate(inputDate: string): string {
    const inputParts = inputDate.split('-');
    return inputParts[2] + '/' + inputParts[1] + '/' + inputParts[0];
  }
}
