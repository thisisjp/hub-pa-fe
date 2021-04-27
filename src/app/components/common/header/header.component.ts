import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../../../services/error.service';
import { Message } from '../../../models/message';
import { TokenService } from '../../../services/token.service';
import { Menu } from '../../../models/enums/menu.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  menuEnum = Menu;

  constructor(private router: Router, private errorService: ErrorService, public tokenService: TokenService) {}

  goToPage(path: string): void {
    if (!this.isPathActive(path)) {
      this.router.navigate([path]).catch(reason => reason);
    }
  }

  logout(): void {
    this.tokenService.setIsLogged(false);
    this.errorService.setError(new Message('', ''));
    this.router.navigate(['']).catch(reason => reason);
  }

  canShowSecureComponents(): boolean {
    return location.href.indexOf('secure') >= 1;
  }

  isPathActive(path: string): boolean {
    return location.href.indexOf(path) >= 1;
  }
}
