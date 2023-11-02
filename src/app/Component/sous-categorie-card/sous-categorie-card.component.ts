import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SousCategorieService} from "../../services/sous-categorie.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmationComponent} from "../dialog-confirmation/dialog-confirmation.component";

@Component({
  selector: 'app-sous-categorie-card',
  templateUrl: './sous-categorie-card.component.html',
  styleUrls: ['./sous-categorie-card.component.scss']
})
export class SousCategorieCardComponent {
  @Input() sousCategorie: any;
  @Output() deleteSuccess = new EventEmitter<void>();

  constructor(private sousCategorieService: SousCategorieService, private dialog: MatDialog) { }

  onConfirmDeleteSousCategorie() {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: 'Voulez-vous vraiment supprimer cette transaction ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSousCategorie();
        this.deleteSuccess.emit();
      }
    });
  }

  deleteSousCategorie() {
    const sousCategorieId = this.sousCategorie.id_Sous_Categorie;
    this.sousCategorieService.deleteSousCategorie(sousCategorieId).subscribe(
      () => {
        this.deleteSuccess.emit();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la sous-catégorie :', error);
      }
    );
  }
}
