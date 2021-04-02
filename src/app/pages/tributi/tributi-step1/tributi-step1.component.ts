import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tryCatch } from 'rxjs/internal-compatibility';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';
import { Tribute } from '../../../models/tribute';
import { TributeService } from '../../../services/tribute.service';
declare const $: any;

@Component({
  selector: 'app-tributi-step1',
  templateUrl: './tributi-step1.component.html',
  styleUrls: ['./tributi-step1.component.sass']
})
export class TributiStep1Component implements OnInit {
  private menuEnum = Menu;
  private tributiStepEnum = TributiStep;
  public formGroup: FormGroup = new FormGroup({});

  constructor(private router: Router, private formBuilder: FormBuilder, private tributeService: TributeService) {}

  ngOnInit(): void {
    // Bootstrap-select initialisation
    $('.bootstrap-select-wrapper select')
      .selectpicker()
      .on('changed.bs.select', () => {
        $('.dropdown-menu li.selected').find('input[type="checkbox"]').prop('checked', true);
        $('.dropdown-menu li:not(.selected)').find('input[type="checkbox"]').prop('checked', false);
      });

    const defaultValues = history.state?.data;

    const ibanList = this.tributeService.getIbans('');
    tryCatch($('#ibanPrimarySelect').setOptionsToSelect(ibanList.options));
    // eslint-disable-next-line functional/immutable-data
    $('#ibanSecondarySelect > div > button')[0].disabled = true;
    if (defaultValues?.idSecondaryCreditor) {
      // eslint-disable-next-line functional/immutable-data
      $('#ibanSecondarySelect > div > button')[0].disabled = false;
      $('#ibanSecondarySelect').removeClass('disabled');
      const ibanSecondaryList = this.tributeService.getIbans(defaultValues?.idSecondaryCreditor);
      tryCatch($('#ibanSecondarySelect').setOptionsToSelect(ibanSecondaryList.options));
    }
    const creditorList = this.tributeService.getCreditors();
    tryCatch($('#idPrimaryCreditorSelect').setOptionsToSelect(creditorList.options));
    tryCatch($('#idSecondaryCreditorSelect').setOptionsToSelect(creditorList.options));

    // eslint-disable-next-line functional/immutable-data
    this.formGroup = this.formBuilder.group({
      idPrimaryCreditor: [
        defaultValues?.idPrimaryCreditor ? defaultValues.idPrimaryCreditor : creditorList.options[0].value,
        [Validators.required]
      ],
      idSecondaryCreditor: [
        defaultValues?.idSecondaryCreditor ? defaultValues.idSecondaryCreditor : 0,
        [Validators.required]
      ],
      ibanPrimary: [defaultValues?.ibanPrimary ? defaultValues.ibanPrimary : '', [Validators.required]],
      ibanSecondary: [defaultValues?.ibanSecondary ? defaultValues.ibanSecondary : '', [Validators.required]],
      percentageSecondary: [
        defaultValues?.percentageSecondary ? defaultValues.percentageSecondary : 0,
        [Validators.required]
      ]
    });

    const scegliUnaOpzione = 'Scegli una opzione';
    // eslint-disable-next-line functional/immutable-data
    $('#idPrimaryCreditorSelect > div > button')[0].disabled = true;
    // eslint-disable-next-line functional/immutable-data
    $('#idPrimaryCreditorSelect > div > button > div > div > div')[0].innerHTML = defaultValues?.idPrimaryCreditor
      ? creditorList.options.filter(elem => elem.value === defaultValues.idPrimaryCreditor)[0].text
      : creditorList.options[0].text;
    // eslint-disable-next-line functional/immutable-data
    $('#idSecondaryCreditorSelect > div > button > div > div > div')[0].innerHTML = defaultValues?.idSecondaryCreditor
      ? creditorList.options.filter(elem => elem.value === defaultValues.idSecondaryCreditor)[0].text
      : scegliUnaOpzione;
    // eslint-disable-next-line functional/immutable-data
    $('#ibanPrimarySelect > div > button > div > div > div')[0].innerHTML = defaultValues?.ibanPrimary
      ? defaultValues.ibanPrimary
      : scegliUnaOpzione;
    // eslint-disable-next-line functional/immutable-data
    $('#ibanSecondarySelect > div > button > div > div > div')[0].innerHTML = defaultValues?.ibanSecondary
      ? defaultValues.ibanSecondary
      : scegliUnaOpzione;
  }

  nextStep(): void {
    const data = new Tribute(
      this.f.idPrimaryCreditor.value,
      this.f.idSecondaryCreditor.value,
      this.f.ibanPrimary.value,
      this.f.ibanSecondary.value,
      this.f.percentageSecondary.value,
      '',
      [],
      'TariTefa2021'
    );
    if (!data.idPrimaryCreditor || !data.idSecondaryCreditor || !data.ibanPrimary || !data.ibanSecondary) {
      return;
    }
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP2], {
      state: { data }
    });
  }

  prevStep(): void {
    void this.router.navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP0]);
  }

  get f(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    //
  }

  changedSecondaryCreditor(): void {
    if (this.f.idSecondaryCreditor.value) {
      // eslint-disable-next-line functional/immutable-data
      $('#ibanSecondarySelect > div > button')[0].disabled = false;
      $('#ibanSecondarySelect').removeClass('disabled');
      const ibanSecondaryList = this.tributeService.getIbans(this.f.idSecondaryCreditor.value);
      tryCatch($('#ibanSecondarySelect').setOptionsToSelect(ibanSecondaryList.options));
    }
  }
}
