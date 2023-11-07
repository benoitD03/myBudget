import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Categorie} from "../../class/categorie";
import {CategorieService} from "../../services/categorie.service";
import {AccountService} from "../../services/account.service";
import {MatTable} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogCreateCategorieComponent
} from "../../Component/dialog-create-categorie/dialog-create-categorie.component";
import {DialogConfirmationComponent} from "../../Component/dialog-confirmation/dialog-confirmation.component";

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
    this.loadList();
  }

  loadList() {
    const id_User = this.accountService.getIdUser();
    this.categorieService.getCategoriesByUserId(Number(id_User)).subscribe(
      (data) => {
        this.categories=data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    )
  }
  /**
   * Méthode au clic sur le bouton d'ajout de catégorie
   */
  openDialogCreateCategorie(isModif: Boolean) {
    const dialogRef = this.dialog.open(DialogCreateCategorieComponent, {
      maxWidth: '100vw',
       maxHeight: '100vh',
       height: '70%',
       width: '400px',
      data: {isModif: isModif}
    });

    dialogRef.afterClosed().subscribe(result => {
        this.loadList();
    });
  }

  onConfirmDeleteCategorie(categorie:Categorie) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: 'Supprimer cette catégorie entrainera la suppression de toutes les transactions qui lui sont associées. Souhaitez vous continuer ? ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategorie(categorie);
      }
    });
  }

  deleteCategorie(categorie:Categorie) {
    const categorieId = categorie.id_Categorie;
    if (categorieId !== 0) {
      this.categorieService.deleteCategorie(categorieId).subscribe(
        () => {
          alert("Catégorie supprimée !")
          this.loadList();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie :', error);
        }
      );
    }
  }

  openDialogModifyCategorie(categorie: Categorie, isModif: Boolean) {
    const dialogRef = this.dialog.open(DialogCreateCategorieComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '70%',
      width: '400px',
      data:
      { categorieToModify: categorie,
        isModif: isModif
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadList();
    });
  }
}
