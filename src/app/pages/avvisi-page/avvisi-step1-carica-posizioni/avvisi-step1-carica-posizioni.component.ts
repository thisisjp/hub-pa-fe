import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AvvisiStep } from 'src/app/models/avvisi-step';
import { BaseResponse } from 'src/app/models/base-response';
import { CsvRow } from 'src/app/models/csv-row';
import { Menu } from 'src/app/models/menu.enum';
import { UploadCSVModel } from 'src/app/models/upload-csv-model';
import { LoaderService } from 'src/app/services/loader.service';
import { TributeService } from 'src/app/services/tribute.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avvisi-step1',
  templateUrl: './avvisi-step1-carica-posizioni.component.html',
  styleUrls: ['./avvisi-step1-carica-posizioni.component.sass']
})
export class AvvisiStep1CaricaPosizioniComponent implements OnInit {
  private menuEnum = Menu;
  private avvisiStepEnum = AvvisiStep;

  private modelJson: CsvRow[] = [];

  private uploadModel: UploadCSVModel = {};

  maxrows: number = environment.cvsMaxRows;
  rownumber: number = 0;
  field: string = '';

  REGEX_NATION = new RegExp('[A-Z]{2,2}');
  REGEX_EMAIL = new RegExp('[a-zA-Z0-9_\\.\\+\\-]+@[a-zA-Z0-9\\-]+(\\.[a-zA-Z0-9\\-]+)*');
  REGEX_DATI_SPECIFICI_RISCOSSIONE = new RegExp('[0129]{1}/\\S{3,138}');
  REGEX_AMOUNT = new RegExp('^[0-9]*$');

  @ViewChild('btncontent1') btnmodal1: any;
  @ViewChild('btncontent2') btnmodal2: any;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    console.log('A');
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    console.log('B');
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    console.log('E');
    event.stopPropagation();
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    this.parse(file as File);
  }

  constructor(
    private router: Router,
    private loadingService: LoaderService,
    private uploadService: UploadService,
    private tributeService: TributeService
  ) {}

  ngOnInit(): void {}

  // ngAfterViewInit() {
  //   this.el1.nativeElement.addEventListener('dragenter', console.log('llllllllllllllll'));
  // }
  nextStep() {
    console.log('aaaaaaaaaaaaaaa');
    this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.avvisiStepEnum.STEP2]).catch(reason => reason);
  }

  upload(e: any) {
    console.log('upload');
    const file = e.target.files[0];
    this.parse(file);
  }

  parse(file: File) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData: string = reader.result as string;
      const csvRecordsArray = csvData.split(/\r\n|\n/);

      if (csvRecordsArray.length > this.maxrows + 1) {
        this.openModalMaxRow();
        return;
      }

      for (let i = 1; i < csvRecordsArray.length; i++) {
        this.rownumber = i;
        if (csvRecordsArray[i].length > 0) {
          const record = csvRecordsArray[i].split(';');
          if (record.length < 16) {
            this.openModalGeneric();
            return;
          }
          // check codicefiscale/piva
          this.field = 'CodiceFiscale/P.IVA';
          if (record[0].length == 0 || record[0].length > 35) {
            this.openModalGeneric();
            return;
          }

          //check pagatore
          this.field = 'Tipo Pagatore';
          if (record[1].length != 1) {
            this.openModalGeneric();
            return;
          }
          if (record[1] != 'F' && record[1] != 'G') {
            this.openModalGeneric();
            return;
          }

          //check nome
          this.field = 'Nome';
          if (record[2].length == 0) {
            this.openModalGeneric();
            return;
          }

          //check cognome
          this.field = 'Cognome';
          if (record[3].length == 0) {
            this.openModalGeneric();
            return;
          }

          this.field = 'Nome/Cognome';
          if (record[2].length + record[3].length > 70) {
            this.openModalGeneric();
            return;
          }

          //check indirizzo
          this.field = 'Indirizzo';
          if (record[4].length == 0) {
            this.openModalGeneric();
            return;
          }
          if (record[4].length > 70) {
            this.openModalGeneric();
            return;
          }

          //check civico
          this.field = 'Civico';
          if (record[5].length == 0) {
            this.openModalGeneric();
            return;
          }
          if (record[5].length > 16) {
            this.openModalGeneric();
            return;
          }

          //check località
          this.field = 'Localita';
          if (record[6].length == 0) {
            this.openModalGeneric();
            return;
          }
          if (record[6].length > 35) {
            this.openModalGeneric();
            return;
          }

          //check provincia
          this.field = 'Provincia';
          if (record[7].length == 0) {
            this.openModalGeneric();
            return;
          }
          if (record[7].length > 35) {
            this.openModalGeneric();
            return;
          }

          //check cap
          this.field = 'CAP';
          if (record[8].length == 0) {
            this.openModalGeneric();
            return;
          }
          if (record[8].length > 16) {
            this.openModalGeneric();
            return;
          }

          //check nazione
          this.field = 'Nazione';
          if (record[9].length != 2) {
            this.openModalGeneric();
            return;
          }

          if (!this.REGEX_NATION.test(record[9])) {
            this.openModalGeneric();
            return;
          }

          //check email
          this.field = 'Email';
          if (record[10].length == 0 || record[10].length > 256) {
            this.openModalGeneric();
            return;
          }

          if (!this.REGEX_EMAIL.test(record[10])) {
            this.openModalGeneric();
            return;
          }

          //check telefono
          this.field = 'Telefono';
          if (record[11].length == 0 || record[11].length > 19) {
            this.openModalGeneric();
            return;
          }

          //check idtenanat
          this.field = 'ID Tenant';
          if (record[12].length > 50) {
            this.openModalGeneric();
            return;
          }

          //check importo
          this.field = 'Importo';
          if (record[13].length == 0 || record[13].length > 12) {
            this.openModalGeneric();
            return;
          }

          if (!this.REGEX_AMOUNT.test(record[13])) {
            this.openModalGeneric();
            return;
          }

          //check causale
          this.field = 'Causale';
          if (record[14].length == 0 || record[14].length > 60) {
            this.openModalGeneric();
            return;
          }

          //check riscossione
          this.field = 'Dati Specifici Riscossione';
          if (record[15].length < 3 && record[15].length > 140) {
            this.openModalGeneric();
            return;
          }

          if (!this.REGEX_DATI_SPECIFICI_RISCOSSIONE.test(record[15])) {
            this.openModalGeneric();
            return;
          }

          this.field = 'CodiceFiscale/P.IVA';
          if (record[1] == 'F' && !this.checkcodicefiscale(record[0])) {
            this.openModalGeneric();
            return;
          }

          if (record[1] == 'G' && !this.checkpiva(record[0])) {
            this.openModalGeneric();
            return;
          }

          const row: CsvRow = {};
          row.fiscalCode = record[0];
          row.type = record[1] == 'F' ? 1 : 0;
          row.name = record[2];
          row.surname = record[3];
          row.address = record[4];
          row.number = record[5];
          row.area = record[6];
          row.province = record[7];
          row.cap = record[8];
          row.country = record[9];
          row.email = record[10];
          row.phone = record[11];
          row.idTenant = record[12];
          row.amount = Number(record[13]) / 100;
          row.reason = record[14];
          row.taxonomy = record[15];
          this.modelJson.push(row);
        }
      }

      console.log(this.modelJson);
      const tribute = this.tributeService.getService('');
      this.uploadModel.tributeService = tribute;
    };
  }

  openModalMaxRow() {
    this.btnmodal1.nativeElement.click();
  }

  openModalGeneric() {
    this.btnmodal2.nativeElement.click();
  }

  checkcodicefiscale(cf: string): boolean {
    cf = cf.toUpperCase().trim();

    if (cf.length != 16) return false;

    for (let i = 0; i < 6; i++) {
      if (cf.charAt(i) < 'A' || cf.charAt(i) > 'Z') {
        return false;
      }
    }
    let year = this.getYear(cf.substring(6, 8));
    if (year == undefined) {
      return false;
    }
    let month = this.getMonth(cf.charAt(8));
    if (month == undefined) {
      return false;
    }
    let dd = cf.substring(9, 11);
    let cifra1 = this.getDigitPerOmonimia(dd.charAt(0));
    let cifra2 = this.getDigitPerOmonimia(dd.charAt(1));
    if (cifra1 == undefined || cifra2 == undefined) {
      return false;
    }
    let day: number = Number(String(cifra1) + String(cifra2));
    if (day > 40) {
      day = day - 30;
    }
    let date = new Date(year, month, day);

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
    if (cf.charAt(15) < 'A' || cf.charAt(15) > 'Z') {
      return false;
    }

    return true;
  }

  getYear(yy: string) {
    if (yy == null || yy.length != 2) {
      return;
    } else {
      let cifra1 = this.getDigitPerOmonimia(yy.charAt(0));
      let cifra2 = this.getDigitPerOmonimia(yy.charAt(1));
      if (cifra1 == undefined || cifra2 == undefined) {
        return;
      }
      let result = String(cifra1) + String(cifra2);
      let now = new Date();

      let year = now.getFullYear();
      let year_sup = String(year).substr(0, 2);
      let year_inf = String(year).substr(2, 4);
      if (Number(result) < Number(year_inf)) {
        return Number(year_sup + result);
      } else {
        return Number(year_sup + result) - 100;
      }
    }
  }

  getMonth(character: string) {
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
    return;
  }

  getDigitPerOmonimia(character: string) {
    let map: Map<string, number> = new Map();
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
    let i: number = 0;
    let c: number = 0;
    let s: number = 0;
    if (piva.length == 0) return false;
    if (piva.length != 11) return false;
    for (let i = 0; i < 11; i++) {
      if (piva.charAt(i) < '0' || piva.charAt(i) > '9') return false;
    }
    for (let i = 0; i <= 9; i += 2) s += Number(piva.charAt(i));
    for (let i = 1; i <= 9; i += 2) {
      c = 2 * Number(piva.charAt(i));
      if (c > 9) c = c - 9;
      s += c;
    }
    if ((10 - (s % 10)) % 10 != Number(piva.charAt(10))) return false;
    return true;
  }

  caricaCSV() {
    this.loadingService.startRequest();
    this.uploadService.uploadCSV(this.uploadModel).subscribe((res: BaseResponse) => {
      this.loadingService.endRequest();
      if (res.result) {
        this.router.navigate([this.menuEnum.AVVISI_PATH + '/' + this.avvisiStepEnum.STEP2]).catch(reason => reason);
      }
    });
  }
}
