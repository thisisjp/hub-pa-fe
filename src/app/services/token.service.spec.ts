import { TestBed } from '@angular/core/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import { TokenService } from './token.service';

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxLocalStorageModule.forRoot()]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(TokenService)).toBeTruthy();
  });
});
