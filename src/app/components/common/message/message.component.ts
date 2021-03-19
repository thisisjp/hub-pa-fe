import { Component, Input } from '@angular/core';
import { ErrorService } from '../../../services/error.service';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent {
  @Input() message: Message = new Message('', '');

  constructor(private errorService: ErrorService) {}

  onClose(): void {
    this.errorService.setError(new Message('', ''));
  }
}
