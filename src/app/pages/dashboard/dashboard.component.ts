import { Component } from '@angular/core';
import {Categorie} from "../../class/categorie";
import {CategorieService} from "../../services/categorie.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  categories: Categorie[] = []
  totalDepense: number = 0;
  totalRevenu: number = 0;
  epargnePossible: number = 0;

  constructor(private categorieService: CategorieService, private accountService: AccountService) {
  }

  ngOnInit() {

    let id_User : string | null= this.accountService.getIdUser();

    this.categorieService.getCategoriesByUserId(Number(id_User)).subscribe(
      (data) => {
        this.categories=data;
        console.log(this.categories)
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    )

  }

  /**
   * Méthode de mise à jours des totaux (Dépenses et Revenus) et d'epargne
   * @param event
   */
  updateTotalCategory(event: { value: number; isDepense: boolean }) {
    if (event.isDepense) {
      this.totalDepense += event.value;
      this.epargnePossible = this.totalRevenu - this.totalDepense;
    } else {
      this.totalRevenu += event.value;
      this.epargnePossible = this.totalRevenu - this.totalDepense;
    }
  }

}
