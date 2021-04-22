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
      fiscalCode: 'RSSSMRSRTS',
      name: 'Mario',
      surname: 'Rossi',
      notifyCode: '0000000000000000',
      date: new Date(),
      status: 3
    }
  ];

  constructor() {
    //
  }

  ngOnInit(): void {
    //
  }
}
