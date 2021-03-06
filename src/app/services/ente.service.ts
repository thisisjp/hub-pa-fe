import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iban } from '../models/iban';
import { environment } from '../../environments/environment';
import { CreditorEntry } from '../models/creditor-entry';
import { BaseResponse } from '../models/base-response';

@Injectable({
  providedIn: 'root'
})
export class EnteService {
  constructor(private http: HttpClient) {}

  private urlCustomer = environment.API_URL + environment.PREFIX_URL_ENTE + '/customer';
  private urlPa = environment.API_URL + environment.PREFIX_URL_ENTE + '/pa';
  private urlPrivacy = environment.API_URL + environment.PREFIX_URL_ENTE + '/privacy';

  getEnteCreditoreByRefP(codiceFiscaleRefP: string): Observable<Array<CreditorEntry>> {
    return this.http.get<Array<CreditorEntry>>(`${this.urlCustomer}/${codiceFiscaleRefP}/pa`);
  }

  getIbanByEnteCreditore(codiceFiscaleEnteCreditore: string, ibanMode: string): Observable<Array<Iban>> {
    return this.http.get<Array<Iban>>(this.urlPa + '/' + codiceFiscaleEnteCreditore + '/' + ibanMode + '/iban');
  }

  getAllEcForTefa(): Observable<Array<CreditorEntry>> {
    return this.http.get<Array<CreditorEntry>>(this.urlPa, { params: { type: 'province' } });
  }

  /**
   * Verifica se un Ref-P ha accettato la privacy
   */
  checkPrivacyByRefP(codiceFiscaleRefP: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.urlPrivacy}/${codiceFiscaleRefP}`);
  }

  /**
   * Crea un record di accettazione privacy
   */
  createPrivacy(codiceFiscaleRefP: string): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.urlPrivacy}/${codiceFiscaleRefP}`, {});
  }
}
