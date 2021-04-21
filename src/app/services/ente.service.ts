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

  getEnteCreditoreByRefP(codiceFiscaleRefP: string): Observable<CreditorEntry> {
    return this.http.get<CreditorEntry>(environment.API_URL + '/ente/refp/' + codiceFiscaleRefP);
  }

  getIbanByEnteCreditore(codiceFiscaleEnteCreditore: string): Observable<Array<Iban>> {
    return this.http.get<Array<Iban>>(environment.API_URL + '/ente/' + codiceFiscaleEnteCreditore + '/iban');
  }

  getAllEcForTefa(): Observable<Array<CreditorEntry>> {
    return this.http.get<Array<CreditorEntry>>(environment.API_URL + '/ente/pa');
  }
}
