import { Component, OnInit } from '@angular/core';
import { Position } from 'src/app/models/position';

@Component({
  selector: 'app-posizioni-home',
  templateUrl: './posizioni-home.component.html',
  styleUrls: ['./posizioni-home.component.sass']
})
export class PosizioniHomeComponent implements OnInit {
  listPosition: Array<Position> = [
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

  rowstart: number = 0;
  rowend: number = 0;
  rowtot: number = 0;

  page: number = 0;
  pageelem: number = 5;
  pagetot: number = 0;


  page1: number = 0;
  page2: number = 0;
  page3: number = 0;
  page4: number = 0;
  page5: number = 0;

  datecheck: boolean = false;
  statuscheck: boolean = false;

  constructor() {
    //
  }

  ngOnInit(): void {
    this.rowstart = this.page * this.pageelem + 1;
    this.rowend = this.page * this.pageelem + this.pageelem;

    if (this.page === 0) {
      this.page1 = 1;
      this.page2 = 2;
      this.page3 = 3;
      this.page4 = 4;
      this.page5 = 5;
    }
  }

  pass(e: number) {
    debugger;
  }
  passleft() {
    debugger;
  }
  passright() {
    debugger;
  }
  datecheckswitch() {
    this.datecheck = !this.datecheck;
    if (this.datecheck) {

    }

  }
  statuscheckswitch() {
    this.statuscheck = !this.statuscheck;
    if (this.statuscheck) {

    }

  }
}
