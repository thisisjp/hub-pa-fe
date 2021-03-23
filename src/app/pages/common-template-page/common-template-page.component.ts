import { Component } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'app-common-template-page',
  templateUrl: './common-template-page.component.html',
  styleUrls: ['./common-template-page.component.sass']
})
export class CommonTemplatePageComponent {
  message: Message = new Message('', '');
}
