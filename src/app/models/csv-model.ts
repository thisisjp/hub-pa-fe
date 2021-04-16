import { CsvRow } from './csv-row';

export interface CsvModel {
  fileName: string;
  rows: Array<CsvRow>;
}
