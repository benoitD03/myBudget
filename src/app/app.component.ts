import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {AccountService} from "./services/account.service";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  constructor(private observer: BreakpointObserver,private router: Router, public accountService: AccountService, private cdRef: ChangeDetectorRef) {
  }
  userName: string | null = '';
  isLightTheme = true
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isUserAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit() {
    this.userName = this.accountService.getUserName();

    const storedTheme = localStorage.getItem('theme');

    document.body.setAttribute('data-theme', storedTheme || 'light');

    this.isLightTheme = storedTheme === 'light';

  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const navigation = this.router.getCurrentNavigation();
        const loginSuccess = navigation?.extras?.state?.['loginSuccess']; // On récupère la valeur de loginSuccess depuis le state de la navigation definie dans le login.component.ts
        if (loginSuccess) {
          this.cdRef.detectChanges(); // Si on ne force pas la datection des changements, le sidenav ne s'ouvre pas
          this.adjustSidenavMode();
        }
      }
    });
  }

  private adjustSidenavMode() {
    if (this.sidenav) {
      this.observer
        .observe(['(max-width: 1100px)'])
        .subscribe((res) => {
          if (this.sidenav && this.sidenav.mode) {
            if (res.matches) {
              this.sidenav.mode = 'over';
              this.sidenav.close();
            } else {
              this.sidenav.mode = 'side';
              this.sidenav.open();
            }
         }
        });

      this.router.events
        .subscribe(() => {
          if (this.sidenav && this.sidenav.mode === 'over') {
            this.sidenav.close();
          }
        });
    }
  }

  /**
   * Methode pour changer de thème
   */
  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    localStorage.setItem('theme', this.isLightTheme ? 'light' : 'dark');

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme? 'light' : 'dark'
    );
  }
  /**
   * Methode de déconnexion
   */
  onClickLogout() {
    this.accountService.logout();
  }
}

