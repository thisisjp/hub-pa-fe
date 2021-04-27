import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FindRequestModel } from '../models/find-request-model';
import { FindResponseModel } from '../models/find-response-model';
import { BaseResponse } from '../models/base-response';
import { PositionStatusEnum } from '../models/enums/position-status.enum';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  private url = environment.API_URL + environment.PREFIX_URL_PAYMENTS + '/payments';
  private statusMock = PositionStatusEnum;

  /**
   * TODO integrare e poi togliere
   */
  findMock(model: FindRequestModel): FindResponseModel {
    return {
      payments: [
        {
          id: 1,
          fiscalCode: 'RSSMRA30A01H501I',
          name: 'Mario ' + String(model.page),
          surname: 'Rossi',
          date: new Date(),
          status: this.statusMock.BOZZA
        },
        {
          id: 2,
          fiscalCode: 'RSSMRA30A01H501J',
          name: 'Maria ' + String(model.page),
          surname: 'Bianchi',
          date: new Date(),
          status: this.statusMock.PAGATO
        },
        {
          id: 3,
          fiscalCode: 'RSSMRA30A01H501L',
          name: 'Luca ' + String(model.page),
          surname: 'Verdi',
          date: new Date(),
          status: this.statusMock.PUBBLICATO
        }
      ],
      currentPage: model.page,
      totalItems: 30,
      totalPages: 10
    };
  }

  /**
   * TODO integrare
   */
  find(model: FindRequestModel): Observable<FindResponseModel> {
    return this.http.post<FindResponseModel>(this.url + '/find', model);
  }

  /**
   * TODO modelli
   */
  info(id: number): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(this.url + '/info/' + String(id));
  }
}
