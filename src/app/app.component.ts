import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "./services/account.service";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private observer: BreakpointObserver,private router: Router, private accountService: AccountService) {
  }
  isLightTheme = true
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1100px)'])
      // .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      // .pipe(
      //   untilDestroyed(this),
      //   filter((e) => e instanceof NavigationEnd)
      // )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

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

