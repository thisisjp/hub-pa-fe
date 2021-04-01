import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../../../services/error.service';
import { Message } from '../../../models/message';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { Menu } from '../../../models/menu.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [AuthService]
})
export class HeaderComponent {
  menuEnum = Menu;

  constructor(
    private router: Router,
    private errorService: ErrorService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  goToPage(path: string): void {
    void this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout().subscribe(res => {
      if (res) {
        this.tokenService.removeToken();
        this.tokenService.setIsLogged(false);
        this.errorService.setError(new Message('', ''));
        void this.router.navigate(['']);
      }
    });
  }

  canShowSecureComponents(): boolean {
    return location.href.indexOf('secure') >= 1;
  }

  isPathActive(path: string): boolean {
    return location.href.indexOf(path) >= 1;
  }
}
