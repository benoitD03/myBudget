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

  constructor(private categorieService: CategorieService, private accountService: AccountService) {
  }
  ngOnInit() {
    const id_User = + !this.accountService.getIdUser();
    this.categorieService.getCategoriesByUserId(id_User).subscribe(
      (data) => {
        this.categories=data;
        console.log(this.categories)
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    )
  }
}
