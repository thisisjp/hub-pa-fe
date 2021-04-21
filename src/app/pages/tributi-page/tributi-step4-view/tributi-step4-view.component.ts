import { Component, OnInit } from '@angular/core';
import { Tribute } from '../../../models/tribute';
import { CreditorEntry } from '../../../models/creditor-entry';
import { TokenService } from '../../../services/token.service';
import { ServiceManagementService } from '../../../services/service-management.service';
import { EnteService } from '../../../services/ente.service';

@Component({
  selector: 'app-tributi-step4-view',
  templateUrl: './tributi-step4-view.component.html',
  styleUrls: ['./tributi-step4-view.component.sass']
})
export class TributiStep4ViewComponent implements OnInit {
  compiledForm = new Tribute('', '', 0, '', '', [], true, true, '', [], '');
  primaryCreditor = new CreditorEntry();
  secondaryCreditor = new CreditorEntry();
  private creditorList = Array<CreditorEntry>();

  constructor(
    private serviceManagementService: ServiceManagementService,
    private enteService: EnteService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.serviceManagementService.getService(this.tokenService.getFiscalCode()).subscribe(res => {
      if (res) {
        // eslint-disable-next-line functional/immutable-data
        this.compiledForm = res;
        this.enteService.getAllEcForTefa().subscribe(res2 => {
          // eslint-disable-next-line functional/immutable-data
          this.creditorList = res2;
          // eslint-disable-next-line functional/immutable-data
          this.primaryCreditor = this.creditorList?.filter(
            elem => elem.codiceFiscale === this.compiledForm.fiscalCodePrimaryCreditor
          )[0];
          // eslint-disable-next-line functional/immutable-data
          this.secondaryCreditor = this.creditorList?.filter(
            elem => elem.codiceFiscale === this.compiledForm.fiscalCodeSecondaryCreditor
          )[0];
        });
      }
    });
  }

  getFormattedDate(inputDate: string): string {
    const inputParts = inputDate.split('-');
    return inputParts[2] + '/' + inputParts[1] + '/' + inputParts[0];
  }
}
