import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuSelected: Subject<string> = new Subject<string>();

  public isMenuObservable(): Observable<string> {
    return this.menuSelected.asObservable();
  }

  public setMenuSelected(menuSelected: string): void {
    this.menuSelected.next(menuSelected);
  }
}
