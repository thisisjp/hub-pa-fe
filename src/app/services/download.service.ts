import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private http: HttpClient) {}

  downloadFile(res: any): void {
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(res.body));
    const contentDispositionNullable: string | null = res.headers.get('Content-Disposition');
    const contentDisposition: string = contentDispositionNullable ? contentDispositionNullable : '';
    link.setAttribute(
      'download',
      contentDisposition.replace('attachment; filename=', '').replace('"', '').replace('"', '')
    );
    // eslint-disable-next-line functional/immutable-data
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    const dataURL = URL.createObjectURL(res.body);
    if (navigator && navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(res.body);
      return;
    }
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      URL.revokeObjectURL(dataURL);
    }, 100);
  }
}
