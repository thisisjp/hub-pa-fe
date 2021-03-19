import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageHtml } from '../../../models/image-html';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input() buttonClass = '';
  @Input() buttonTitle = '';
  @Input() isSubmit = false;
  @Input() canDisabled = false;
  @Input() img?: ImageHtml;
  @Output() clickButtonEvent: EventEmitter<any> = new EventEmitter();

  onClickEvent(): void {
    if (!this.isSubmit) {
      this.clickButtonEvent.emit();
    }
  }
}
