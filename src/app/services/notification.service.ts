import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';

declare function notificationShow(notificationTarget: string, notificationTimeOut: number): any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification = new Notification();

  showNotification(notification: Notification): void {
    // eslint-disable-next-line functional/immutable-data
    this.notification = notification;
    notificationShow('app-notification', 0);
  }
}
