import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentMinimalModel } from 'src/app/models/payment-minimal-model';
import { PositionStatusEnum } from '../../../models/enums/position-status.enum';
import { PaymentsService } from '../../../services/payments.service';
import { FindRequestModel } from '../../../models/find-request-model';
import { FilterModel } from '../../../models/filter-model';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-posizioni-home',
  templateUrl: './posizioni-home.component.html',
  styleUrls: ['./posizioni-home.component.sass']
})
export class PosizioniHomeComponent implements OnInit {
  @ViewChild('btncontent1') btnmodal1: any;
  @ViewChild('btncontent2') btnmodal2: any;
  @ViewChild('btncontent3') btnmodal3: any;

  statusEnum = PositionStatusEnum;

  payments: Array<PaymentMinimalModel> = [];

  startDate: Date | undefined;
  endDate: Date | undefined;
  stato: number | undefined;

  rowstart = 0;
  rowend = 0;

  // risultato dalla response
  totalItems = 5;

  // selezionata
  currentPage = 0;

  // fixato
  itemsPerPage = environment.positionsItemsPerPage;

  // risultato dalla response
  totalPages = 1;

  page1 = 0;
  page2 = 0;
  page3 = 0;
  page4 = 0;
  page5 = 0;

  datecheck = false;
  statuscheck = false;

  constructor(private paymentsService: PaymentsService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getListPositionBE();
  }

  pass(pagenumber: number): void {
    // eslint-disable-next-line functional/immutable-data
    this.currentPage = pagenumber - 1;
    this.getListPositionBE();
  }

  passleft(): void {
    if (this.currentPage !== 0) {
      // eslint-disable-next-line functional/immutable-data
      this.currentPage = this.currentPage - 1;
      this.getListPositionBE();
    }
  }

  passright(): void {
    if (this.currentPage + 1 < this.totalPages) {
      // eslint-disable-next-line functional/immutable-data
      this.currentPage = this.currentPage + 1;
      this.getListPositionBE();
    }
  }

  datecheckswitch(): void {
    // eslint-disable-next-line functional/immutable-data
    this.datecheck = !this.datecheck;
    if (this.datecheck) {
      this.btnmodal2.nativeElement.click();
    } else {
      this.resetdata();
      this.getListPositionBE();
    }
  }

  statuscheckswitch(): void {
    // eslint-disable-next-line functional/immutable-data
    this.statuscheck = !this.statuscheck;
    if (this.statuscheck) {
      this.btnmodal1.nativeElement.click();
    } else {
      this.resetstato();
      this.getListPositionBE();
    }
  }

  resetdata(): void {
    // eslint-disable-next-line functional/immutable-data
    this.startDate = undefined;
    // eslint-disable-next-line functional/immutable-data
    this.endDate = undefined;
  }

  resetstato(): void {
    // eslint-disable-next-line functional/immutable-data
    this.stato = undefined;
  }

  closedata(): void {
    this.getListPositionBE();
  }

  closestato(): void {
    this.getListPositionBE();
  }

  openDetail(e: any): void {
    // chiamata al servizio che prende il dettaglio e chiama il metodo in basso
    this.btnmodal3.nativeElement.click();
  }

  calcpagination(): void {
    // eslint-disable-next-line functional/immutable-data
    this.rowstart = this.currentPage * this.itemsPerPage + 1;
    // eslint-disable-next-line functional/immutable-data
    this.rowend = this.currentPage * this.itemsPerPage + this.itemsPerPage;

    if (this.currentPage === 0) {
      // eslint-disable-next-line functional/immutable-data
      this.page1 = 1;
    }

    if (this.currentPage + 1 > this.page5) {
      // eslint-disable-next-line functional/immutable-data
      this.page1 = this.page1 + 1;
    }
    if (this.currentPage + 1 < this.page1) {
      // eslint-disable-next-line functional/immutable-data
      this.page1 = this.page1 - 1;
    }

    // eslint-disable-next-line functional/immutable-data
    this.page2 = this.page1 + 1;
    // eslint-disable-next-line functional/immutable-data
    this.page3 = this.page1 + 2;
    // eslint-disable-next-line functional/immutable-data
    this.page4 = this.page1 + 3;
    // eslint-disable-next-line functional/immutable-data
    this.page5 = this.page1 + 4;
  }

  getListPositionBE(): void {
    // chiamata al servizio che mappa i campi e chiama il metodo in basso
    const filterModel = new FilterModel();
    const findRequestModel = new FindRequestModel(
      filterModel,
      this.tokenService.getFiscalCode(),
      this.itemsPerPage,
      this.currentPage
    );
    const findResponseModel = this.paymentsService.findMock(findRequestModel);
    // eslint-disable-next-line functional/immutable-data
    this.payments = findResponseModel.payments;
    // eslint-disable-next-line functional/immutable-data
    this.totalPages = findResponseModel.totalPages;
    // eslint-disable-next-line functional/immutable-data
    this.totalItems = findResponseModel.totalItems;
    this.calcpagination();
  }

  getBadgeClass(status?: number): string {
    switch (status) {
      case this.statusEnum.BOZZA:
        return 'badge-secondary';
      case this.statusEnum.PUBBLICATO:
        return 'badge-secondary';
      case this.statusEnum.PAGATO:
        return 'badge-secondary';
      default:
        return '';
    }
  }

  getBadgeText(status?: number): string {
    switch (status) {
      case this.statusEnum.BOZZA:
        return 'BOZZA';
      case this.statusEnum.PUBBLICATO:
        return 'PUBBLICATO';
      case this.statusEnum.PAGATO:
        return 'PAGATO';
      default:
        return '';
    }
  }
}
