import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogCreateCategorieComponent
} from "../../Component/dialog-create-categorie/dialog-create-categorie.component";
import {DialogConfirmationComponent} from "../../Component/dialog-confirmation/dialog-confirmation.component";
import {Favori} from "../../class/favori";
import {FavoriService} from "../../services/favori.service";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit{
  favoris: Favori[] = []
  Columns: string[] = ['Nom','Depense', 'Revenu', 'Categorie', 'Actions'];

  constructor(private favoriService: FavoriService, public accountService: AccountService, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.loadList();
  }

  loadList() {
    const id_User = this.accountService.getIdUser();
    console.log('id_User', id_User)
    this.favoriService.getFavorisByUserId(Number(id_User)).subscribe({
      next : (data) => {
        console.log("next")
        this.favoris=data;
      },
      error : (error) => {
        console.error('Erreur lors de la récupération des favoris :', error);
      },
      complete: () => {
        console.log('Observable getFavorisByUserId completed');
      }
    });
  }

  // openDialogCreateCategorie(isModif: Boolean) {
  //   const dialogRef = this.dialog.open(DialogCreateCategorieComponent, {
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '70%',
  //     width: '400px',
  //     data: {isModif: isModif}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.loadList();
  //   });
  // }

  onConfirmDeleteFavori(favori:Favori) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: 'Voulez vous supprimer ce favori ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFavori(favori);
      }
    });
  }

  deleteFavori(favori:Favori) {
    const favoriId = favori.id_Favori;
    if (favoriId !== 0) {
      this.favoriService.deleteFavori(favoriId).subscribe({
        next : () => {
          alert("Favori supprimée !")
          this.loadList();
        },
        error : (error) => {
          console.error('Erreur lors de la suppression du favori :', error);
        }
      });
    }
  }

  // openDialogModifyCategorie(categorie: Categorie, isModif: Boolean) {
  //   console.log(categorie.Couleur)
  //   const dialogRef = this.dialog.open(DialogCreateCategorieComponent, {
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     height: '70%',
  //     width: '400px',
  //     data:
  //       { categorieToModify: categorie,
  //         isModif: isModif
  //       },
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.loadList();
  //   });
  // }
}
