import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SousCategorie} from "../../class/sous-categorie";
import {AccountService} from "../../services/account.service";
import {SousCategorieService} from "../../services/sous-categorie.service";
import {DialogCreateCategorieComponent} from "../dialog-create-categorie/dialog-create-categorie.component";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogCreateSousCategorieComponent
} from "../dialog-create-sous-categorie/dialog-create-sous-categorie.component";

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrls: ['./categorie-card.component.scss']
})
export class CategorieCardComponent {

  panelOpenState = false;
  @Input() categorie: any;
  @Output() totalCategorieChange = new EventEmitter<{ value: number; isDepense: boolean }>();
  sousCategories: SousCategorie[] = [];
  totalCategorie: number = 0;

  constructor(private sousCategorieService: SousCategorieService, private accountService: AccountService, public dialog: MatDialog) {
  }
  ngOnInit() {
    const id_Categorie = this.categorie.id_Categorie;

    this.sousCategorieService.getSousCategoriesByCategorieId(id_Categorie).subscribe(
      (data) => {
        this.sousCategories=data;

        for (const sousCategorie of this.sousCategories) {
          this.totalCategorie += sousCategorie.Somme;
        }
        this.onAddToTotalDepense();
      },
      (error) => {
        console.error('Erreur lors de la récupération des sous catégories :', error);
      }
    )
  }

  /**
   * Méthode qui permet de notifier au composant parent (Dashboard) lorsque le total d'une catégorie changera.
   */
  onAddToTotalDepense() {
    this.totalCategorieChange.emit({value: this.totalCategorie, isDepense: this.categorie.Depense});
  }

  openDialogCreateSousCategorie() {
    const dialogRef = this.dialog.open(DialogCreateSousCategorieComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%',
      data: {categorie: this.categorie}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
