import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.initLang();
  }

  initLang(): void {
    this.translateService.addLangs(['it']);
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
  }
}
