import { Injectable } from '@angular/core';
import {AccountService} from "./account.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Config } from "../class/config";
import {Categorie} from "../class/categorie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor( private accountService: AccountService, private http: HttpClient) { }

  /**
   * Méthode de récuperation des categories de l'utilisateur connecté
   * @param userId : Id de l'utilisateur connecté
   */
  getCategoriesByUserId(userId: number): Observable<Categorie[]> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.get<Categorie[]>(Config.URL_CATEGORIES, { headers });
  }
}
