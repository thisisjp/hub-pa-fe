import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvvisiStep } from '../models/avvisi-step';
import { BaseResponse } from '../models/base-response';
import { Menu } from '../models/menu.enum';
import { UploadCSVModel } from '../models/upload-csv-model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public uploadCSV(model: UploadCSVModel): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(environment.HOST_URL + '/upload-payments', model);
  }
}
