import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent {
  constructor(private spinnerService: NgxSpinnerService) {}

  show = false;
  @Input('show') set setShow(value: boolean) {
    this.show = value;
    if (this.show) {
      this.spinnerService.show();
    } else {
      this.spinnerService.hide();
    }
  }
}
