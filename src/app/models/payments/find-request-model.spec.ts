import { FilterModel } from './filter-model';
import { FindRequestModel } from './find-request-model';

describe('FindRequestModel', () => {
  it('should create an instance', () => {
    expect(new FindRequestModel(new FilterModel(), '', 1, 1)).toBeTruthy();
  });
});
