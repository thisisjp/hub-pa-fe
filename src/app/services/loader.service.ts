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
    // eslint-disable-next-line functional/immutable-data
    this.requestCount++;
    if (this.requestCount === 1) {
      this.showLoader.next(true);
    }
  }

  endRequest(): void {
    if (this.requestCount === 0) {
      this.showLoader.next(false);
      return;
    }
    // eslint-disable-next-line functional/immutable-data
    this.requestCount--;
    if (this.requestCount === 0) {
      this.showLoader.next(false);
    }
  }
}
