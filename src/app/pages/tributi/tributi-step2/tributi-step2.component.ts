import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';
import { TributeService } from '../../../models/tribute-service';
declare const $: any;

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

    $('.it-date-datepicker').datepicker({
      inputFormat: ['dd/MM/yyyy'],
      outputFormat: 'dd/MM/yyyy'
    });

    const defaultValues = history.state?.data;

    // eslint-disable-next-line functional/immutable-data
    this.formGroup = this.formBuilder.group({
      idPrimaryCreditor: [defaultValues?.idPrimaryCreditor],
      idSecondaryCreditor: [defaultValues?.idSecondaryCreditor],
      ibanPrimary: [defaultValues?.ibanPrimary],
      ibanSecondary: [defaultValues?.ibanSecondary],
      percentageSecondary: [defaultValues?.percentageSecondary],
      abilita: ['Si', [Validators.required]],
      dueDateUnique: [defaultValues?.dueDateUnique ? defaultValues.dueDateUnique : '', [Validators.required]]
    });
  }

  nextStep(): void {
    const data = new TributeService(
      this.f.idPrimaryCreditor.value,
      this.f.idSecondaryCreditor.value,
      this.f.ibanPrimary.value,
      this.f.ibanSecondary.value,
      this.f.percentageSecondary.value,
      this.f.dueDateUnique.value,
      [],
      'TariTefa2021'
    );
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP3], {
      state: { data }
    });
  }

  prevStep(): void {
    const data = new TributeService(
      this.f.idPrimaryCreditor.value,
      this.f.idSecondaryCreditor.value,
      this.f.ibanPrimary.value,
      this.f.ibanSecondary.value,
      this.f.percentageSecondary.value,
      '',
      [],
      'TariTefa2021'
    );
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP1], {
      state: { data }
    });
  }

  get f(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    //
  }
}
