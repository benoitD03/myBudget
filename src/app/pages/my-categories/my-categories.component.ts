import {Component, OnInit, ViewChild} from '@angular/core';
import {Categorie} from "../../class/categorie";
import {CategorieService} from "../../services/categorie.service";
import {AccountService} from "../../services/account.service";
import {MatTable} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogCreateCategorieComponent
} from "../../Component/dialog-create-categorie/dialog-create-categorie.component";

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.scss']
})
export class MyCategoriesComponent implements OnInit{
  categories: Categorie[] = []
  Columns: string[] = ['Nom', 'Image', 'Description', 'Depense', 'Revenu', 'Couleur', 'Actions'];
  // categorie: Categorie;


  constructor(private categorieService: CategorieService, private accountService: AccountService, public dialog: MatDialog) {
  }
  ngOnInit() {
    const id_User = this.accountService.getIdUser();
    this.categorieService.getCategoriesByUserId(Number(id_User)).subscribe(
      (data) => {
        this.categories=data;
        console.log(this.categories)
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    )
  }
  /**
   * Méthode au clic sur le bouton d'ajout de catégorie
   */
  openDialogCreateCategorie() {
    const dialogRef = this.dialog.open(DialogCreateCategorieComponent, {
      maxWidth: '100vw',
       maxHeight: '100vh',
       height: '70%',
       width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.categorie = result;
    });
  }

  deleteCategorie(categorie:Categorie) {
    console.log(categorie.id_Categorie)
    const id_Categorie = categorie.id_Categorie
    if (id_Categorie !== 0) {
      // this.categories.splice(index, 1);

    }
  }
}
