import { FindRequestModel } from './find-request-model';
import { FilterModel } from './filter-model';

describe('FindRequestModel', () => {
  it('should create an instance', () => {
    expect(new FindRequestModel(new FilterModel(), '', 1, 1)).toBeTruthy();
  });
});
