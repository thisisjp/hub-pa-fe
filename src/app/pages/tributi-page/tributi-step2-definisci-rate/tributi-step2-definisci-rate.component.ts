import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Menu } from '../../../models/enums/menu.enum';
import { denominationDefault, Tribute } from '../../../models/tribute';
import { Installment } from '../../../models/installment';
import { environment } from '../../../../environments/environment';

declare const $: any;

export type BooleanFn = () => boolean;

export function conditionalValidator(predicate: BooleanFn, validator: ValidatorFn): ValidatorFn {
  return formControl => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      return validator(formControl);
    }
    return null;
  };
}

@Component({
  selector: 'app-tributi-step2',
  templateUrl: './tributi-step2-definisci-rate.component.html',
  styleUrls: ['./tributi-step2-definisci-rate.component.sass']
})
export class TributiStep2DefinisciRateComponent implements OnInit {
  private menuEnum = Menu;
  public formGroup: FormGroup = new FormGroup({});
  today = new Date();
  maxDate = environment.maxDate;
  public configureServiceDate = environment.configureServiceDate;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Bootstrap-select initialisation
    $('.bootstrap-select-wrapper select')
      .selectpicker()
      .on('changed.bs.select', () => {
        $('.dropdown-menu li.selected').find('input[type="checkbox"]').prop('checked', true);
        $('.dropdown-menu li:not(.selected)').find('input[type="checkbox"]').prop('checked', false);
      });

    const defaultValues = history.state?.data;

    // eslint-disable-next-line functional/immutable-data
    this.formGroup = this.formBuilder.group({
      ibanPrimary: [defaultValues?.ibanPrimary],
      ibanSecondary: [defaultValues?.ibanSecondary],
      percentageSecondary: [defaultValues?.percentageSecondary],
      creditorList: [defaultValues?.creditorList],
      fiscalCodePrimaryCreditor: [defaultValues?.fiscalCodePrimaryCreditor],
      fiscalCodeSecondaryCreditor: [defaultValues?.fiscalCodeSecondaryCreditor],
      abilitaUnica: [defaultValues?.abilitaUnica, [Validators.required]],
      abilitaRate: [defaultValues?.abilitaRate, [Validators.required]],
      dueDateUnique: [
        defaultValues?.dueDateUnique,
        conditionalValidator(() => this.f.abilitaUnica.value, Validators.required)
      ],
      installments: this.formBuilder.array(
        [],
        conditionalValidator(() => this.f.abilitaRate.value, Validators.required)
      )
    });

    this.addInstallments(defaultValues?.installments);

    this.f.abilitaUnica.valueChanges.subscribe(() => {
      this.f.dueDateUnique.updateValueAndValidity();
    });

    this.f.abilitaRate.valueChanges.subscribe(() => {
      this.f.installments.updateValueAndValidity();
    });
  }

  nextStep(): void {
    const data = new Tribute(
      this.f.ibanPrimary.value,
      this.f.ibanSecondary.value,
      this.f.percentageSecondary.value,
      this.f.fiscalCodePrimaryCreditor.value,
      this.f.fiscalCodeSecondaryCreditor.value,
      this.f.creditorList.value,
      this.f.abilitaUnica.value,
      this.f.abilitaRate.value,
      this.f.dueDateUnique.value,
      this.f.installments.value,
      denominationDefault
    );
    if (!this.ifFormValid()) {
      // console.log(this.findInvalidControls());
      return;
    }
    this.router
      .navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.menuEnum.TRIBUTI_STEP3], {
        state: { data }
      })
      .catch(reason => reason);
  }

  prevStep(): void {
    const data = new Tribute(
      this.f.ibanPrimary.value,
      this.f.ibanSecondary.value,
      this.f.percentageSecondary.value,
      this.f.fiscalCodePrimaryCreditor.value,
      this.f.fiscalCodeSecondaryCreditor.value,
      this.f.creditorList.value,
      true,
      true,
      '',
      [],
      denominationDefault
    );
    this.router
      .navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.menuEnum.TRIBUTI_STEP1], {
        state: { data }
      })
      .catch(reason => reason);
  }

  get f(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  /* private findInvalidControls(): Array<any> {
    const invalid = [];
    const controls = this.f;
    for (const name in controls) {
      if (controls[name].invalid) {
        // eslint-disable-next-line functional/immutable-data
        invalid.push(name);
      }
    }
    return invalid;
  } */

  get installments(): FormArray {
    return this.formGroup.get('installments') as FormArray;
  }

  private addInstallments(installments: Array<Installment>): void {
    if (!installments || installments?.length === 0) {
      this.addInstallment();
      this.addInstallment();
      return;
    }
    for (const elem of installments) {
      this.addInstallment(elem.dueDate, elem.percentagePrimary, elem.percentageSecondary);
    }
  }

  addInstallment(dueDate: string = '', percentagePrimary: number = 0, percentageSecondary: number = 0): void {
    this.installments?.push(this.formBuilder.group({ dueDate, percentagePrimary, percentageSecondary }));
  }

  removeInstallment(i: number): void {
    this.installments.removeAt(i);
  }

  getPercentageLeft(isPrimary: boolean): number {
    // eslint-disable-next-line functional/no-let
    let retVal = 100.0;
    const inst = this.installments.value;
    for (const elem of inst) {
      retVal -= isPrimary ? elem.percentagePrimary : elem.percentageSecondary;
    }
    return Math.round(retVal * 100) / 100;
  }

  private arePercentagesValid(): boolean {
    if (this.f.percentageSecondary.value > 0) {
      return this.getPercentageLeft(true) === 0 && this.getPercentageLeft(false) === 0;
    } else {
      return this.getPercentageLeft(true) === 0;
    }
  }

  isDateAfterConfigureServiceDate(inputDate: string): boolean {
    const inputParts = inputDate.split('-');
    const configureServiceDateParts = this.configureServiceDate.split('/');
    if (inputParts.length !== 3 || configureServiceDateParts.length !== 3) {
      return false;
    }
    const radix = 10;
    const inputDateParsed = new Date(
      parseInt(inputParts[0], radix),
      parseInt(inputParts[1], radix) - 1,
      parseInt(inputParts[2], radix)
    );
    const configureServiceDateParsed = new Date(
      parseInt(configureServiceDateParts[2], radix),
      parseInt(configureServiceDateParts[1], radix) - 1,
      parseInt(configureServiceDateParts[0], radix)
    );
    return inputDateParsed > configureServiceDateParsed;
  }

  private areInstallmentsDatesValid(): boolean {
    for (const elem of this.f.installments.value) {
      if (!elem.dueDate || (!this.isDateAfterConfigureServiceDate(elem.dueDate) && elem.percentageSecondary > 0)) {
        return false;
      }
    }
    return true;
  }

  public ifFormValid(): boolean {
    if (this.formGroup.invalid) {
      return false;
    }
    if (!this.f.abilitaUnica.value && !this.f.abilitaRate.value) {
      return false;
    }
    if (this.f.abilitaUnica.value && !this.isDateAfterConfigureServiceDate(this.f.dueDateUnique.value)) {
      return false;
    }
    if (this.f.abilitaRate.value && !this.arePercentagesValid()) {
      return false;
    }
    return !(this.f.abilitaRate.value && !this.areInstallmentsDatesValid());
  }

  addPercentage(i: number, isPrimary: boolean): void {
    const control = this.installments.controls[i].get(isPrimary ? 'percentagePrimary' : 'percentageSecondary');
    if (control?.value < 100) {
      control?.setValue(Math.round(parseFloat(control.value) * 100 + 1) / 100);
    }
  }

  removePercentage(i: number, isPrimary: boolean): void {
    const control = this.installments.controls[i].get(isPrimary ? 'percentagePrimary' : 'percentageSecondary');
    if (control?.value > 0) {
      control?.setValue(Math.round(parseFloat(control.value) * 100 - 1) / 100);
    }
  }
}
