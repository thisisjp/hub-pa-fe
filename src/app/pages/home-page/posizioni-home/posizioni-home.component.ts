import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentMinimalModel } from 'src/app/models/payments/payment-minimal-model';
import { PositionStatusEnum } from '../../../models/enums/position-status.enum';
import { PaymentsService } from '../../../services/payments.service';
import { FindRequestModel } from '../../../models/payments/find-request-model';
import { FilterModel } from '../../../models/payments/filter-model';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../../services/token.service';
import { PaymentPositionDetailModel } from '../../../models/payments/payment-position-detail-model';
import { PositionOptionStatusEnum } from '../../../models/enums/position-option-status.enum';

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
  optionStatusEnum = PositionOptionStatusEnum;

  payments: Array<PaymentMinimalModel> = [];
  modalDetail = new PaymentPositionDetailModel();

  filterModel = new FilterModel();

  rowstart = 0;
  rowend = 0;

  // risultato dalla response
  totalItems = 0;

  // selezionata
  currentPage = 0;

  // fixato
  itemsPerPage = environment.positionsItemsPerPage;

  // risultato dalla response
  totalPages = 0;

  page1 = 0;
  page2 = 0;
  page3 = 0;
  page4 = 0;
  page5 = 0;

  minDate = environment.minDate;
  maxDate = environment.maxDate;

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
    if (this.totalPages === 0) {
      return;
    }
    if (this.currentPage !== 0) {
      // eslint-disable-next-line functional/immutable-data
      this.currentPage = this.currentPage - 1;
      this.getListPositionBE();
    }
  }

  passright(): void {
    if (this.totalPages === 0) {
      return;
    }
    if (this.currentPage + 1 < this.totalPages) {
      // eslint-disable-next-line functional/immutable-data
      this.currentPage = this.currentPage + 1;
      this.getListPositionBE();
    }
  }

  datecheckswitch(isCloseButton: boolean): void {
    if (!isCloseButton) {
      this.btnmodal2.nativeElement.click();
    } else {
      this.resetdata();
      this.getListPositionBE();
    }
  }

  statuscheckswitch(isCloseButton: boolean): void {
    if (!isCloseButton) {
      this.btnmodal1.nativeElement.click();
    } else {
      this.resetstato();
      this.getListPositionBE();
    }
  }

  resetdata(): void {
    // eslint-disable-next-line functional/immutable-data
    this.filterModel.dateFrom = undefined;
    // eslint-disable-next-line functional/immutable-data
    this.filterModel.dateTo = undefined;
  }

  resetstato(): void {
    // eslint-disable-next-line functional/immutable-data
    this.filterModel.status = undefined;
  }

  resetAllFilters(): void {
    this.resetdata();
    this.resetstato();
    // eslint-disable-next-line functional/immutable-data
    this.filterModel.textSearch = undefined;
    this.getListPositionBE();
  }

  closedata(): void {
    this.getListPositionBE();
  }

  closestato(): void {
    this.getListPositionBE();
  }

  openDetail(e: number | undefined): void {
    if (e) {
      // chiamata al servizio che prende il dettaglio e chiama il metodo in basso
      this.paymentsService.info(e).subscribe(res => {
        if (res) {
          // eslint-disable-next-line functional/immutable-data
          this.modalDetail = res;
          this.btnmodal3.nativeElement.click();
        }
      });
    }
  }

  calcpagination(): void {
    // eslint-disable-next-line functional/immutable-data
    this.rowstart = this.totalPages === 0 ? 0 : this.currentPage * this.itemsPerPage + 1;
    // eslint-disable-next-line functional/immutable-data
    this.rowend = this.currentPage * this.itemsPerPage + this.payments.length;

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
    const findRequestModel = new FindRequestModel(
      this.filterModel,
      this.tokenService.getFiscalCode(),
      this.itemsPerPage,
      this.currentPage
    );
    this.paymentsService.find(findRequestModel).subscribe(res => {
      if (res) {
        // eslint-disable-next-line functional/immutable-data
        this.payments = res.payments;
        // eslint-disable-next-line functional/immutable-data
        this.totalPages = res.totalPages;
        // eslint-disable-next-line functional/immutable-data
        this.totalItems = res.totalItems;
        this.calcpagination();
      }
    });
  }

  getBadgeClass(status?: number): string {
    switch (status) {
      case this.statusEnum.BOZZA:
      case this.statusEnum.PUBBLICATO:
      case this.statusEnum.PAGATO:
      case this.statusEnum.PAGATO_PARZIALE:
        return 'badge-secondary';
      default:
        return '';
    }
  }

  getBadgeText(status?: number): string {
    switch (status) {
      case this.statusEnum.BOZZA:
        return 'Bozza';
      case this.statusEnum.PUBBLICATO:
        return 'Pubblicato';
      case this.statusEnum.PAGATO:
        return 'Pagato';
      case this.statusEnum.PAGATO_PARZIALE:
        return 'Pagato parziale';
      default:
        return '';
    }
  }

  getBadgeClassOption(status?: number): string {
    switch (status) {
      case this.optionStatusEnum.PAGATO:
      case this.optionStatusEnum.NON_PAGATO:
        return 'badge-secondary';
      default:
        return '';
    }
  }

  getBadgeTextOption(status?: number): string {
    switch (status) {
      case this.optionStatusEnum.PAGATO:
        return 'Pagato';
      case this.optionStatusEnum.NON_PAGATO:
        return 'Non pagato';
      default:
        return '';
    }
  }

  getFormattedDate(inputDate: string | undefined): string {
    if (!inputDate) {
      return '';
    }
    const inputParts = inputDate.split('-');
    return inputParts[2] + '/' + inputParts[1] + '/' + inputParts[0];
  }

  getChipDates(): string {
    if (this.filterModel.dateFrom && this.filterModel.dateTo) {
      return (
        'Dal ' +
        this.getFormattedDate(String(this.filterModel.dateFrom)) +
        ' al ' +
        this.getFormattedDate(String(this.filterModel.dateTo))
      );
    }
    if (this.filterModel.dateFrom) {
      return 'Dal ' + this.getFormattedDate(String(this.filterModel.dateFrom));
    }
    if (this.filterModel.dateTo) {
      return 'Al ' + this.getFormattedDate(String(this.filterModel.dateTo));
    }
    return '';
  }

  onBlurTextSearch(): void {
    this.getListPositionBE();
  }

  getFormattedCurrency(amount: number | undefined): string {
    if (!amount) {
      return '';
    }
    const inputParts = String(amount).split('.');
    if (!inputParts[1]) {
      return inputParts[0] + ',' + '00';
    } else if (inputParts[1].length === 1) {
      return inputParts[0] + ',' + inputParts[1] + '0';
    } else {
      return inputParts[0] + ',' + inputParts[1];
    }
  }

  getFormattedNotificationCode(notificationCode: string | undefined): string {
    if (!notificationCode) {
      return '';
    }
    const parts = notificationCode.match(/.{1,4}/g);
    if (parts) {
      return parts.join(' ');
    } else {
      return '';
    }
  }

  getMaxStartDate(): string {
    return this.filterModel.dateTo ? String(this.filterModel.dateTo) : this.maxDate;
  }

  getMinEndDate(): string {
    return this.filterModel.dateFrom ? String(this.filterModel.dateFrom) : this.minDate;
  }
}
