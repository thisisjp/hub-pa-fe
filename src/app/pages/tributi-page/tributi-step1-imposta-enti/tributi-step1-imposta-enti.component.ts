import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../../../models/menu.enum';
import { TributiStep } from '../../../models/tributi-step';
import { denominationDefault, Tribute } from '../../../models/tribute';
import { TributeService } from '../../../services/tribute.service';
import { SelectOptionList } from '../../../models/select-option-list';
import { SelectOption } from '../../../models/select-option';
import { CreditorList } from '../../../models/creditor-list';

declare const $: any;

@Component({
  selector: 'app-tributi-step1',
  templateUrl: './tributi-step1-imposta-enti.component.html',
  styleUrls: ['./tributi-step1-imposta-enti.component.sass']
})
export class TributiStep1ImpostaEntiComponent implements OnInit {
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

    const ibanList = this.tributeService.getIbans(defaultValues?.idPrimaryCreditor);
    $('#ibanPrimarySelect').setOptionsToSelect(ibanList.options);
    // eslint-disable-next-line functional/immutable-data
    $('#ibanSecondarySelect > div > button')[0].disabled = true;
    if (defaultValues?.idSecondaryCreditor) {
      // eslint-disable-next-line functional/immutable-data
      $('#ibanSecondarySelect > div > button')[0].disabled = false;
      $('#ibanSecondarySelect').removeClass('disabled');
      const ibanSecondaryList = this.tributeService.getIbans(defaultValues?.idSecondaryCreditor);
      $('#ibanSecondarySelect').setOptionsToSelect(ibanSecondaryList.options);
    }
    const creditorList = this.tributeService.getCreditors();
    $('#idPrimaryCreditorSelect').setOptionsToSelect(this.toSelectedOptions(creditorList));
    $('#idSecondaryCreditorSelect').setOptionsToSelect(this.toSelectedOptions(creditorList));

    // eslint-disable-next-line functional/immutable-data
    this.formGroup = this.formBuilder.group({
      idPrimaryCreditor: [
        defaultValues?.idPrimaryCreditor
          ? defaultValues.idPrimaryCreditor
          : this.toSelectedOptions(creditorList)[0].value,
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
      ],
      creditorList: []
    });

    this.f.creditorList.setValue(creditorList.creditorList);

    const scegliUnaOpzione = 'Scegli una opzione';
    // eslint-disable-next-line functional/immutable-data
    $('#idPrimaryCreditorSelect > div > button')[0].disabled = true;
    // eslint-disable-next-line functional/immutable-data
    $('#idPrimaryCreditorSelect > div > button > div > div > div')[0].innerHTML = defaultValues?.idPrimaryCreditor
      ? this.toSelectedOptions(creditorList).filter(elem => elem.value === defaultValues.idPrimaryCreditor)[0].text
      : this.toSelectedOptions(creditorList)[0].text;
    // eslint-disable-next-line functional/immutable-data
    $('#idSecondaryCreditorSelect > div > button > div > div > div')[0].innerHTML = defaultValues?.idSecondaryCreditor
      ? this.toSelectedOptions(creditorList).filter(elem => elem.value === defaultValues.idSecondaryCreditor)[0].text
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
      this.f.creditorList.value,
      true,
      true,
      '',
      [],
      denominationDefault
    );
    this.router
      .navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.tributiStepEnum.STEP2], {
        state: { data }
      })
      .catch(reason => reason);
  }

  prevStep(): void {
    this.router.navigate([this.menuEnum.HOME_PATH + '/' + this.tributiStepEnum.STEP0]).catch(reason => reason);
  }

  get f(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  changedSecondaryCreditor(): void {
    if (this.f.idSecondaryCreditor.value) {
      // eslint-disable-next-line functional/immutable-data
      $('#ibanSecondarySelect > div > button')[0].disabled = false;
      $('#ibanSecondarySelect').removeClass('disabled');
      const ibanSecondaryList = this.tributeService.getIbans(this.f.idSecondaryCreditor.value);
      $('#ibanSecondarySelect').setOptionsToSelect(ibanSecondaryList.options);
      this.f.ibanSecondary.setValue('');
    }
  }

  isPercentageRangeValid(): boolean {
    return 0 <= this.f.percentageSecondary.value && this.f.percentageSecondary.value < 100;
  }

  toSelectedOptions(response: CreditorList): Array<SelectOption> {
    const selectOptionList = new SelectOptionList();
    for (const elem of response.creditorList) {
      const text = elem.denominazioneEnte + ' (' + elem.codiceFiscale + ' - ' + elem.codiceInterbancario + ')';
      const selectedOption = new SelectOption(text, elem.id);
      // eslint-disable-next-line functional/immutable-data
      selectOptionList.options.push(selectedOption);
    }
    return selectOptionList.options;
  }

  addPercentage(): void {
    const control = this.f.percentageSecondary;
    if (control.value < 99.99) {
      control.setValue(Math.round(parseFloat(control.value) * 100 + 1) / 100);
    }
  }

  removePercentage(): void {
    const control = this.f.percentageSecondary;
    if (control.value > 0) {
      control.setValue(Math.round(parseFloat(control.value) * 100 - 1) / 100);
    }
  }
}
