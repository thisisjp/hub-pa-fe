import { TestBed } from '@angular/core/testing';

import { PaymentJobService } from './payment-job.service';

describe('PaymentJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(TestBed.inject(PaymentJobService)).toBeTruthy();
  });
});
