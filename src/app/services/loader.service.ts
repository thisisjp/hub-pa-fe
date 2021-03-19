import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showLoader: Subject<boolean> = new Subject<boolean>();

  requestCount = 0;

  public isShowLoaderObservable(): Observable<boolean> {
    return this.showLoader.asObservable();
  }

  startRequest(): void {
    if (this.requestCount === 0) {
      this.showLoader.next(true);
    }
    this.requestCount++;
  }

  endRequest(): void {
    if (this.requestCount === 0) {
      return;
    }
    this.requestCount--;
    if (this.requestCount === 0) {
      this.showLoader.next(false);
    }
  }
}
