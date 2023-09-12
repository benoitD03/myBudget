import { Component } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
  }
  isLightTheme = true

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme? 'light' : 'dark'
    );
  }

  isLoginPage(): boolean {
    return this.router.url === '/login'
  }
}
