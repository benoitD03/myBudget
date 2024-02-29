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
  month: number = 0;
  isPreviousMonth: boolean = localStorage.getItem("isPreviousMonth") === "true";


  constructor(private categorieService: CategorieService, public accountService: AccountService, private router: Router,
              public totauxService : TotauxService, public dialog: MatDialog, private favoriService: FavoriService,
              private sousCategorieService: SousCategorieService) {
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
   * Méthode permettant d'afficher le mois dernier ou le mois en cours
   */
  changeMonth() {
    const isPreviousMonth=localStorage.getItem("isPreviousMonth");
    this.isPreviousMonth=(isPreviousMonth === 'true');
    if (!isPreviousMonth) {
      this.month = moment().month();
      localStorage.setItem("month", String(this.month));
      localStorage.setItem("isPreviousMonth", String(true));
    } else {
      localStorage.removeItem("month");
      localStorage.removeItem("isPreviousMonth");
    }
      this.isPreviousMonth=!this.isPreviousMonth;
      this.loadData();
      this.totauxService.calculateTotals();
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
