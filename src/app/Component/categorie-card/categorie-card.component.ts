import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {SousCategorie} from "../../class/sous-categorie";
import {AccountService} from "../../services/account.service";
import {SousCategorieService} from "../../services/sous-categorie.service";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogCreateSousCategorieComponent
} from "../dialog-create-sous-categorie/dialog-create-sous-categorie.component";
import {Router} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrls: ['./categorie-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategorieCardComponent {

  panelOpenState = false;
  @Input() categorie: any;
  @Input() previousMonth: any;
  @Output() totalCategorieChange = new EventEmitter<{ value: number; isDepense: boolean }>();
  sousCategories: SousCategorie[] = [];
  totalCategorie: number = 0;

  constructor(private sousCategorieService: SousCategorieService, private accountService: AccountService, public dialog: MatDialog, private router: Router) {
  }
  ngOnInit() {
    this.loadSousCategories();
  }

  /**
   * Méthode de chargement des sous catégories
   */
  loadSousCategories() {
    const id_Categorie = this.categorie.id_Categorie;
    this.previousMonth=localStorage.getItem("month");
    const year = moment().year();
    const month = this.previousMonth ? this.previousMonth : moment().month() + 1;
    this.sousCategorieService.getAllByCategorieAndMonth(id_Categorie, year, month).subscribe(
      (data) => {
        this.sousCategories=data;
        this.totalCategorie=0;
        if (this.sousCategories) {
          this.totalCategorie = this.sousCategories.reduce((total, sousCategorie) => total + sousCategorie.Somme, 0);
        }
        this.onAddToTotalDepense();
      },
      (error) => {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
      }
    );

  }
  /**
   * Méthode qui permet de notifier au composant parent (Dashboard) lorsque le total d'une catégorie changera.
   */
  onAddToTotalDepense() {
    this.totalCategorieChange.emit({value: this.totalCategorie, isDepense: this.categorie.Depense});
  }

  /**
   * Méthode à l'ouverture du formulaire de création de sous catégorie
   */
  openDialogCreateSousCategorie() {
    const dialogRef = this.dialog.open(DialogCreateSousCategorieComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '60%',
      width: '400px',
      data: {categorie: this.categorie}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'valid') {
        this.loadSousCategories();
      }
    });
  }
}
