import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { PaymentJobStatus } from '../../../models/payment-job-status.enum';
import { UploadPaymentsService } from '../../../services/upload-payments.service';
import { TokenService } from '../../../services/token.service';
import { PaymentJob } from '../../../models/payment-job';

declare const $: any;

@Component({
  selector: 'app-avvisi-step2',
  templateUrl: './avvisi-step2-stato-caricamenti.component.html',
  styleUrls: ['./avvisi-step2-stato-caricamenti.component.sass']
})
export class AvvisiStep2StatoCaricamentiComponent implements OnInit, OnDestroy {
  menuEnum = Menu;
  paymentJobList: Array<PaymentJob> = [];
  paymentJobListPending: Array<number> = [];
  statusEnum = PaymentJobStatus;
  private AVVISI_STATO_CARICAMENTI_INTERVAL = 5;
  private AVVISI_STATO_CARICAMENTI_MAX_RETRY = 3;
  private interval = 0;

  constructor(
    private router: Router,
    private uploadPaymentsService: UploadPaymentsService,
    private tokenService: TokenService
  ) {}

  goToPage(path: string): void {
    this.router.navigate([path]).catch(reason => reason);
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  init(): void {
    this.uploadPaymentsService.getAll(this.tokenService.getFiscalCode()).subscribe(res => {
      if (res && res.length > 0) {
        // eslint-disable-next-line functional/immutable-data
        this.paymentJobList = res;
        this.checkJobListPending();
      }
    });
  }

  private checkJobListPending(): void {
    // eslint-disable-next-line functional/immutable-data
    this.paymentJobListPending = [];
    for (const elem of this.paymentJobList) {
      if (elem.status === this.statusEnum.IN_CORSO && elem.jobId) {
        // eslint-disable-next-line functional/immutable-data
        this.paymentJobListPending.push(elem.jobId);
      }
    }
    if (this.paymentJobListPending.length > 0) {
      // eslint-disable-next-line functional/no-let
      let retries = 0;
      // eslint-disable-next-line functional/immutable-data
      this.interval = window.setInterval(() => {
        ++retries;
        if (retries > this.AVVISI_STATO_CARICAMENTI_MAX_RETRY) {
          clearInterval(this.interval);
          $('#modalCenter').modal();
        } else {
          this.uploadPaymentsService.statusChanged(this.paymentJobListPending).subscribe(res2 => {
            if (res2 && res2.result) {
              clearInterval(this.interval);
              this.init();
            }
          });
        }
      }, this.AVVISI_STATO_CARICAMENTI_INTERVAL * 1000);
    }
  }

  getBadgeClass(status?: number): string {
    switch (status) {
      case this.statusEnum.IN_CORSO:
        return 'badge-secondary';
      case this.statusEnum.OK:
        return 'app-hidden';
      case this.statusEnum.PARZIALE:
        return 'badge-warning';
      case this.statusEnum.FALLITO:
        return 'badge-danger';
      default:
        return '';
    }
  }

  getBadgeText(status?: number): string {
    switch (status) {
      case this.statusEnum.IN_CORSO:
        return 'In corso';
      case this.statusEnum.OK:
        return '';
      case this.statusEnum.PARZIALE:
        return 'Parziale';
      case this.statusEnum.FALLITO:
        return 'Fallito';
      default:
        return '';
    }
  }

  getSvgClass(status?: number): string {
    switch (status) {
      case this.statusEnum.IN_CORSO:
        return 'icon-secondary';
      case this.statusEnum.OK:
        return 'icon-success';
      case this.statusEnum.PARZIALE:
        return 'icon-warning';
      case this.statusEnum.FALLITO:
        return 'icon-danger';
      default:
        return '';
    }
  }

  openDettagli(jobId?: number): void {
    if (jobId) {
      this.uploadPaymentsService.downloadFile(jobId);
    }
  }

  hasElem(nrecordFound?: number): boolean {
    return !!nrecordFound && nrecordFound > 0;
  }

  getFormattedDate(insertDate?: string): string {
    return insertDate ? new Date(insertDate).toLocaleString() : '';
  }
}
