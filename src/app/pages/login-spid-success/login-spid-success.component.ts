import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { EnteService } from '../../services/ente.service';
import { CreditorEntry } from '../../models/creditor-entry';

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
      if (this.setParams(params)) {
        this.enteService.getEnteCreditoreByRefP(this.tokenService.getFiscalCodeREFP()).subscribe(res => {
          this.setFiscalCode(res);
        });
      }
    });
  }

  private setParams(params: ParamMap): boolean {
    const token = params.get('token');
    if (token) {
      this.tokenService.setToken(token);
      const fiscalCode = params.get('fiscalCode');
      if (fiscalCode) {
        this.tokenService.setFiscalCodeREFP(fiscalCode);
        return true;
      } else {
        // return false; // TODO scommentare
        this.tokenService.setFiscalCodeREFP('12345'); // TODO MOCKATO
        return true; // TODO MOCKATO
      }
    } else {
      return false;
    }
  }

  private setFiscalCode(res: CreditorEntry): void {
    if (res && res.codiceFiscale) {
      this.tokenService.setFiscalCode(res.codiceFiscale);
      this.enteService.getAllEcForTefa().subscribe(res2 => {
        this.setDesAmm(res2);
      });
    }
  }

  private setDesAmm(res2: Array<CreditorEntry>): void {
    if (res2 && res2.length > 0) {
      const desAmm = res2.filter(elem => elem.codiceFiscale === this.tokenService.getFiscalCode())[0].desAmm;
      if (desAmm) {
        this.tokenService.setDesAmm(desAmm);
        this.tokenService.setIsLogged(true);
        this.router.navigate(['/secure']).catch(reason => reason);
      }
    }
  }
}
