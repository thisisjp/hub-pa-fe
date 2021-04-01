import { TributeService } from './tribute-service';

describe('TributeService', () => {
  it('should create an instance', () => {
    expect(new TributeService('', '', '', '', 0, '', [], '')).toBeTruthy();
  });
});
