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
  @Input() currentMonth: number = 0;
  @Input() currentYear: number = 0;
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
    // Utiliser les propriétés passées par le parent ou récupérer depuis localStorage
    let month = this.currentMonth;
    let year = this.currentYear;
    
    if (!month || !year) {
      const storedMonth = localStorage.getItem("currentMonth");
      const storedYear = localStorage.getItem("currentYear");
      month = storedMonth ? Number(storedMonth) : moment().month() + 1;
      year = storedYear ? Number(storedYear) : moment().year();
    }
    
    this.sousCategorieService.getAllByCategorieAndMonth(id_Categorie, year, month).subscribe({
      next: (data) => {
        this.sousCategories = data;
        this.totalCategorie = 0;
        if (this.sousCategories) {
          this.totalCategorie = this.sousCategories.reduce((total, sousCategorie) => total + sousCategorie.Somme, 0);
        }
        this.onAddToTotalDepense();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
      }
    });

  }
  /**
   * Méthode qui permet de notifier au composant parent (Dashboard) lorsque le total d'une catégorie changera.
   */
  onAddToTotalDepense() {
    this.totalCategorieChange.emit({value: this.totalCategorie, isDepense: this.categorie.Depense});
  }

  /**
   * Méthode pour vérifier si on est sur le mois en cours
   */
  isCurrentMonth(): boolean {
    const now = moment();
    const currentMonth = this.currentMonth || Number(localStorage.getItem("currentMonth")) || (now.month() + 1);
    const currentYear = this.currentYear || Number(localStorage.getItem("currentYear")) || now.year();
    return currentMonth === (now.month() + 1) && currentYear === now.year();
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
