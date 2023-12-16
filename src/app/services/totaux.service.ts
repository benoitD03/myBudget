import {Injectable} from '@angular/core';
import {SousCategorieService} from "./sous-categorie.service";
import {AccountService} from "./account.service";
import * as moment from "moment";
import {Chart} from "chart.js/auto";

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
  chart!: any;

  /**
   * Méthode permettant de calculer les totaux présent dans la page Dashboard
   */
  calculateTotals(): void {
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
        this.updatedChart();
      }
    )
  }

  /**
   * Méthode de création du graphique
   * @param revenu
   * @param depense
   * @param epargne
   */
  createChart(revenu: number, depense: number, epargne: number) {
    const ctx = document.getElementById("myChart");
    if (ctx instanceof HTMLCanvasElement){
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Revenus', 'Dépenses', 'Epargne possible'],
          datasets: [{
            data: [revenu, depense, epargne],
            backgroundColor: [
              '#5AF3AA',
              '#FFA96A',
              '#1879F3'
            ],
            borderWidth: 0,
            // hoverOffset: 10
          }]
        },
        options: {}
      });
    }
  }

  /**
   * Méthode permettant de mettre à jours le graphique lorsqu'une valeur a changée
   */
  updatedChart(): void {
    this.chart.data.datasets[0].data= [this.totalRevenu, this.totalDepense, this.epargnePossible];
    this.chart.update();
}

}
