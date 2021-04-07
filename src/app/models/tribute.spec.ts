import { Tribute } from './tribute';

describe('Tribute', () => {
  it('should create an instance', () => {
    expect(new Tribute('', '', '', '', 0, [], true, true, '', [], '')).toBeTruthy();
  });
});
