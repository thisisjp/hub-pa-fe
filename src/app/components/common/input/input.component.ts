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
  type = '';
  @Input('type') set setType(value: string) {
    this.type = value ? value : 'text';
  }
  message = '';
  showError = false;
  @Input('validation-required') set setShowError(value: boolean) {
    this.showError = value;
    if (this.showError) {
      this.message = 'REQUIRED_FIELD';
    }
  }
  showErrorEmail = false;
  @Input('validation-email') set setShowErrorEmail(value: boolean) {
    this.showErrorEmail = value;
    if (this.showErrorEmail) {
      this.message = 'VALID_EMAIL';
    }
  }
  showErrorFiscalCode = false;
  @Input('validation-fiscal-code') set setShowErrorFiscalCode(value: boolean) {
    this.showErrorFiscalCode = value;
    if (this.showErrorFiscalCode) {
      this.message = 'VALID_FISCAL_CODE';
    }
  }
  showErrorMaxlenght = false;
  @Input('validation-max-length') set setShowErrorMaxLength(value: boolean) {
    this.showErrorMaxlenght = value;
    if (this.showErrorMaxlenght) {
      this.message = 'VALID_MAX_LENGTH';
    }
  }
  showErrorMathPassword = false;
  @Input('validation-match-password') set setShowErrorMathPassword(value: boolean) {
    this.showErrorMathPassword = value;
    if (this.showErrorMathPassword) {
      this.message = 'VALID_MATCH_PW';
    }
  }

  isError(): boolean {
    return (
      this.showError ||
      this.showErrorEmail ||
      this.showErrorFiscalCode ||
      this.showErrorMaxlenght ||
      this.showErrorMathPassword
    );
  }

  writeValue(value: any): void {
    if (value) {
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
