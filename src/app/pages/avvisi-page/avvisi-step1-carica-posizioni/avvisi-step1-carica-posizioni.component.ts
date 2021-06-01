/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/models/base-response';
import { CsvRow } from 'src/app/models/csv-row';
import { Menu } from 'src/app/models/enums/menu.enum';
import { UploadCSVModel } from 'src/app/models/upload-csvmodel';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from '../../../services/token.service';
import { PaymentJob } from '../../../models/payment-job';
import { PaymentJobStatus } from '../../../models/enums/payment-job-status.enum';
import { UploadPaymentsService } from '../../../services/upload-payments.service';
import { ServiceManagementService } from '../../../services/service-management.service';
import { CsvModel } from '../../../models/csv-model';

@Component({
  selector: 'app-avvisi-step1',
  templateUrl: './avvisi-step1-carica-posizioni.component.html',
  styleUrls: ['./avvisi-step1-carica-posizioni.component.sass']
})
export class AvvisiStep1CaricaPosizioniComponent {
  private menuEnum = Menu;
  private statusEnum = PaymentJobStatus;

  private uploadModel = new UploadCSVModel();

  maxrows: number = environment.cvsMaxRows;
  rownumber = 0;
  field = '';
  maxlength = 0;

  REGEX_NATION = new RegExp('[A-Z]{2}');
  REGEX_EMAIL = new RegExp('[a-zA-Z0-9_.+\\-]+@[a-zA-Z0-9\\-]+(\\.[a-zA-Z0-9\\-]+)*');
  REGEX_AMOUNT = new RegExp('^[0-9]*$');

  @ViewChild('box') image1: any;

  @ViewChild('btnContentUpload') btnContentUpload: any;

  modalTitle = '';
  modalBody = '';

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    // eslint-disable-next-line functional/immutable-data
    this.image1.nativeElement.className = 'resize border border-secondary rounded box';
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    // eslint-disable-next-line functional/immutable-data
    this.image1.nativeElement.className = 'border border-secondary rounded box';
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    // eslint-disable-next-line functional/immutable-data
    this.image1.nativeElement.className = 'border border-secondary rounded box';
    event.stopPropagation();
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    this.load(file as File);
  }

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private uploadPaymentsService: UploadPaymentsService,
    private serviceManagementService: ServiceManagementService,
    private tokenService: TokenService
  ) {}

  nextStep(): void {
    this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.menuEnum.AVVISI_STEP2]).catch(reason => reason);
  }

  upload(e: any): void {
    const file = e.target.files[0];
    this.load(file);
    // eslint-disable-next-line functional/immutable-data
    e.target.value = null;
  }

  load(file: File): void {
    const reader = new FileReader();
    reader.readAsText(file);
    // eslint-disable-next-line functional/immutable-data
    this.uploadModel.csv = new CsvModel();
    // eslint-disable-next-line functional/immutable-data
    this.uploadModel.csv.fileName = file.name;
    if (!file.name.endsWith('.csv')) {
      this.openModalFileExtensionNotValid();
      return;
    }
    // eslint-disable-next-line functional/immutable-data
    reader.onload = () => {
      const csvData: string = reader.result as string;
      const csvRecordsArray = csvData.split(/\r\n|\n/);
      this.parse(csvRecordsArray);
    };
  }

  parse(csvRecordsArray: Array<string>): void {
    if (csvRecordsArray.length > this.maxrows + 1) {
      this.openModalMaxRow();
      return;
    } else if (csvRecordsArray.length < 2) {
      this.openModalMinRow();
      return;
    }

    // eslint-disable-next-line functional/no-let
    for (let i = 1; i < csvRecordsArray.length; i++) {
      // eslint-disable-next-line functional/immutable-data
      this.rownumber = i;
      if (csvRecordsArray[i].length > 0) {
        const record = csvRecordsArray[i].split(';');
        if (record.length !== 15) {
          this.openModalFileNotValid();
          return;
        }
        // check codicefiscale/piva
        // eslint-disable-next-line functional/immutable-data
        this.field = 'CodiceFiscale/P.IVA';
        if (record[0].length === 0) {
          this.openModalObbligatorio();
          return;
        }

        // check pagatore
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Tipo Pagatore';
        if (record[1].length === 0) {
          this.openModalObbligatorio();
          return;
        }

        if (record[1].length > 1) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 1;
          this.openModalLengthMax();
          return;
        }

        if (record[1] !== 'F' && record[1] !== 'G') {
          this.openModalFormatNotValid();
          return;
        }

        // check nome
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Nome';
        if (record[2].length === 0) {
          this.openModalObbligatorio();
          return;
        }

        // check cognome
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Cognome';
        if (record[3].length === 0) {
          this.openModalObbligatorio();
          return;
        }

        // eslint-disable-next-line functional/immutable-data
        this.field = 'Nome e Cognome';
        if (record[2].length + record[3].length > 70) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 70;
          this.openModalLengthMax();
          return;
        }

        // check indirizzo
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Indirizzo';
        if (record[4].length === 0) {
          this.openModalObbligatorio();
          return;
        }
        if (record[4].length > 70) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 70;
          this.openModalLengthMax();
          return;
        }

        // check civico
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Civico';
        if (record[5].length === 0) {
          this.openModalObbligatorio();
          return;
        }
        if (record[5].length > 16) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 16;
          this.openModalLengthMax();
          return;
        }

        // check località
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Localita';
        if (record[6].length === 0) {
          this.openModalObbligatorio();
          return;
        }
        if (record[6].length > 35) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 35;
          this.openModalLengthMax();
          return;
        }

        // check provincia
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Provincia';
        if (record[7].length === 0) {
          this.openModalObbligatorio();
          return;
        }
        if (record[7].length > 35) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 35;
          this.openModalLengthMax();
          return;
        }

        // check cap
        // eslint-disable-next-line functional/immutable-data
        this.field = 'CAP';
        if (record[8].length === 0) {
          this.openModalObbligatorio();
          return;
        }
        if (record[8].length > 16) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 16;
          this.openModalLengthMax();
          return;
        }

        // check nazione
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Nazione';
        if (record[9].length === 0) {
          this.openModalObbligatorio();
          return;
        }
        if (record[9].length > 2) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 2;
          this.openModalLengthMax();
          return;
        }

        if (!this.REGEX_NATION.test(record[9])) {
          this.openModalFormatNotValid();
          return;
        }

        // check riga indirizzo
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Indirizzo Civico Localita Provincia CAP Nazione';
        if (
          record[4].length +
            record[5].length +
            record[6].length +
            record[7].length +
            record[8].length +
            record[9].length >
          80
        ) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 80;
          this.openModalLengthMax();
          return;
        }

        // check email
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Email';
        if (record[10].length === 0) {
          this.openModalObbligatorio();
          return;
        }

        if (record[10].length > 256) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 256;
          this.openModalLengthMax();
          return;
        }

        if (!this.REGEX_EMAIL.test(record[10])) {
          this.openModalFormatNotValid();
          return;
        }

        // check telefono
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Telefono';
        if (record[11].length === 0) {
          this.openModalObbligatorio();
          return;
        }
        if (record[11].length > 19) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 19;
          this.openModalLengthMax();
          return;
        }

        // check idtenanat
        // eslint-disable-next-line functional/immutable-data
        this.field = 'ID Tenant';
        if (record[12].length > 50) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 50;
          this.openModalLengthMax();
          return;
        }

        // check importo
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Importo';
        if (record[13].length === 0) {
          this.openModalObbligatorio();
          return;
        }

        if (record[13].length > 12) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 12;
          this.openModalLengthMax();
          return;
        }

        if (!this.REGEX_AMOUNT.test(record[13])) {
          this.openModalFormatNotValid();
          return;
        }

        // check causale
        // eslint-disable-next-line functional/immutable-data
        this.field = 'Causale';
        if (record[14].length === 0) {
          this.openModalObbligatorio();
          return;
        }
        if (record[14].length > 60) {
          // eslint-disable-next-line functional/immutable-data
          this.maxlength = 60;
          this.openModalLengthMax();
          return;
        }

        // eslint-disable-next-line functional/immutable-data
        this.field = 'CodiceFiscale/P.IVA';
        if (record[1] === 'F' && !this.checkcodicefiscale(record[0])) {
          this.openModalFormatNotValid();
          return;
        }

        if (record[1] === 'G' && !this.checkpiva(record[0])) {
          this.openModalFormatNotValid();
          return;
        }

        const row: CsvRow = {
          fiscalCode: record[0],
          type: record[1] === 'F' ? 1 : 0,
          name: record[2],
          surname: record[3],
          address: record[4],
          number: record[5],
          area: record[6],
          province: record[7],
          cap: record[8],
          country: record[9],
          email: record[10],
          phone: record[11],
          idTenant: record[12],
          amount: Number(record[13]) / 100,
          reason: record[14]
        };

        // eslint-disable-next-line functional/immutable-data
        this.uploadModel.csv.rows.push(row);
      }
    }

    // eslint-disable-next-line functional/immutable-data
    this.uploadModel.fiscalCodeCreditor = this.tokenService.getFiscalCode();
    this.caricaCSV();
  }

  // eslint-disable-next-line complexity
  checkcodicefiscale(codfiscale: string): boolean {
    const cf = codfiscale.toUpperCase().trim();

    if (cf.length !== 16) {
      return false;
    }

    // eslint-disable-next-line functional/no-let
    for (let i = 0; i < 6; i++) {
      if (cf.charAt(i) < 'A' || cf.charAt(i) > 'Z') {
        return false;
      }
    }
    const year = this.getYear(cf.substring(6, 8));
    if (year === undefined) {
      return false;
    }
    const month = this.getMonth(cf.charAt(8));
    if (month === undefined) {
      return false;
    }
    const dd = cf.substring(9, 11);
    const cifra1 = this.getDigitPerOmonimia(dd.charAt(0));
    const cifra2 = this.getDigitPerOmonimia(dd.charAt(1));
    if (cifra1 === undefined || cifra2 === undefined) {
      return false;
    }

    // eslint-disable-next-line functional/no-let
    let day: number = Number(String(cifra1) + String(cifra2));
    if (day > 40) {
      day = day - 40;
    }

    const date = new Date(year, month - 1, day);
    if (day !== date.getDate()) {
      return false;
    }

    if (cf.charAt(11) < 'A' || cf.charAt(11) > 'Z') {
      return false;
    }
    if (cf.charAt(12) < '0' || cf.charAt(12) > '9') {
      return false;
    }
    if (cf.charAt(13) < '0' || cf.charAt(13) > '9') {
      return false;
    }
    if (cf.charAt(14) < '0' || cf.charAt(14) > '9') {
      return false;
    }
    return !(cf.charAt(15) < 'A' || cf.charAt(15) > 'Z');
  }

  getYear(yy: string): number | undefined {
    if (yy === null || yy.length !== 2) {
      return;
    } else {
      const cifra1 = this.getDigitPerOmonimia(yy.charAt(0));
      const cifra2 = this.getDigitPerOmonimia(yy.charAt(1));
      if (cifra1 === undefined || cifra2 === undefined) {
        return;
      }
      const result = String(cifra1) + String(cifra2);
      const now = new Date();

      const year = now.getFullYear();
      const yearSup = String(year).substr(0, 2);
      const yearInf = String(year).substr(2, 4);
      if (Number(result) < Number(yearInf)) {
        return Number(yearSup + result);
      } else {
        return Number(yearSup + result) - 100;
      }
    }
  }

  getMonth(character: string): undefined | number {
    switch (character) {
      case 'A':
        return 1;
      case 'B':
        return 2;
      case 'C':
        return 3;
      case 'D':
        return 4;
      case 'E':
        return 5;
      case 'H':
        return 6;
      case 'L':
        return 7;
      case 'M':
        return 8;
      case 'P':
        return 9;
      case 'R':
        return 10;
      case 'S':
        return 11;
      case 'T':
        return 12;
    }
    return undefined;
  }

  getDigitPerOmonimia(character: string): number | undefined {
    const map: Map<string, number> = new Map();
    map.set('L', 0);
    map.set('M', 1);
    map.set('N', 2);
    map.set('P', 3);
    map.set('Q', 4);
    map.set('R', 5);
    map.set('S', 6);
    map.set('T', 7);
    map.set('U', 8);
    map.set('V', 9);
    if (character >= '0' && character <= '9') {
      return Number(character);
    } else {
      if (map.has(character)) {
        return map.get(character) as number;
      } else {
        return;
      }
    }
  }

  checkpiva(piva: string): boolean {
    // eslint-disable-next-line functional/no-let
    let c = 0;
    // eslint-disable-next-line functional/no-let
    let s = 0;
    if (piva.length === 0) {
      return false;
    }
    if (piva.length !== 11) {
      return false;
    }
    // eslint-disable-next-line functional/no-let
    for (let i = 0; i < 11; i++) {
      if (piva.charAt(i) < '0' || piva.charAt(i) > '9') {
        return false;
      }
    }
    // eslint-disable-next-line functional/no-let
    for (let i = 0; i <= 9; i += 2) {
      s += Number(piva.charAt(i));
    }
    // eslint-disable-next-line functional/no-let
    for (let i = 1; i <= 9; i += 2) {
      c = 2 * Number(piva.charAt(i));
      if (c > 9) {
        c = c - 9;
      }
      s += c;
    }
    return (10 - (s % 10)) % 10 === Number(piva.charAt(10));
  }

  caricaCSV(): void {
    this.uploadPaymentsService.upload(this.uploadModel).subscribe((res: BaseResponse) => {
      if (res.result) {
        this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.menuEnum.AVVISI_STEP2]).catch(reason => reason);
      }
    });
  }

  openModalMaxRow(): void {
    // eslint-disable-next-line functional/immutable-data
    this.modalTitle = this.translateService.instant('ALERT_TITLE_MAX_ROWS');
    // eslint-disable-next-line functional/immutable-data
    this.modalBody =
      String(this.translateService.instant('ALERT_MAX_ROWS1')) +
      String(this.maxrows) +
      String(this.translateService.instant('ALERT_MAX_ROWS2'));
    this.openModalAndCreateJobRecord();
  }

  openModalMinRow(): void {
    // eslint-disable-next-line functional/immutable-data
    this.modalTitle = this.translateService.instant('ALERT_TITLE_MIN_ROWS');
    // eslint-disable-next-line functional/immutable-data
    this.modalBody = this.translateService.instant('ALERT_MIN_ROWS');
    this.openModalAndCreateJobRecord();
  }

  openModalObbligatorio(): void {
    // eslint-disable-next-line functional/immutable-data
    this.modalTitle = String(this.translateService.instant('ALERT_GENERIC')) + String(this.rownumber);
    // eslint-disable-next-line functional/immutable-data
    this.modalBody =
      String(this.translateService.instant('FIELD')) +
      String(this.field) +
      String(this.translateService.instant('OBBLIGATORIO'));
    this.openModalAndCreateJobRecord();
  }

  openModalLengthMax(): void {
    // eslint-disable-next-line functional/immutable-data
    this.modalTitle = String(this.translateService.instant('ALERT_GENERIC')) + String(this.rownumber);
    // eslint-disable-next-line functional/immutable-data
    this.modalBody =
      String(this.translateService.instant('FIELD')) +
      String(this.field) +
      String(this.translateService.instant('MAX_LENGTH')) +
      String(this.maxlength) +
      '.';
    this.openModalAndCreateJobRecord();
  }

  openModalFormatNotValid(): void {
    // eslint-disable-next-line functional/immutable-data
    this.modalTitle = String(this.translateService.instant('ALERT_GENERIC')) + String(this.rownumber);
    // eslint-disable-next-line functional/immutable-data
    this.modalBody =
      String(this.translateService.instant('FIELD')) +
      String(this.field) +
      String(this.translateService.instant('NOT_VALID_FORM'));
    this.openModalAndCreateJobRecord();
  }

  openModalFileNotValid(): void {
    // eslint-disable-next-line functional/immutable-data
    this.modalTitle = String(this.translateService.instant('ALERT_GENERIC')) + String(this.rownumber);
    // eslint-disable-next-line functional/immutable-data
    this.modalBody = String(this.translateService.instant('FILE_NOT_VALID'));
    this.openModalAndCreateJobRecord();
  }

  openModalFileExtensionNotValid(): void {
    // eslint-disable-next-line functional/immutable-data
    this.modalTitle = String(this.translateService.instant('ALERT_TITLE_EXTENSION'));
    // eslint-disable-next-line functional/immutable-data
    this.modalBody = String(this.translateService.instant('ALERT_EXTENSION'));
    this.openModalAndCreateJobRecord();
  }

  openModalAndCreateJobRecord(): void {
    this.btnContentUpload.nativeElement.click();
    this.createJobRecord();
  }

  createJobRecord(): void {
    const model: PaymentJob = {
      status: this.statusEnum.FALLITO,
      fiscalCode: this.tokenService.getFiscalCode(),
      fileName: this.uploadModel.csv.fileName,
      insertDate: new Date().toISOString()
    };
    this.uploadPaymentsService.createJobRecord(model).subscribe();
  }

  downloadCsvTemplate(): void {
    this.uploadPaymentsService.downloadCsvTemplate();
  }
}
