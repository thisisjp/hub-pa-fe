import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { ErrorService } from '../../../services/error.service';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass'],
  providers: [AuthService]
})
export class LogoutComponent {
  @Input() label = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private route: Router,
    private errorService: ErrorService
  ) {}

  logout(): void {
    this.authService.logout().subscribe(res => {
      if (res) {
        this.tokenService.removeToken();
        this.tokenService.setIsLogged(false);
        this.errorService.setError(new Message('', ''));
        void this.route.navigate(['']);
      }
    });
  }
}
