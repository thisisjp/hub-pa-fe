import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FindRequestModel } from '../models/payments/find-request-model';
import { FindResponseModel } from '../models/payments/find-response-model';
import { PaymentPositionDetailModel } from '../models/payments/payment-position-detail-model';
import { BaseResponse } from '../models/base-response';
import { PublishExportModel } from '../models/payments/publish-export-model';

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
  export(jobId: number, fileName: string): void {
    open(this.url + '/export/' + String(jobId) + '/' + fileName);
  }

  /**
   * Esporta i pagamenti selezionati
   */
  exportPayments(ids: Array<number>, isMailing: boolean): Observable<any> {
    const request: PublishExportModel = { ids, isMailing };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    return this.http.post(this.url + '/exportPayments', request, {
      headers,
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }

  /**
   * Pubblica i pagamenti selezionati
   */
  publishPayments(ids: Array<number>, publishDate: string): Observable<BaseResponse> {
    const request: PublishExportModel = { ids, publishDate, isMailing: true };
    return this.http.post<BaseResponse>(this.url + '/publishPayments', request);
  }

  /**
   * Elimina i pagamenti selezionati
   */
  deletePayment(id: number): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(this.url + '/' + String(id));
  }

  /**
   * Genera il PDF di una ricevuta dato un pagamento
   */
  receipt(id: number): void {
    open(this.url + '/receipt/' + String(id));
  }
}
