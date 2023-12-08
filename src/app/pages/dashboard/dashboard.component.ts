import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Categorie} from "../../class/categorie";
import {CategorieService} from "../../services/categorie.service";
import {AccountService} from "../../services/account.service";
import { Chart } from "chart.js/auto";
import * as moment from "moment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  categories: Categorie[] = []
  month: number = 0;
  totalDepense: number = 0;
  totalRevenu: number = 0;
  epargnePossible: number = 0;
  isPreviousMonth: boolean = localStorage.getItem("isPreviousMonth") === "true";


  constructor(private categorieService: CategorieService, private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    let id_User: string | null = this.accountService.getIdUser();
    this.categorieService.getCategoriesByUserId(Number(id_User)).subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
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
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Revenus', 'Dépenses', 'Epargne possible'],
          datasets: [{
            // label: '# of Votes',
            data: [revenu, depense, epargne],
            backgroundColor: [
              '#5AF3AA',
              '#FFA96A',
              '#1879F3'
            ],
            borderWidth: 0
          }]
        },
        options: {}
      });
    }
  }

  /**
   * Méthode de mise à jours des totaux (Dépenses et Revenus) et d'epargne
   * @param event
   */
  updateTotalCategory(event: { value: number; isDepense: boolean }) {
    if (event.isDepense) {
      this.totalDepense += event.value;
    } else {
      this.totalRevenu += event.value;
    }
    this.epargnePossible = this.totalRevenu - this.totalDepense;
    setTimeout(() => {
      this.createChart(this.totalRevenu, this.totalDepense, this.epargnePossible);
    }, 100);
  }

  /**
   * Méthode permettant d'afficher le mois dernier ou le mois en cours
   */
  changeMonth() {
    const isPreviousMonth=localStorage.getItem("isPreviousMonth");
    this.isPreviousMonth=(isPreviousMonth === 'true');
    if (!isPreviousMonth) {
      this.month = moment().month();
      localStorage.setItem("month", String(this.month));
      localStorage.setItem("isPreviousMonth", String(true));
    } else {
      localStorage.removeItem("month");
      localStorage.removeItem("isPreviousMonth");
    }
    location.reload();
  }
}
