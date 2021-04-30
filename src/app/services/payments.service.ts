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
   * Recupera il dettaglio di un pagamento dato un paymentPositionId
   */
  info(id: number): Observable<PaymentPositionDetailModel> {
    return this.http.get<PaymentPositionDetailModel>(this.url + '/info/' + String(id));
  }

  /**
   * Esporta i pagamenti in formato csv dato un jobId
   */
  export(jobId: number): void {
    open(this.url + '/export/' + String(jobId));
  }
}
