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

    return this.http.get<Categorie[]>(Config.URL_CATEGORIES+'?id_User='+userId, { headers });
  }

  /**
   * Méthode de création d'une catégorie
   * @param categorieId
   */
  createCategorie(nom: string, image: string, description: string, depense: boolean, couleur: string, userId: any): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    const categorieData = {
      Nom: nom,
      Image: image,
      Description: description,
      Depense: depense,
      Couleur: couleur,
      user: userId
    };

    return this.http.post(Config.URL_CREATE_CATEGORIES, categorieData, { headers });
  }

  /**
   * Méthode de suppression d'une catégorie
   * @param categorieId
   */
  deleteCategorie(categorieId: number): Observable<void> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.delete<void>(`${Config.URL_DELETE_CATEGORIES}/${categorieId}` , { headers });
  }

  /**
   * Méthode de modification d'une catégorie
   * @param categorieId
   * @param updatedData ==> Catégories avec les données modifiées
   */
  updateCategorie(categorieId: number, updatedData: Categorie): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.put(`${Config.URL_UPDATE_CATEGORIES}/${categorieId}`, updatedData, { headers });
  }

}
