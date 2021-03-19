import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageHtml } from '../../../models/image-html';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  supportImg: ImageHtml = {
    alt: 'Helpdesk Icon',
    class: 'icon helpdesk-icon',
    src: '/assets/img/helpdesk-icon.svg',
    style: 'width: 24px; height: 24px; margin-right: 8px;',
    title: 'Helpdesk Icon'
  };

  constructor(private router: Router) {}

  goToSupportPage(): void {
    void this.router.navigate(['/support']);
  }
}
