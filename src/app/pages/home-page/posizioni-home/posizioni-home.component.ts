import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentMinimalModel } from 'src/app/models/payments/payment-minimal-model';
import { TranslateService } from '@ngx-translate/core';
import { PositionStatusEnum } from '../../../models/enums/position-status.enum';
import { PaymentsService } from '../../../services/payments.service';
import { FindRequestModel } from '../../../models/payments/find-request-model';
import { FilterModel } from '../../../models/payments/filter-model';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../../services/token.service';
import { PaymentPositionDetailModel } from '../../../models/payments/payment-position-detail-model';
import { PositionOptionStatusEnum } from '../../../models/enums/position-option-status.enum';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-posizioni-home',
  templateUrl: './posizioni-home.component.html',
  styleUrls: ['./posizioni-home.component.sass']
})
export class PosizioniHomeComponent implements OnInit {
  @ViewChild('btncontent1') btnmodal1: any;
  @ViewChild('btncontent2') btnmodal2: any;
  @ViewChild('btncontent3') btnmodal3: any;
  @ViewChild('btnContentPublish') btnModalPublish: any;
  @ViewChild('btnContentExport') btnModalExport: any;
  @ViewChild('btnContentError') btnModalError: any;
  @ViewChild('btnContentPublishWarning') btnModalPublishWarning: any;

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
  publishDate = '';
  today = new Date();
  exportNumber = 0;
  modalErrorTitle = '';
  modalErrorBody = '';
  ids: Array<number> = [];
  numberDuplicates = 0;
  isMailing = false; // true multiple, false single

  constructor(
    private paymentsService: PaymentsService,
    private tokenService: TokenService,
    private translateService: TranslateService,
    private notificationService: NotificationService
  ) {}

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
          // eslint-disable-next-line functional/immutable-data
          this.modalDetail.id = e;
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
      case this.statusEnum.RENDICONTATO_PARZIALE:
      case this.statusEnum.RENDICONTATO:
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
      case this.statusEnum.RENDICONTATO_PARZIALE:
        return 'Rendicontato parziale';
      case this.statusEnum.RENDICONTATO:
        return 'Rendicontato';
      default:
        return '';
    }
  }

  getBadgeClassOption(status?: number): string {
    switch (status) {
      case this.optionStatusEnum.PAGATO:
      case this.optionStatusEnum.NON_PAGATO:
      case this.optionStatusEnum.RENDICONTATO:
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
      case this.optionStatusEnum.RENDICONTATO:
        return 'Rendicontato';
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

  exportSingleModal(id: number | undefined): void {
    if (id !== undefined) {
      // eslint-disable-next-line functional/immutable-data
      this.ids = [id];
      // eslint-disable-next-line functional/immutable-data
      this.isMailing = false;
      // eslint-disable-next-line functional/immutable-data
      this.exportNumber = 1;
      this.btnModalExport.nativeElement.click();
    }
  }

  exportMultipleModal(): void {
    const filtered = this.payments.filter(x => x.checked);
    const filteredByStatus = filtered.filter(x => x.status !== this.statusEnum.BOZZA && x.id !== undefined);
    // eslint-disable-next-line functional/immutable-data
    this.exportNumber = filtered.length;
    this.buildIds(filteredByStatus);
    if (filteredByStatus.length < filtered.length || filtered.length === 0) {
      // eslint-disable-next-line functional/immutable-data
      this.modalErrorTitle = String(this.translateService.instant('ERROR_ESPORTA_TITLE'));
      // eslint-disable-next-line functional/immutable-data
      this.modalErrorBody = String(this.translateService.instant('ERROR_ESPORTA_BODY'));
      this.btnModalError.nativeElement.click();
    } else {
      // eslint-disable-next-line functional/immutable-data
      this.isMailing = true;
      this.btnModalExport.nativeElement.click();
    }
  }

  publishSingleModal(id: number | undefined): void {
    if (id !== undefined) {
      // eslint-disable-next-line functional/immutable-data
      this.ids = [id];
      this.btnModalPublish.nativeElement.click();
    }
  }

  publishMultipleModal(): void {
    const filtered = this.payments.filter(x => x.checked);
    const filteredByStatus = filtered.filter(x => x.status === this.statusEnum.BOZZA && x.id !== undefined);
    this.buildIds(filteredByStatus);
    this.countDuplicates(filteredByStatus);
    if (filteredByStatus.length < filtered.length || filtered.length === 0) {
      // eslint-disable-next-line functional/immutable-data
      this.modalErrorTitle = String(this.translateService.instant('ERROR_PUBBLICA_TITLE'));
      // eslint-disable-next-line functional/immutable-data
      this.modalErrorBody = String(this.translateService.instant('ERROR_PUBBLICA_BODY'));
      this.btnModalError.nativeElement.click();
    } else if (this.numberDuplicates > 0) {
      this.btnModalPublishWarning.nativeElement.click();
    } else {
      this.continuePublish();
    }
  }

  continuePublish(): void {
    this.btnModalPublish.nativeElement.click();
  }

  buildIds(filteredByStatus: Array<PaymentMinimalModel>): void {
    // eslint-disable-next-line functional/immutable-data
    this.ids = [];
    for (const elem of filteredByStatus) {
      if (elem.id !== undefined) {
        // eslint-disable-next-line functional/immutable-data
        this.ids.push(elem.id);
      }
    }
  }

  countDuplicates(filteredByStatus: Array<PaymentMinimalModel>): void {
    // eslint-disable-next-line functional/immutable-data
    this.numberDuplicates = 0;
    for (const elem of filteredByStatus) {
      if (elem.isDuplicated) {
        // eslint-disable-next-line functional/immutable-data
        ++this.numberDuplicates;
      }
    }
  }

  isSingleExportEnabled(elem: PaymentMinimalModel): boolean {
    return elem.status !== this.statusEnum.BOZZA && elem.id !== undefined;
  }

  getCheckedLength(): number {
    return this.payments.filter(x => x.checked).length;
  }

  selectAll(mode: boolean): void {
    for (const payment of this.payments) {
      // eslint-disable-next-line functional/immutable-data
      payment.checked = mode;
    }
  }

  exportService(): void {
    this.paymentsService.exportPayments(this.ids, this.isMailing).subscribe(res => {
      this.downloadFile(res);
      this.getListPositionBE();
      this.notificationService.showNotification({
        title: 'Esportazione completata',
        message: '',
        isError: false
      });
    });
  }

  publishService(): void {
    this.paymentsService.publishPayments(this.ids, this.publishDate).subscribe(res => {
      this.getListPositionBE();
      if (res && res.result) {
        this.notificationService.showNotification({
          title: 'Pubblicazione completata',
          message: 'Il cittadino potrà pagare a partire dalla data che hai selezionato.',
          isError: false
        });
      } else {
        this.notificationService.showNotification({
          title: 'Attenzione',
          message: 'Si è verificato un errore',
          isError: true
        });
      }
    });
  }

  deleteService(id: number): void {
    this.paymentsService.deletePayment(id).subscribe(res => {
      this.getListPositionBE();
      if (res && res.result) {
        this.notificationService.showNotification({
          title: 'Eliminazione completata',
          message: '',
          isError: false
        });
      } else {
        this.notificationService.showNotification({
          title: 'Attenzione',
          message: 'Si è verificato un errore',
          isError: true
        });
      }
    });
  }

  downloadFile(res: any): void {
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(res.body));
    const contentDispositionNullable: string | null = res.headers.get('Content-Disposition');
    const contentDisposition: string = contentDispositionNullable ? contentDispositionNullable : '';
    link.setAttribute(
      'download',
      contentDisposition.replace('attachment; filename=', '').replace('"', '').replace('"', '')
    );
    // eslint-disable-next-line functional/immutable-data
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    const dataURL = URL.createObjectURL(res.body);
    if (navigator && navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(res.body);
      return;
    }
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      URL.revokeObjectURL(dataURL);
    }, 100);
  }

  receipt(modalDetail: PaymentPositionDetailModel): void {
    if (modalDetail.status) {
      this.paymentsService.receipt(modalDetail.id);
    }
  }

  isReceiptEnabled(status: number | undefined): boolean {
    return !!status && this.statusEnum.BOZZA !== status && this.statusEnum.PUBBLICATO !== status;
  }
}
