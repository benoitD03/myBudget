import {Component, OnInit} from '@angular/core';
import {SousCategorie} from "../../class/sous-categorie";
import * as moment from "moment";
import {SousCategorieService} from "../../services/sous-categorie.service";

@Component({
  selector: 'app-full-year',
  templateUrl: './full-year.component.html',
  styleUrls: ['./full-year.component.scss']
})
export class FullYearComponent implements OnInit{
  sousCategoriesDepenses: SousCategorie[] = [];
  sousCategoriesRevenus: SousCategorie[] = [];
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
      },
      (error) => {
        console.error('Erreur lors de la récupération des transactions :', error);
      }
    )
  }

}
