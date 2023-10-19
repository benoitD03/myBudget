import { Component, Input } from '@angular/core';
import {SousCategorie} from "../../class/sous-categorie";
import {AccountService} from "../../services/account.service";
import {SousCategorieService} from "../../services/sous-categorie.service";

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrls: ['./categorie-card.component.scss']
})
export class CategorieCardComponent {
  panelOpenState = false;
  @Input() categorie: any;
  sousCategories: SousCategorie[] = [];
  constructor(private sousCategorieService: SousCategorieService, private accountService: AccountService) {
  }
  ngOnInit() {
    const id_Categorie = this.categorie.id_Categorie;
    console.log(id_Categorie)
    this.sousCategorieService.getSousCategoriesByCategorieId(id_Categorie).subscribe(
      (data) => {
        this.sousCategories=data;
        console.log(this.sousCategories)
      },
      (error) => {
        console.error('Erreur lors de la récupération des sous catégories :', error);
      }
    )
  }
}
