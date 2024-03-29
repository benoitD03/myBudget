import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SousCategorieService} from "../../services/sous-categorie.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmationComponent} from "../dialog-confirmation/dialog-confirmation.component";
import {Categorie} from "../../class/categorie";
import {DialogCreateCategorieComponent} from "../dialog-create-categorie/dialog-create-categorie.component";
import {SousCategorie} from "../../class/sous-categorie";
import {
  DialogCreateSousCategorieComponent
} from "../dialog-create-sous-categorie/dialog-create-sous-categorie.component";
import {Router} from "@angular/router";
import {TotauxService} from "../../services/totaux.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-sous-categorie-card',
  templateUrl: './sous-categorie-card.component.html',
  styleUrls: ['./sous-categorie-card.component.scss']
})
export class SousCategorieCardComponent {
  @Input() sousCategorie: any;
  @Output() deleteSuccess = new EventEmitter<void>();
  @Output() modifySuccess = new EventEmitter<void>();

  constructor(private sousCategorieService: SousCategorieService, private dialog: MatDialog, private router: Router, private totauxService : TotauxService,
              public accountService: AccountService) { }

  onConfirmDeleteSousCategorie() {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: 'Voulez-vous vraiment supprimer cette transaction ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSousCategorie();
      }
    });
  }

  deleteSousCategorie() {
    const sousCategorieId = this.sousCategorie.id_Sous_Categorie;
    this.sousCategorieService.deleteSousCategorie(sousCategorieId).subscribe({
      next : () => {
        this.totauxService.calculateTotals();
        this.totauxService.updatedChart();
        this.deleteSuccess.emit();
      },
      error : (error) => {
        console.error('Erreur lors de la suppression de la sous-catégorie :', error);
      }
    });
  }

  /**
   * Méthode au clic sur le bouton modifier de sous Catégorie
   * @param sousCategorie
   * @param isModif
   */
  openDialogModifySousCategorie(sousCategorie: SousCategorie, isModif: Boolean) {
    const dialogRef = this.dialog.open(DialogCreateSousCategorieComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '70%',
      width: '400px',
      data:
        { sousCategorieToModify: sousCategorie,
          isModif: isModif
        },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.modifySuccess.emit();
    });
  }
}
