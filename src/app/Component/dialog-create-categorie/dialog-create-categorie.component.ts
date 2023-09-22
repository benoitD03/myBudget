import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Config} from "../../class/config";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {CategorieService} from "../../services/categorie.service";

@Component({
  selector: 'app-dialog-create-categorie',
  templateUrl: './dialog-create-categorie.component.html',
  styleUrls: ['./dialog-create-categorie.component.scss']
})
export class DialogCreateCategorieComponent {
  createCategorieForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private categorieService: CategorieService) {
    this.createCategorieForm = this.fb.group({
      Nom: ['', Validators.required],
      Image: ['', Validators.required],
      Description: [''],
      Revenu: [''],
      Depense: [''],
      Couleur: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log("Envoyé")
     if (this.createCategorieForm.valid) {
      const nom = this.createCategorieForm.get('Nom')?.value;
      const image = this.createCategorieForm.get('Image')?.value;
      const description = this.createCategorieForm.get('Description')?.value;
      const revenu = this.createCategorieForm.get('Revenu')?.value;
      const depense = this.createCategorieForm.get('Depense')?.value;
      const couleur = this.createCategorieForm.get('Couleur')?.value;
      const idUser = this.accountService.getIdUser();
    //
      this.categorieService.createCategorie(nom, image, description, revenu, depense, couleur, idUser).subscribe(
        (response: any) => {
          console.log(response)
        },
        (error: any) => {
          console.error(error)
        }
      )
    //
    }
  }

}
