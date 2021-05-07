import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Support } from '../../models/support';
import { SupportService } from '../../services/support.service';

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
  selector: 'app-aiuto-page',
  templateUrl: './aiuto-page.component.html',
  styleUrls: ['./aiuto-page.component.sass']
})
export class AiutoPageComponent implements OnInit {
  typeContactValues = {
    CALL: 'CALL',
    TELEPHONE: 'TELEPHONE'
  };
  platformCallValues = {
    TEAMS: 'TEAMS',
    GOOGLE: 'GOOGLE',
    SKYPE: 'SKYPE'
  };
  formGroup: FormGroup = new FormGroup({});
  submitted = false;
  today = new Date();

  constructor(private formBuilder: FormBuilder, private supportService: SupportService) {}

  ngOnInit(): void {
    this.initBootstrapSelect();

    // eslint-disable-next-line functional/immutable-data
    this.formGroup = this.formBuilder.group({
      municipality: ['', [Validators.required]],
      region: ['', [Validators.required]],
      province: ['', [Validators.required, Validators.maxLength(2)]],
      certifiedmail: [
        '',
        [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ],
      telephoneMunicipality: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ],
      telephone: ['', [Validators.required]],
      typeContact: [this.typeContactValues.TELEPHONE, [Validators.required]],
      platformCall: [
        this.platformCallValues.TEAMS,
        [conditionalValidator(() => this.f.typeContact.value === this.typeContactValues.CALL, Validators.required)]
      ],
      dateRequest: ['', [Validators.required]],
      timeRequest: ['', [Validators.required]]
    });
  }

  get f(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
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

  invia(): void {
    // eslint-disable-next-line functional/immutable-data
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    const supportData: Support = {
      municipality: this.f.municipality.value,
      region: this.f.region.value,
      province: this.f.province.value,
      certifiedmail: this.f.certifiedmail.value,
      telephoneMunicipality: this.f.telephoneMunicipality.value,
      fullName: this.f.fullName.value,
      email: this.f.email.value,
      telephone: this.f.telephone.value,
      typeContact: this.f.typeContact.value,
      platformCall: this.f.typeContact.value === this.typeContactValues.CALL ? this.f.platformCall.value : '',
      dateRequest: this.f.dateRequest.value,
      timeRequest: this.f.timeRequest.value
    };
    this.supportService.send(supportData).subscribe(res => {
      if (res) {
        // console.log('ok');
      }
    });
  }

  isPlatformCallDisabled(): boolean {
    return this.f.typeContact.value !== this.typeContactValues.CALL;
  }
}
