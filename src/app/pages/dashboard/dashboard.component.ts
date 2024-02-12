import {Component, OnInit} from '@angular/core';
import {Categorie} from "../../class/categorie";
import {CategorieService} from "../../services/categorie.service";
import {AccountService} from "../../services/account.service";
import * as moment from "moment";
import {Router} from "@angular/router";
import {TotauxService} from "../../services/totaux.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  categories: Categorie[] = []
  month: number = 0;
  isPreviousMonth: boolean = localStorage.getItem("isPreviousMonth") === "true";


  constructor(private categorieService: CategorieService, private accountService: AccountService, private router: Router,
              public totauxService : TotauxService){
  }

  ngOnInit() {
    this.loadData();
  }

  /**
   * Méthode permettant de récupérer les catégories de l'utilisateur
   */
  loadData() {
    let id_User: string | null = this.accountService.getIdUser();
    this.categorieService.getCategoriesByUserId(Number(id_User)).subscribe({
      next: (data) => {
        this.categories = data;
        this.totauxService.calculateTotals();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    })
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
      this.isPreviousMonth=!this.isPreviousMonth;
      this.loadData();
      this.totauxService.calculateTotals();
  }
}
