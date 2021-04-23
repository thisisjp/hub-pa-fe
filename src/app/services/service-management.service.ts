import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { environment } from '../../environments/environment';
import { Tribute } from '../models/tribute';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  constructor(private http: HttpClient) {}

  private url = environment.API_URL + environment.PREFIX_URL_SERVICE_MANAGEMENT + '/service-management';

  /**
   * Indica se è presente un tributo
   */
  isServiceConfigurated(fiscalCode: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(this.url + '/service/info/' + fiscalCode);
  }

  /**
   * Salva il tributo
   */
  saveService(request: Tribute): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.url + '/service', request);
  }

  /**
   * Recupera i dati del tributo
   */
  getService(fiscalCode: string): Observable<Tribute> {
    return this.http.get<Tribute>(this.url + '/service/' + fiscalCode);
  }
}
