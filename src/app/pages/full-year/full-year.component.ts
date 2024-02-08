import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SousCategorie} from "../../class/sous-categorie";
import * as moment from "moment";
import {SousCategorieService} from "../../services/sous-categorie.service";
import {Chart, ChartConfiguration, ChartData, ChartOptions} from 'chart.js';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {AccountService} from "../../services/account.service";


@Component({
  selector: 'app-full-year',
  templateUrl: './full-year.component.html',
  styleUrls: ['./full-year.component.scss']
})
export class FullYearComponent implements OnInit, AfterViewInit{
  sousCategoriesDepenses!: SousCategorie[];
  sousCategoriesRevenus!: SousCategorie[];
  depensesCategories: { categoryName: string; total: number }[] = [];
  Columns: string[] = this.accountService.isMobile() ? ['Image', 'Nom', 'Date', 'Somme'] : ['Image', 'Categorie', 'Nom', 'Date', 'Somme'];
  dataSource!: MatTableDataSource<SousCategorie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null = null;


  constructor(private sousCategorieService: SousCategorieService, public accountService : AccountService) {

  }

  ngOnInit() {
    this.loadList()
  }

  loadList() {
    const year = moment().year();
    const id_User: string | null = this.accountService.getIdUser();

    this.sousCategorieService.getAllByYear(year, Number(id_User)).subscribe({
      next : (data) => {
        this.sousCategoriesDepenses=data.filter((sousCategorie : SousCategorie )=> sousCategorie.Depense).sort((a : any, b: any) => (a.Date > b.Date) ? -1 : 1);
        this.sousCategoriesRevenus=data.filter((sousCategorie : SousCategorie )=> !sousCategorie.Depense).sort((a : any, b: any) => (a.Date > b.Date) ? -1 : 1);
        this.depensesCategories = this.depensesTotalesParCategories(this.sousCategoriesDepenses).sort((a, b) => b.total - a.total);;
        this.dataSource = new MatTableDataSource<SousCategorie>(this.sousCategoriesDepenses);
        this.dataSource.paginator = this.paginator;
      },
      error : (error) => {
        console.error('Erreur lors de la récupération des transactions :', error);
      }
    });
  }

  /**
   * Méthode permettant de faire la somme des dépenses pour chaques catégories de dépenses.
   * @param depenses
   * @private
   */
  private depensesTotalesParCategories(depenses: SousCategorie[]): { categoryName: string; total: number }[] {
    const depensesMap = new Map<string, number>();


    depenses.forEach((sousCategorie) => {
      const categoryName = sousCategorie.categorie.Nom;

      if (depensesMap.has(categoryName)) {
        //Si le nom de la catégorie existe déjà, on incrémente notre somme totale
        depensesMap.set(categoryName, depensesMap.get(categoryName)! + sousCategorie.Somme);
      } else {
        //Sinon on créer une nouvelle paire Nom / Somme
        depensesMap.set(categoryName, sousCategorie.Somme);
      }
    });

    // On converti la map en tableau pour l'affichage dans le graphique
    return Array.from(depensesMap.entries()).map(([categoryName, total]) => ({ categoryName, total }));
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.initializeChart();
    }, 100);
  }

  private initializeChart() {
    const ctx = document.getElementById('expenseChart') as HTMLCanvasElement;
    const ctx2 = document.getElementById('expenseChart2') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.depensesCategories.map((expense) => expense.categoryName),
        datasets: [{
          label: 'Dépenses par catégories',
          data: this.depensesCategories.map((expense) => expense.total),
          borderWidth: 1,
        }]
      },
      options: {
        plugins : {
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            display: this.accountService.isMobile() ? false : true,
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: this.depensesCategories.map((expense) => expense.categoryName),
        datasets: [{
          label: 'Dépenses par catégories',
          data: this.depensesCategories.map((expense) => expense.total),
          borderWidth: 0,
          backgroundColor: [
            '#5AF3AA',
            '#FFA96A',
            '#1879F3',
            '#815E2E',
            '#95DC44',
            '#D1A293',
            '#E13C02',
            '#E38DCD',
            '#32403F',
            '#3D3E9B'

          ],
        }]
      },
      options: {
        plugins : {
          legend: {
            display: false
          },
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
