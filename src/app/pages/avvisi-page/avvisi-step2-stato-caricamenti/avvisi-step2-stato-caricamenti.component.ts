import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/menu.enum';
import { AvvisiStep } from '../../../models/avvisi-step';
import { PaymentJobList } from '../../../models/payment-job-list';
import { PaymentJobService } from '../../../services/payment-job.service';
import { PaymentJobStatus } from '../../../models/payment-job-status.enum';

declare const $: any;

@Component({
  selector: 'app-avvisi-step2',
  templateUrl: './avvisi-step2-stato-caricamenti.component.html',
  styleUrls: ['./avvisi-step2-stato-caricamenti.component.sass']
})
export class AvvisiStep2StatoCaricamentiComponent implements OnInit, OnDestroy {
  menuEnum = Menu;
  avvisiEnum = AvvisiStep;
  paymentJobList = new PaymentJobList();
  paymentJobListPending = new PaymentJobList();
  statusEnum = PaymentJobStatus;
  private AVVISI_STATO_CARICAMENTI_INTERVAL = 5;
  private AVVISI_STATO_CARICAMENTI_MAX_RETRY = 3;
  private interval = 0;

  constructor(private router: Router, private paymentJobService: PaymentJobService) {}

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
    // eslint-disable-next-line functional/immutable-data
    this.paymentJobList = this.paymentJobService.getJobList('');
    // eslint-disable-next-line functional/immutable-data
    this.paymentJobListPending.list = this.paymentJobList.list.filter(elem => elem.status === this.statusEnum.IN_CORSO);
    if (this.paymentJobListPending.list.length > 0) {
      // eslint-disable-next-line functional/no-let
      let retries = 0;
      // eslint-disable-next-line functional/immutable-data
      this.interval = setInterval(() => {
        ++retries;
        if (retries > this.AVVISI_STATO_CARICAMENTI_MAX_RETRY) {
          clearInterval(this.interval);
          $('#modalCenter').modal();
        } else {
          // console.log('getStatus', retries);
          if (this.paymentJobService.getStatus(this.paymentJobListPending)) {
            clearInterval(this.interval);
            this.init();
          }
        }
      }, this.AVVISI_STATO_CARICAMENTI_INTERVAL * 1000);
    }
  }

  getBadgeClass(status: number): string {
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

  getBadgeText(status: number): string {
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

  getSvgClass(status: number): string {
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

  openDettagli(jobId: number): void {
    this.paymentJobService.downloadFile(jobId);
  }
}
