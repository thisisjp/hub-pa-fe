import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';
import { denominationDefault, Tribute } from '../../../models/tribute';
import { Installment } from '../../../models/installment';
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
  templateUrl: './tributi-step2.component.html',
  styleUrls: ['./tributi-step2.component.sass']
})
export class TributiStep2Component implements OnInit {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;
  public formGroup: FormGroup = new FormGroup({});

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
      idPrimaryCreditor: [defaultValues?.idPrimaryCreditor],
      idSecondaryCreditor: [defaultValues?.idSecondaryCreditor],
      ibanPrimary: [defaultValues?.ibanPrimary],
      ibanSecondary: [defaultValues?.ibanSecondary],
      percentageSecondary: [defaultValues?.percentageSecondary],
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
      this.f.idPrimaryCreditor.value,
      this.f.idSecondaryCreditor.value,
      this.f.ibanPrimary.value,
      this.f.ibanSecondary.value,
      this.f.percentageSecondary.value,
      this.f.abilitaUnica.value,
      this.f.abilitaRate.value,
      this.f.dueDateUnique.value,
      this.f.installments.value,
      denominationDefault
    );
    if (!this.ifFormValid()) {
      console.log(this.findInvalidControls());
      return;
    }
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP3], {
      state: { data }
    });
  }

  prevStep(): void {
    const data = new Tribute(
      this.f.idPrimaryCreditor.value,
      this.f.idSecondaryCreditor.value,
      this.f.ibanPrimary.value,
      this.f.ibanSecondary.value,
      this.f.percentageSecondary.value,
      true,
      true,
      '',
      [],
      denominationDefault
    );
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP1], {
      state: { data }
    });
  }

  get f(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  private findInvalidControls(): Array<any> {
    const invalid = [];
    const controls = this.f;
    for (const name in controls) {
      if (controls[name].invalid) {
        // eslint-disable-next-line functional/immutable-data
        invalid.push(name);
      }
    }
    return invalid;
  }

  onSubmit(): void {
    //
  }

  abilitaUnicaChanged(): void {
    if (!this.f.abilitaUnica.value) {
      this.f.dueDateUnique.setValue('');
    }
  }

  abilitaRateChanged(): void {
    if (!this.f.abilitaRate.value) {
      this.f.installments.setValue([]);
    }
  }

  get installments(): FormArray {
    return this.formGroup.get('installments') as FormArray;
  }

  private addInstallments(installments: Array<Installment>): void {
    if (installments.length === 0) {
      this.addInstallment();
      this.addInstallment();
    }
    for (const elem of installments) {
      this.addInstallment(elem.dueDate, elem.percentagePrimary, elem.percentageSecondary);
    }
  }

  addInstallment(dueDate: string = '', percentagePrimary: number = 0, percentageSecondary: number = 0): void {
    this.installments.push(this.formBuilder.group({ dueDate, percentagePrimary, percentageSecondary }));
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

  isDateAfter_30_06_2021(inputDate: string): boolean {
    const inputParts = inputDate.split('-');
    if (inputParts.length !== 3) {
      return false;
    }
    const radix = 10;
    const inputDateParsed = new Date(
      parseInt(inputParts[0], radix),
      parseInt(inputParts[1], radix) - 1,
      parseInt(inputParts[2], radix)
    );
    return inputDateParsed > new Date(2021, 6 - 1, 30);
  }

  private areInstallmentsDatesValid(): boolean {
    for (const elem of this.f.installments.value) {
      if (!this.isDateAfter_30_06_2021(elem.dueDate) && elem.percentageSecondary > 0) {
        return false;
      }
    }
    return true;
  }

  public ifFormValid(): boolean {
    if (this.formGroup.invalid) {
      console.log(1);
      return false;
    }
    if (!this.f.abilitaUnica.value && !this.f.abilitaRate.value) {
      console.log(2);
      return false;
    }
    if (this.f.abilitaUnica.value && !this.isDateAfter_30_06_2021(this.f.dueDateUnique.value)) {
      console.log(3);
      return false;
    }
    if (this.f.abilitaRate.value && !this.arePercentagesValid()) {
      console.log(4);
      return false;
    }
    if (this.f.abilitaRate.value && !this.areInstallmentsDatesValid()) {
      console.log(5);
      return false;
    }
    return true;
  }
}
