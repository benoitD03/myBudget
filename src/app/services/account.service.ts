import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from "../class/config";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Methode de connexion
   * @param email de l'utilisateur
   * @param password de l'utilisateur
   */
  login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);

    return this.http.post(Config.URL_LOGIN, formData);
  }

  /**
   * Methode de deconnexion
   */
  logout() {
    this.router.navigate([Config.ROUTE_LOGIN])
    localStorage.removeItem('token');
    localStorage.removeItem('id_User');
    localStorage.removeItem('name');
    localStorage.removeItem('currentMonth');
    localStorage.removeItem('currentYear');
  }

  /**
   * Methode pour récupérer le token dans le localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Methode pour récupérer l'id de l'utilisateur connecté
   */
  getIdUser(): string | null {
    return localStorage.getItem('id_User');
  }

  /**
   * Methode pour récupérer l'id de l'utilisateur connecté
   */
  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  /**
   * Methode pour voir si l'utilisateur est bien connecté
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  //Defini une fonction qui permet de savoir si l'appareil est un mobile ou non
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}
