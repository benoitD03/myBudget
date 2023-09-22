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
  Columns: string[] = ['Nom', 'Image', 'Description', 'Depense', 'Revenu', 'Couleur'];
  // categorie: Categorie;


  constructor(private categorieService: CategorieService, private accountService: AccountService, public dialog: MatDialog) {
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

  openDialogCreateCategorie() {
    const dialogRef = this.dialog.open(DialogCreateCategorieComponent, {
      maxWidth: '100vw', maxHeight: '100vh', height: '80%', width: '80%',

      // data: this.categorie,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.categorie = result;
    });
  }
}
