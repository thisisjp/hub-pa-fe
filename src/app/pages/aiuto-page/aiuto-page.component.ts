import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Support } from '../../models/support';
import { SupportService } from '../../services/support.service';
import { TokenService } from '../../services/token.service';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment';

declare const $: any;

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
  maxDate = environment.maxDate;

  constructor(
    private formBuilder: FormBuilder,
    private supportService: SupportService,
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initBootstrapSelect();

    // eslint-disable-next-line functional/immutable-data
    this.formGroup = this.formBuilder.group({
      municipality: ['', [Validators.required]],
      region: ['', [Validators.required]],
      province: ['', [Validators.required, Validators.maxLength(2)]],
      certifiedMail: [
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
      contact: [this.typeContactValues.TELEPHONE, [Validators.required]],
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
      fiscalCodeRp: this.tokenService.getFiscalCodeREFP(),
      municipality: this.f.municipality.value,
      region: this.f.region.value,
      province: this.f.province.value,
      certifiedMail: this.f.certifiedMail.value,
      telephoneMunicipality: this.f.telephoneMunicipality.value,
      fullName: this.f.fullName.value,
      email: this.f.email.value,
      telephone: this.f.telephone.value,
      typeContact:
        this.f.contact.value === this.typeContactValues.TELEPHONE
          ? this.typeContactValues.TELEPHONE
          : this.typeContactValues.CALL,
      platformCall: this.f.contact.value === this.typeContactValues.TELEPHONE ? '' : this.f.contact.value,
      dateRequest: this.f.dateRequest.value,
      timeRequest: this.f.timeRequest.value
    };
    this.supportService.send(supportData).subscribe(res => {
      if (res && res.result) {
        this.notificationService.showNotification({
          title: 'Richiesta inviata',
          message: 'La tua richiesta di supporto è stata inviata',
          isError: false
        });
      } else {
        this.notificationService.showNotification({
          title: 'Attenzione',
          message: 'Si è verificato un errore',
          isError: true
        });
      }
    });
  }
}
