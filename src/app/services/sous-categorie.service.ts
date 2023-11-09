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

    return this.http.get<SousCategorie[]>(Config.URL_SOUS_CATEGORIES+'?id_Categorie='+categorieId, { headers });
  }

  /**
   * Méthode de création d'une sous catégorie
   * @param nom
   * @param image
   * @param depense
   * @param date
   * @param somme
   * @param userId
   * @param categorieId
   * @param couleur
   */
  createSousCategorie(nom: string, image: string, depense: boolean, date: any, somme: number, userId: any, categorieId: any, couleur: string): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    const sousCategorieData = {
      Nom: nom,
      Image: image,
      Depense: depense,
      Date: date,
      Somme: somme,
      categorie: categorieId,
      user: userId,
      Couleur: couleur
    };

    return this.http.post(Config.URL_CREATE_SOUS_CATEGORIES, sousCategorieData, { headers });
  }

  /**
   * Méthode de suppression d'un sous catégorie
   * @param sousCategorieId
   */
  deleteSousCategorie(sousCategorieId: number): Observable<void> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.delete<void>(`${Config.URL_DELETE_SOUS_CATEGORIES}/${sousCategorieId}` , { headers });
  }

  /**
   * Méthode de modification d'une sous- catégorie
   * @param sousCategorieId
   * @param updatedData ==> Sous Catégories avec les données modifiées
   */
  updateSousCategorie(sousCategorieId: number, updatedData: SousCategorie): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.put(`${Config.URL_UPDATE_SOUS_CATEGORIES}/${sousCategorieId}`, updatedData, { headers });
  }
}
