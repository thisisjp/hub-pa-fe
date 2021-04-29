import { PaymentMinimalModel } from './payments/payment-minimal-model';

describe('Position', () => {
  it('should create an instance', () => {
    expect(new PaymentMinimalModel()).toBeTruthy();
  });
});
