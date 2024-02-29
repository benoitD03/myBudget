import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Categorie} from "../class/categorie";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
   * Méthode de récuperation des sous catégories d'une catégorie en fonction d'un mois donné
   * @param categorieId
   * @param year
   * @param month
   */
  getAllByCategorieAndMonth(categorieId: number, year: number, month: number): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    const params = new HttpParams()
      .set('categorieId', categorieId.toString())
      .set('year', year.toString())
      .set('month', month.toString());

    return this.http.get<any>(Config.URL_SOUS_CATEGORIES_BY_MONTH, { headers, params });
  }

  /**
   * Méthode de récuperation des sous catégories en fonction d'un mois donné
   * @param year
   * @param month
   */
  getAllByMonth(year: number, month: number, userId: number): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString())
      .set('id_User', userId);

    return this.http.get<any>(Config.URL_SOUS_CATEGORIES_ALL_BY_MONTH, { headers, params });
  }

  /**
   * Méthode de récuperation des sous catégories d'une catégorie en fonction d'une année
   * @param year
   * @param month
   */
  getAllByYear(year: number, userId: number): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    const params = new HttpParams()
      .set('year', year.toString())
      .set('id_User', userId)

    return this.http.get<any>(Config.URL_SOUS_CATEGORIES_BY_YEAR, { headers, params });
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

  createMultipleSousCategorie(sousCategoriesData:any): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.post(Config.URL_CREATE_MULTIPLE_SOUS_CATEGORIES, sousCategoriesData, { headers });
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
