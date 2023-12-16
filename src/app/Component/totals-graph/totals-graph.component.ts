import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {TotauxService} from "../../services/totaux.service";

@Component({
  selector: 'app-totals-graph',
  templateUrl: './totals-graph.component.html',
  styleUrls: ['./totals-graph.component.scss']
})
export class TotalsGraphComponent implements OnInit{

  constructor( private totauxService : TotauxService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.createChart(this.totauxService.totalRevenu, this.totauxService.totalDepense, this.totauxService.epargnePossible);
    }, 100);
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
      new Chart(ctx, {
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
            // hoverOffset: 4
          }]
        },
        options: {}
      });
    }
  }

}
