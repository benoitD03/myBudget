import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {Config} from "../../class/config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Méthode d'envoi du formulaire de connexion
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.accountService.login(email, password).subscribe({
        next : (response: any) => {
          let token = response.access_token;
          let id_User = response.id_User;
          let name = response.name
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('id_User', id_User);
            localStorage.setItem('name', name);
            this.router.navigate([Config.ROUTE_DASHBOARD])
          }
        },
        error : (error: any) => {
          console.error(error)
        }
      });

    }
  }
}
