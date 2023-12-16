import {Injectable, OnInit} from '@angular/core';
import {SousCategorieService} from "./sous-categorie.service";
import {AccountService} from "./account.service";
import * as moment from "moment";
import {SousCategorie} from "../class/sous-categorie";

@Injectable({
  providedIn: 'root'
})
export class TotauxService {

  constructor( private sousCategorieService : SousCategorieService, private accountService : AccountService) {
    this.calculateTotals();
  }

  totalDepense!: number;
  totalRevenu!: number;
  epargnePossible!: number;


  private calculateTotals(): void {
    const id_User: string | null = this.accountService.getIdUser();
    const stockedMonth = localStorage.getItem("month");
    const month = stockedMonth ? Number(stockedMonth) : moment().month() + 1;
    const year = moment().year();

    this.sousCategorieService.getAllByMonth(year, month, Number(id_User)).subscribe(
      (data) => {
        let depenses = data.filter((data : any) => data.Depense);
        let revenus = data.filter((data : any) => !data.Depense);
        this.totalDepense = depenses.reduce((total : number, depense : any) => total + depense.Somme, 0);
        this.totalRevenu = revenus.reduce((total : number, revenu : any) => total + revenu.Somme, 0);
        this.epargnePossible = this.totalRevenu - this.totalDepense;
      }
    )

  }

}
