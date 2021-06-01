import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../models/enums/menu.enum';
import { NotificationService } from '../../../services/notification.service';
import { UploadPaymentsService } from '../../../services/upload-payments.service';

@Component({
  selector: 'app-avvisi-step0',
  templateUrl: './avvisi-step0-home.component.html',
  styleUrls: ['./avvisi-step0-home.component.sass']
})
export class AvvisiStep0HomeComponent implements OnInit {
  menuEnum = Menu;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private uploadPaymentsService: UploadPaymentsService
  ) {}

  ngOnInit(): void {
    const defaultValues = history.state?.data;
    if (defaultValues?.title && defaultValues?.message) {
      this.notificationService.showNotification({
        title: defaultValues?.title ? defaultValues?.title : '',
        message: defaultValues?.message ? defaultValues?.message : '',
        isError: false
      });
    }
  }

  nextStep(): void {
    this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.menuEnum.AVVISI_STEP1]).catch(reason => reason);
  }

  downloadCsvTemplate(): void {
    this.uploadPaymentsService.downloadCsvTemplate();
  }
}
