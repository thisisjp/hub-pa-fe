import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private error: BehaviorSubject<Message> = new BehaviorSubject<Message>(new Message('', ''));

  public getErrorObservable(): Observable<Message> {
    return this.error.asObservable();
  }
  public setError(error: Message): void {
    this.error.next(error);
  }
}
