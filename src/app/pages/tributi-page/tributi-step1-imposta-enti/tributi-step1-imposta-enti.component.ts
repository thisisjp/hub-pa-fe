import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../../../models/enums/menu.enum';
import { denominationDefault, Tribute } from '../../../models/tribute';
import { SelectOptionList } from '../../../models/select-option-list';
import { SelectOption } from '../../../models/select-option';
import { TokenService } from '../../../services/token.service';
import { Iban } from '../../../models/iban';
import { CreditorEntry } from '../../../models/creditor-entry';
import { EnteService } from '../../../services/ente.service';

declare const $: any;

@Component({
  selector: 'app-tributi-step1',
  templateUrl: './tributi-step1-imposta-enti.component.html',
  styleUrls: ['./tributi-step1-imposta-enti.component.sass']
})
export class TributiStep1ImpostaEntiComponent implements OnInit {
  private menuEnum = Menu;
  public formGroup: FormGroup = new FormGroup({});
  private creditorList = Array<CreditorEntry>();
  private scegliUnaOpzione = 'Scegli una opzione';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private enteService: EnteService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.initBootstrapSelect();

    const defaultValues = history.state?.data;

    this.enteService.getIbanByEnteCreditore(this.tokenService.getFiscalCode()).subscribe(res => {
      $('#ibanPrimarySelect').setOptionsToSelect(this.toSelectedOptionsIban(res));
      // eslint-disable-next-line functional/immutable-data
      $('#ibanPrimarySelect > div > button > div > div > div')[0].innerHTML = defaultValues?.ibanPrimary
        ? defaultValues.ibanPrimary
        : this.scegliUnaOpzione;
    });
    if (defaultValues?.fiscalCodeSecondaryCreditor) {
      this.enteService.getIbanByEnteCreditore(defaultValues?.fiscalCodeSecondaryCreditor).subscribe(res => {
        this.enableIbanSecondary(res, defaultValues?.ibanSecondary);
      });
    } else {
      this.disableIbanSecondary(defaultValues?.ibanSecondary);
    }
    this.enteService.getAllEcForTefa().subscribe(res => {
      if (res && res.length > 0) {
        // eslint-disable-next-line functional/immutable-data
        this.creditorList = res;
        $('#primaryCreditorSelect').setOptionsToSelect(this.toSelectedOptionsCreditor(this.creditorList));
        $('#secondaryCreditorSelect').setOptionsToSelect(this.toSelectedOptionsCreditor(this.creditorList));
        // eslint-disable-next-line functional/immutable-data
        $('#primaryCreditorSelect > div > button > div > div > div')[0].innerHTML = this.toSelectedOptionsCreditor(
          this.creditorList
        ).filter(elem => elem.value === this.tokenService.getFiscalCode())[0].text;
        // eslint-disable-next-line functional/immutable-data
        $(
          '#secondaryCreditorSelect > div > button > div > div > div'
        )[0].innerHTML = defaultValues?.fiscalCodeSecondaryCreditor
          ? this.toSelectedOptionsCreditor(this.creditorList).filter(
              elem => elem.value === defaultValues.fiscalCodeSecondaryCreditor
            )[0].text
          : this.scegliUnaOpzione;
        // eslint-disable-next-line functional/immutable-data
        $('#primaryCreditorSelect > div > button')[0].disabled = true;
      }
    });

    // eslint-disable-next-line functional/immutable-data
    this.formGroup = this.formBuilder.group({
      fiscalCodePrimaryCreditor: [this.tokenService.getFiscalCode(), [Validators.required]],
      fiscalCodeSecondaryCreditor: [
        defaultValues?.fiscalCodeSecondaryCreditor ? defaultValues.fiscalCodeSecondaryCreditor : '',
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
  }

  private initBootstrapSelect(): void {
    // Bootstrap-select initialisation
    $('.bootstrap-select-wrapper select')
      .selectpicker()
      .on('changed.bs.select', () => {
        $('.dropdown-menu li.selected').find('input[type="checkbox"]').prop('checked', true);
        $('.dropdown-menu li:not(.selected)').find('input[type="checkbox"]').prop('checked', false);
      });
  }

  private enableIbanSecondary(res: Array<Iban>, ibanSecondary: string): void {
    // eslint-disable-next-line functional/immutable-data
    $('#ibanSecondarySelect > div > button')[0].disabled = false;
    const $ibanSecondarySelect = $('#ibanSecondarySelect');
    $ibanSecondarySelect.removeClass('disabled');
    $ibanSecondarySelect.setOptionsToSelect(this.toSelectedOptionsIban(res));
    // eslint-disable-next-line functional/immutable-data
    $('#ibanSecondarySelect > div > button > div > div > div')[0].innerHTML = ibanSecondary
      ? ibanSecondary
      : this.scegliUnaOpzione;
  }

  private disableIbanSecondary(ibanSecondary: string): void {
    // eslint-disable-next-line functional/immutable-data
    $('#ibanSecondarySelect > div > button')[0].disabled = true;
    // eslint-disable-next-line functional/immutable-data
    $('#ibanSecondarySelect > div > button > div > div > div')[0].innerHTML = ibanSecondary
      ? ibanSecondary
      : this.scegliUnaOpzione;
  }

  nextStep(): void {
    const data = new Tribute(
      this.f.ibanPrimary.value,
      this.f.ibanSecondary.value,
      this.f.percentageSecondary.value,
      this.f.fiscalCodePrimaryCreditor.value,
      this.f.fiscalCodeSecondaryCreditor.value,
      this.creditorList,
      true,
      true,
      '',
      [],
      denominationDefault
    );
    this.router
      .navigate([this.menuEnum.TRIBUTI_PATH + '/' + this.menuEnum.TRIBUTI_STEP2], {
        state: { data }
      })
      .catch(reason => reason);
  }

  prevStep(): void {
    this.router.navigate([this.menuEnum.HOME_PATH + '/' + this.menuEnum.TRIBUTI_STEP0]).catch(reason => reason);
  }

  get f(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  changedSecondaryCreditor(): void {
    if (this.f.fiscalCodeSecondaryCreditor.value) {
      this.enteService.getIbanByEnteCreditore(this.f.fiscalCodeSecondaryCreditor.value).subscribe(res => {
        this.enableIbanSecondary(res, '');
        this.f.ibanSecondary.setValue('');
      });
    }
  }

  isPercentageRangeValid(): boolean {
    return 0 <= this.f.percentageSecondary.value && this.f.percentageSecondary.value < 100;
  }

  toSelectedOptionsCreditor(response: Array<CreditorEntry>): Array<SelectOption> {
    const selectOptionList = new SelectOptionList();
    for (const elem of response) {
      const optionalCbill = elem.codiceInterbancario ? ' - ' + elem.codiceInterbancario : '';
      const text = elem.desAmm + ' (' + elem.codiceFiscale + optionalCbill + ')';
      const selectedOption = new SelectOption(text, elem.codiceFiscale);
      // eslint-disable-next-line functional/immutable-data
      selectOptionList.options.push(selectedOption);
    }
    return selectOptionList.options;
  }

  toSelectedOptionsIban(response: Array<Iban>): Array<SelectOption> {
    const selectOptionList = new SelectOptionList();
    for (const elem of response) {
      const selectedOption = new SelectOption(elem.iban, elem.iban);
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
