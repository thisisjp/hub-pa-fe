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

  /**
   * Indica se è presente un tributo
   */
  isServiceConfigurated(fiscalCode: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(environment.API_URL + '/service-management/service/info/' + fiscalCode);
  }

  /**
   * Salva il tributo
   */
  saveService(request: Tribute): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(environment.API_URL + '/service-management/service', request);
  }

  /**
   * Recupera i dati del tributo
   */
  getService(fiscalCode: string): Observable<Tribute> {
    return this.http.get<Tribute>(environment.API_URL + '/service-management/service/' + fiscalCode);
  }
}
