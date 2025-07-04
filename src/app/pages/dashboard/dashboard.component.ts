import {Component, OnInit} from '@angular/core';
import {Categorie} from "../../class/categorie";
import {CategorieService} from "../../services/categorie.service";
import {AccountService} from "../../services/account.service";
import * as moment from "moment";
import {Router} from "@angular/router";
import {TotauxService} from "../../services/totaux.service";
import {DialogConfirmationComponent} from "../../Component/dialog-confirmation/dialog-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {Favori} from "../../class/favori";
import {FavoriService} from "../../services/favori.service";
import {SousCategorieService} from "../../services/sous-categorie.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  categories: Categorie[] = [];
  favoris: Favori[] = [];
  currentMonth: number;
  currentYear: number;
  monthNames: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  constructor(private categorieService: CategorieService, public accountService: AccountService, private router: Router,
              public totauxService : TotauxService, public dialog: MatDialog, private favoriService: FavoriService,
              private sousCategorieService: SousCategorieService) {
    // Initialiser avec le mois/année actuels ou récupérer depuis localStorage
    const storedMonth = localStorage.getItem("currentMonth");
    const storedYear = localStorage.getItem("currentYear");
    
    if (storedMonth && storedYear) {
      this.currentMonth = Number(storedMonth);
      this.currentYear = Number(storedYear);
    } else {
      this.currentMonth = moment().month() + 1; // moment() retourne 0-11, on veut 1-12
      this.currentYear = moment().year();
    }
    
    this.saveCurrentMonthToStorage();
  }

  ngOnInit() {
    this.loadData();
  }

  /**
   * Méthode permettant de récupérer les catégories de l'utilisateur
   */
  loadData() {
    let id_User: string | null = this.accountService.getIdUser();
    this.categorieService.getCategoriesByUserId(Number(id_User)).subscribe({
      next: (data) => {
        this.categories = data;
        this.totauxService.calculateTotals();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    })
  }

  /**
   * Méthode permettant de naviguer vers le mois précédent
   */
  previousMonth() {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.saveCurrentMonthToStorage();
    this.loadData();
    this.totauxService.calculateTotals();
  }

  /**
   * Méthode permettant de naviguer vers le mois suivant
   */
  nextMonth() {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.saveCurrentMonthToStorage();
    this.loadData();
    this.totauxService.calculateTotals();
  }

  /**
   * Méthode permettant de revenir au mois en cours
   */
  goToCurrentMonth() {
    this.currentMonth = moment().month() + 1;
    this.currentYear = moment().year();
    this.saveCurrentMonthToStorage();
    this.loadData();
    this.totauxService.calculateTotals();
  }

  /**
   * Méthode pour sauvegarder le mois/année actuel dans localStorage
   */
  private saveCurrentMonthToStorage() {
    localStorage.setItem("currentMonth", String(this.currentMonth));
    localStorage.setItem("currentYear", String(this.currentYear));
  }

  /**
   * Méthode pour obtenir le nom du mois affiché
   */
  getCurrentMonthName(): string {
    return `${this.monthNames[this.currentMonth - 1]} ${this.currentYear}`;
  }

  /**
   * Méthode pour vérifier si on est sur le mois en cours
   */
  isCurrentMonth(): boolean {
    const now = moment();
    return this.currentMonth === (now.month() + 1) && this.currentYear === now.year();
  }

  /**
   * Méthode permettant d'ajouter tous les favoris de l'utilisateur
   */
  addAllFavoris() {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: 'Voulez vous ajouter tous vos favoris ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id_User = this.accountService.getIdUser();
        this.favoriService.getFavorisByUserId(Number(id_User)).subscribe({
          next: (data: Favori[]) => {
            this.favoris = data;
            let sousCategories: any = this.favoris.map(favori => ({
              Nom: favori.Nom,
              Image: favori.categorie.Image,
              Depense: favori.Depense,
              Date: moment().format('YYYY-MM-DD'),
              Somme: favori.Somme,
              categorie: favori.categorie.id_Categorie,
              user: Number(this.accountService.getIdUser()),
              Couleur: favori.categorie.Couleur
            }));
            this.sousCategorieService.createMultipleSousCategorie(sousCategories).subscribe({
              next: (response: any) => {
                this.loadData();
              },
              error: (error: any) => {
                console.error(error);
              },
              complete: () => {
                console.log('Observable getFavorisByUserId completed');
              }
            });
          }
        });
      }
    });
  }
}
