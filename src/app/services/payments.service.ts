import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  export(jobId: number): void {
    open(this.url + '/export/' + String(jobId));
  }

  /**
   * Esporta i pagamenti selezionati
   */
  exportPayments(ids: Array<number>): Observable<BaseResponse> {
    const request: PublishExportModel = { ids };
    return this.http.post<BaseResponse>(this.url + '/exportPayments', request);
  }

  /**
   * Pubblica i pagamenti selezionati
   */
  publishPayments(ids: Array<number>, publishDate: string): Observable<BaseResponse> {
    const request: PublishExportModel = { ids, publishDate };
    return this.http.post<BaseResponse>(this.url + '/publishPayments', request);
  }
}
