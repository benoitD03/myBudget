import {Injectable} from '@angular/core';
import {SousCategorieService} from "./sous-categorie.service";
import {AccountService} from "./account.service";
import * as moment from "moment";
import {Chart} from "chart.js/auto";

@Injectable({
  providedIn: 'root'
})
export class TotauxService {

  totalDepense!: number;
  totalRevenu!: number;
  epargnePossible!: number;
  chart!: any;

  constructor( private sousCategorieService : SousCategorieService, private accountService : AccountService) {
    this.calculateTotals();
  }

  /**
   * Méthode permettant de calculer les totaux présent dans la page Dashboard
   */
  calculateTotals(): void {
    const id_User: string | null = this.accountService.getIdUser();
    const stockedMonth = localStorage.getItem("currentMonth");
    const stockedYear = localStorage.getItem("currentYear");
    const month = stockedMonth ? Number(stockedMonth) : moment().month() + 1;
    const year = stockedYear ? Number(stockedYear) : moment().year();

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
        type: 'bar',
        data: {
          labels: ['Répartition du mois'],
          datasets: [
            {
              label: 'Dépenses',
              data: [depense],
              backgroundColor: '#ED4334',
              borderColor: '#D32F2F',
              borderWidth: 1
            },
            {
              label: 'Épargne',
              data: [epargne],
              backgroundColor: '#FBBC06',
              borderColor: '#E6A905',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          scales: {
            x: {
              stacked: true,
              beginAtZero: true
            },
            y: {
              stacked: true,
              display: false
            }
          }
        }
      });
    }
  }

  /**
   * Méthode permettant de mettre à jours le graphique lorsqu'une valeur a changée
   */
  updatedChart(): void {
    if (this.chart && this.chart.data && this.chart.data.datasets) {
      this.chart.data.datasets[0].data = [this.totalDepense];
      this.chart.data.datasets[1].data = [this.epargnePossible];
      this.chart.update();
    }
  }

}
