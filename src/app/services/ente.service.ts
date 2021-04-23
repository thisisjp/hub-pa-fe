import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iban } from '../models/iban';
import { environment } from '../../environments/environment';
import { CreditorEntry } from '../models/creditor-entry';

@Injectable({
  providedIn: 'root'
})
export class EnteService {
  constructor(private http: HttpClient) {}

  private url = environment.API_URL + environment.PREFIX_URL_ENTE + '/ente';

  getEnteCreditoreByRefP(codiceFiscaleRefP: string): Observable<CreditorEntry> {
    return this.http.get<CreditorEntry>(this.url + '/refp/' + codiceFiscaleRefP);
  }

  getIbanByEnteCreditore(codiceFiscaleEnteCreditore: string): Observable<Array<Iban>> {
    return this.http.get<Array<Iban>>(this.url + '/' + codiceFiscaleEnteCreditore + '/iban');
  }

  getAllEcForTefa(): Observable<Array<CreditorEntry>> {
    return this.http.get<Array<CreditorEntry>>(this.url + '/pa');
  }
}
