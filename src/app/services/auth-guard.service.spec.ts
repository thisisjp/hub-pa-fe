import { TestBed } from '@angular/core/testing';
import { LocalStorageService, NgxLocalStorageModule } from 'ngx-localstorage';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxLocalStorageModule.forRoot()],
      providers: [AuthGuardService]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
