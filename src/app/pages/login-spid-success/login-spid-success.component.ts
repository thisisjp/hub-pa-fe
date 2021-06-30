import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { EnteService } from '../../services/ente.service';
import { AuthService } from '../../services/auth.service';
import { CreditorEntry } from '../../models/creditor-entry';

@Component({
  selector: 'app-login-spid-success',
  templateUrl: './login-spid-success.component.html',
  styleUrls: ['./login-spid-success.component.sass']
})
export class LoginSpidSuccessComponent implements OnInit {
  @ViewChild('modalPrivacy') modalPrivacy: any;
  canCreatePrivacy = false;
  togglePrivacy = false;

  canSelectCreditors = false;
  selectedCreditor = '';
  creditors: Array<CreditorEntry> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private authService: AuthService,
    private enteService: EnteService
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        const urlParams = new URLSearchParams(fragment);
        const token = urlParams.get('token');
        if (token) {
          this.tokenService.setToken(token);
          this.authService.getFiscalCodeByToken(this.tokenService.getToken()).subscribe(resTIR => {
            if (resTIR && resTIR.user.fiscal_number) {
              this.tokenService.setFiscalCodeREFP(resTIR.user.fiscal_number);
              this.enteService.checkPrivacyByRefP(this.tokenService.getFiscalCodeREFP()).subscribe(resBR1 => {
                if (resBR1 && resBR1.result) {
                  this.privacyCallback();
                } else {
                  // eslint-disable-next-line functional/immutable-data
                  this.canCreatePrivacy = true;
                }
              });
            }
          });
        }
      }
    });
  }

  createPrivacy(): void {
    this.enteService.createPrivacy(this.tokenService.getFiscalCodeREFP()).subscribe(resBR2 => {
      if (resBR2 && resBR2.result) {
        this.privacyCallback();
      }
    });
  }

  privacyCallback(): void {
    this.enteService.getEnteCreditoreByRefP(this.tokenService.getFiscalCodeREFP()).subscribe(resCE => {
      if (resCE && resCE.codiceFiscale && resCE.denominazioneEnte) {
        this.tokenService.setFiscalCode(resCE.codiceFiscale);
        this.tokenService.setDesAmm(resCE.denominazioneEnte);
        this.tokenService.setCodiceInterbancario(resCE.codiceInterbancario);
        this.tokenService.setIsLogged(true);
        this.router.navigate(['/secure']).catch(reason => reason);
      }
    });
  }

  openModal(): void {
    this.modalPrivacy.nativeElement.click();
  }

  getButtonClass(): string {
    if (this.togglePrivacy) {
      return 'btn-outline-primary';
    } else {
      return 'btn-primary disabled';
    }
  }

  getButtonCreditorsClass(): string {
    if (this.selectedCreditor) {
      return 'btn-outline-primary';
    } else {
      return 'btn-primary disabled';
    }
  }

  selectCreditor(): void {
    this.tokenService.setFiscalCode(this.selectedCreditor);
    const desAmm = this.creditors.filter(elem => elem.codiceFiscale === this.tokenService.getFiscalCode())[0].desAmm;
    this.tokenService.setDesAmm(desAmm);
    this.tokenService.setIsLogged(true);
    this.router.navigate(['/secure']).catch(reason => reason);
  }
}
