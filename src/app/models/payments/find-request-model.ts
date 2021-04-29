import { FilterModel } from './filter-model';

export class FindRequestModel {
  filters: FilterModel;
  fiscalCode: string;
  size: number;
  page: number;

  constructor(filters: FilterModel, fiscalCode: string, size: number, page: number) {
    this.filters = filters;
    this.fiscalCode = fiscalCode;
    this.size = size;
    this.page = page;
  }
}
