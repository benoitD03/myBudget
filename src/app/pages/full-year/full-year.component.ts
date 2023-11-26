import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SousCategorie} from "../../class/sous-categorie";
import * as moment from "moment";
import {SousCategorieService} from "../../services/sous-categorie.service";
import { Chart, ChartConfiguration, ChartData } from 'chart.js';


@Component({
  selector: 'app-full-year',
  templateUrl: './full-year.component.html',
  styleUrls: ['./full-year.component.scss']
})
export class FullYearComponent implements OnInit, AfterViewInit{
  sousCategoriesDepenses: SousCategorie[] = [];
  sousCategoriesRevenus: SousCategorie[] = [];
  depensesCategories: { categoryName: string; total: number }[] = [];
  Columns: string[] = ['Categorie', 'Nom', 'Image', 'Date', 'Somme'];


  constructor(private sousCategorieService: SousCategorieService) {
  }

  ngOnInit() {
    this.loadList()
  }

  loadList() {
    const year = moment().year()
    this.sousCategorieService.getAllByYear(year).subscribe(
      (data) => {
        console.log(data)
        this.sousCategoriesDepenses=data.filter((sousCategorie : SousCategorie )=> sousCategorie.Depense);
        this.sousCategoriesRevenus=data.filter((sousCategorie : SousCategorie )=> !sousCategorie.Depense);
        this.depensesCategories = this.depensesTotalesParCategories(this.sousCategoriesDepenses);
        console.log(this.depensesCategories);
      },
      (error) => {
        console.error('Erreur lors de la récupération des transactions :', error);
      }
    )
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
        //Si le nom de la sous catégorie existe déjà, on incrémente notre somme totale
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

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.depensesCategories.map((expense) => expense.categoryName),
        datasets: [{
          label: 'Dépenses par catégories',
          data: this.depensesCategories.map((expense) => expense.total),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
