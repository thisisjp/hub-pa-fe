import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FindRequestModel } from '../models/payments/find-request-model';
import { FindResponseModel } from '../models/payments/find-response-model';
import { PaymentPositionDetailModel } from '../models/payments/payment-position-detail-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  private url = environment.API_URL + environment.PREFIX_URL_PAYMENTS + '/payments';

  /**
   * Recupera lista dei pagamenti dato il codice fiscale dell'ente
   */
  find(model: FindRequestModel): Observable<FindResponseModel> {
    return this.http.post<FindResponseModel>(this.url + '/find', model);
  }

  /**
   * TODO integrare e poi togliere
   */
  infoMock(id: number): PaymentPositionDetailModel {
    return {
      nominative: 'Filippo Marchetti',
      fiscalCode: 'MRCFPP80H27D612M',
      addressLine1: 'Via Mariti 52',
      addressLine2: '50127 Firenze',
      description: 'TariTefa2021',
      status: 1,
      installments: [
        {
          isConclusive: false,
          dueDate: '2021-03-31',
          amount: 190,
          notificationCode: '382202100000000202',
          status: 2
        },
        {
          isConclusive: false,
          dueDate: '2021-07-10',
          amount: 307.5,
          notificationCode: '382202100000000303',
          status: 2
        },
        {
          isConclusive: false,
          dueDate: '2021-08-11',
          amount: 502.5,
          notificationCode: '382202100000000404',
          status: 2
        },
        {
          isConclusive: true,
          dueDate: '2021-07-30',
          amount: 1000,
          notificationCode: '382202100000000101',
          status: 2
        }
      ]
    };
  }

  /**
   * TODO integrare
   * Recupera il dettaglio di un pagamento dato un paymentPositionId
   */
  info(id: number): Observable<PaymentPositionDetailModel> {
    return this.http.get<PaymentPositionDetailModel>(this.url + '/info/' + String(id));
  }

  /**
   * Esporta i pagamenti in formato csv dato un jobId
   */
  export(jobId: number): Observable<any> {
    return this.http.get<any>(this.url + '/export/' + String(jobId));
  }
}
