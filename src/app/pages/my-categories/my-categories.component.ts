import {Component, OnInit, ViewChild} from '@angular/core';
import {Categorie} from "../../class/categorie";
import {CategorieService} from "../../services/categorie.service";
import {AccountService} from "../../services/account.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.scss']
})
export class MyCategoriesComponent implements OnInit{
  categories: Categorie[] = []
  Columns: string[] = ['Nom', 'Image', 'Description', 'Depense', 'Revenu', 'Couleur'];


  constructor(private categorieService: CategorieService, private accountService: AccountService) {
  }
  ngOnInit() {
    const id_User = + !this.accountService.getIdUser();
    this.categorieService.getCategoriesByUserId(id_User).subscribe(
      (data) => {
        this.categories=data;
        console.log(this.categories)
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    )
  }

  removeData() {

  }

  addData() {

  }
}
