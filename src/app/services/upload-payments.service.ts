import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UploadCSVModel } from '../models/upload-csv-model';
import { BaseResponse } from '../models/base-response';
import { environment } from '../../environments/environment';
import { PaymentJob } from '../models/payment-job';

@Injectable({
  providedIn: 'root'
})
export class UploadPaymentsService {
  constructor(private http: HttpClient) {}

  /**
   * Indica se lo stato dei job indicati è diverso da In Attesa
   */
  statusChanged(jobIds: Array<number>): Observable<BaseResponse> {
    // eslint-disable-next-line functional/no-let
    let params = new HttpParams();
    for (const elem of jobIds) {
      params = params.append('jobIds', String(elem));
    }
    return this.http.get<BaseResponse>(environment.API_URL + '/upload-payments/statusChanged', { params });
  }

  /**
   * Verifica se sono stati caricati dei job non andati in errore
   */
  isPaymentJobAvailable(fiscalCode: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(environment.API_URL + '/upload-payments/isPaymentJobAvailable/' + fiscalCode);
  }

  /**
   * Registra un caricamento di file csv
   */
  createJobRecord(model: PaymentJob): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(environment.API_URL + '/upload-payments/createJobRecord', model);
  }

  /**
   * Recupera la lista dei file csv caricati
   */
  getAll(fiscalCode: string): Observable<Array<PaymentJob>> {
    return this.http.get<Array<PaymentJob>>(environment.API_URL + '/upload-payments/getAll/' + fiscalCode);
  }

  /**
   * Carica sulla coda gli oggetti rappresentati il file csv
   */
  upload(model: UploadCSVModel): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(environment.API_URL + '/upload-payments/upload', model);
  }

  downloadFile(jobId: number): void {
    //
  }
}
