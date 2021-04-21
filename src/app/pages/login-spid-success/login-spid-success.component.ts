import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { EnteService } from '../../services/ente.service';

@Component({
  selector: 'app-login-spid-success',
  templateUrl: './login-spid-success.component.html',
  styleUrls: ['./login-spid-success.component.sass']
})
export class LoginSpidSuccessComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private enteService: EnteService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.tokenService.setToken(token);
      }
      const fiscalCode = params.get('fiscalCode');
      if (fiscalCode) {
        this.tokenService.setFiscalCodeREFP(fiscalCode);
      } else {
        this.tokenService.setFiscalCodeREFP('12345'); // TODO MOCKATO
      }
      this.enteService.getEnteCreditoreByRefP(this.tokenService.getFiscalCodeREFP()).subscribe(res => {
        if (res) {
          this.tokenService.setFiscalCode(res.codiceFiscale);
        } else {
          this.tokenService.setFiscalCode('82001760675'); // TODO MOCKATO
        }
        this.tokenService.setIsLogged(true);
        this.router.navigate(['/secure']).catch(reason => reason);
      });
    });
  }
}
