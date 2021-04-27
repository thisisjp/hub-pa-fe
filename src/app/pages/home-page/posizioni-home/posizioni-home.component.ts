import { Component, OnInit, ViewChild } from '@angular/core';
import { Position } from 'src/app/models/position';
import { PositionStatusEnum } from '../../../models/position-status.enum';

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

  listPosition: Array<Position> = [
    {
      id: 2,
      fiscalCode: 'RSSMRA30A01H501I',
      name: 'Mario',
      surname: 'Rossi',
      notifyCode: '0000000000000000',
      date: new Date(),
      status: 0
    },
    {
      id: 2,
      fiscalCode: 'RSSMRA30A01H50I',
      name: 'Mario',
      surname: 'Rossi',
      notifyCode: '0000000000000000',
      date: new Date(),
      status: 0
    },
    {
      id: 2,
      fiscalCode: 'RSSMRA30A01H50I',
      name: 'Mario',
      surname: 'Rossi',
      notifyCode: '0000000000000000',
      date: new Date(),
      status: 0
    },
    {
      id: 2,
      fiscalCode: 'RSSMRA30A01H50I',
      name: 'Mario',
      surname: 'Rossi',
      notifyCode: '0000000000000000',
      date: new Date(),
      status: 0
    },
    {
      id: 2,
      fiscalCode: 'RSSMRA30A01H50I',
      name: 'Mario',
      surname: 'Rossi',
      notifyCode: '0000000000000000',
      date: new Date(),
      status: 0
    }
  ];

  startDate: Date | undefined;
  endDate: Date | undefined;
  stato: number | undefined;

  rowstart = 0;
  rowend = 0;

  // risultato dalla response
  rowtot = 5;

  // selezionata
  page = 0;

  // fixato
  pageelem = 5;

  // risultato dalla response
  pagetot = 7;

  page1 = 0;
  page2 = 0;
  page3 = 0;
  page4 = 0;
  page5 = 0;

  datecheck = false;
  statuscheck = false;

  constructor() {
    //
  }

  ngOnInit(): void {
    this.getListPositionBE();
  }

  pass(pagenumber: number): void {
    // eslint-disable-next-line functional/immutable-data
    this.page = pagenumber - 1;
    this.getListPositionBE();
  }
  passleft(): void {
    if (this.page !== 0) {
      // eslint-disable-next-line functional/immutable-data
      this.page = this.page - 1;
      this.getListPositionBE();
    }
  }
  passright(): void {
    if (this.page + 1 < this.pagetot) {
      // eslint-disable-next-line functional/immutable-data
      this.page = this.page + 1;
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
    this.rowstart = this.page * this.pageelem + 1;
    // eslint-disable-next-line functional/immutable-data
    this.rowend = this.page * this.pageelem + this.pageelem;

    if (this.page === 0) {
      // eslint-disable-next-line functional/immutable-data
      this.page1 = 1;
    }

    if (this.page + 1 > this.page5) {
      // eslint-disable-next-line functional/immutable-data
      this.page1 = this.page1 + 1;
    }
    if (this.page + 1 < this.page1) {
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
