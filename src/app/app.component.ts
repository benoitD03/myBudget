import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "./services/account.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private accountService: AccountService) {
  }
  isLightTheme = true

  /**
   * Methode pour changer de thème
   */
  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme? 'light' : 'dark'
    );
  }

  onClickLogout() {
    this.accountService.logout();
  }

  /**
   * Methode pour voir si la page affiché est la page de connexion
   */
  isLoginPage(): boolean {
    return this.router.url === '/login'
  }
}
