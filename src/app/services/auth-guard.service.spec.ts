import { TestBed } from '@angular/core/testing';
import { NgxLocalStorageModule } from 'ngx-localstorage';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxLocalStorageModule.forRoot()],
      providers: [AuthGuardService]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(AuthGuardService)).toBeTruthy();
  });
});
