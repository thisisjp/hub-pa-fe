import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() group: FormGroup = new FormGroup({});
  @Input() inputLabel = '';
  @Input() inputPlaceholder = '';
  @Input() inputValue = '';
  @Input() formControlName = '';
  @Input() isReadonly = false;
  @Input() type = 'text';
  @Input() message = '';

  isError(): boolean {
    return !!this.message;
  }

  writeValue(value: any): void {
    if (value) {
      // eslint-disable-next-line functional/immutable-data
      this.inputValue = value;
    }
  }

  registerOnChange(fn: any): void {
    //
  }

  registerOnTouched(fn: any): void {
    //
  }

  setDisabledState(isDisabled: boolean): void {
    //
  }
}
