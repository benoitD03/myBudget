import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Categorie} from "../class/categorie";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Config} from "../class/config";
import {AccountService} from "./account.service";
import {SousCategorie} from "../class/sous-categorie";

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {

  constructor(private accountService: AccountService, private http: HttpClient) { }


  /**
   * Méthode de récuperation des sous-categories d'une catégorie
   * @param categorieId : Id de la categorie
   */
  getSousCategoriesByCategorieId(categorieId: number): Observable<SousCategorie[]> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.get<SousCategorie[]>(Config.URL_SOUS_CATEGORIES, { headers });
  }

}
