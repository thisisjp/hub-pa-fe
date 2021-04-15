import { CsvModel } from './csv-model';
import { Tribute } from './tribute';

export interface UploadCSVModel {
  csv?: CsvModel;
  tributeService?: Tribute;
}
