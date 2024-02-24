import { Injectable } from '@angular/core';
import {AccountService} from "./account.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Config } from "../class/config";
import {Favori} from "../class/favori";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FavoriService {

  constructor( private accountService: AccountService, private http: HttpClient ) { }

  /**
   * Méthode de récuperation des favoris de l'utilisateur connecté
   * @param userId : Id de l'utilisateur connecté
   */
  getFavorisByUserId(userId: number): Observable<Favori[] | []> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.get<Favori[] | []>(Config.URL_FAVORIS+'?id_User='+userId, { headers }).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Méthode de création d'un favori
   */
  createFavori(nom: string, depense: boolean, somme: string, userId: any, categorieId: any): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    const favoriData = {
      Nom: nom,
      Depense: depense,
      Somme: somme,
      user: userId,
      categorie: categorieId
    };

    return this.http.post(Config.URL_CREATE_FAVORIS, favoriData, { headers });
  }

  /**
   * Méthode de suppression d'un favori
   * @param favoriId
   */
  deleteFavori(favoriId: number): Observable<void> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.delete<void>(`${Config.URL_DELETE_FAVORIS}/${favoriId}` , { headers });
  }

  /**
   * Méthode de modification d'un favori
   * @param favoriId
   * @param updatedData ==> Favori avec les données modifiées
   */
  updateFavori(favoriId: number, updatedData: Favori): Observable<any> {
    const token = this.accountService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    return this.http.put(`${Config.URL_UPDATE_FAVORIS}/${favoriId}`, updatedData, { headers });
  }
}
