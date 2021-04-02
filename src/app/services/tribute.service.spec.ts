import { TestBed } from '@angular/core/testing';

import { TributeService } from './tribute.service';

describe('TributeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(TestBed.inject(TributeService)).toBeTruthy();
  });
});
