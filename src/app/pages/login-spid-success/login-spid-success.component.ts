import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { EnteService } from '../../services/ente.service';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService,
    private enteService: EnteService
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    this.activatedRoute.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.tokenService.setToken(token);
        this.authService.getFiscalCodeByToken(this.tokenService.getToken()).subscribe(resTIR => {
          if (resTIR && resTIR.user.fiscal_number) {
            this.tokenService.setFiscalCodeREFP(resTIR.user.fiscal_number);
            this.enteService.getEnteCreditoreByRefP(this.tokenService.getFiscalCodeREFP()).subscribe(resCE => {
              if (resCE && resCE.codiceFiscale) {
                this.tokenService.setFiscalCode(resCE.codiceFiscale);
                this.enteService.getAllEcForTefa().subscribe(resCEA => {
                  if (resCEA && resCEA.length > 0) {
                    const desAmm = resCEA.filter(elem => elem.codiceFiscale === this.tokenService.getFiscalCode())[0]
                      .desAmm;
                    if (desAmm) {
                      this.tokenService.setDesAmm(desAmm);
                      this.tokenService.setIsLogged(true);
                      this.router.navigate(['/secure']).catch(reason => reason);
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  }
}
